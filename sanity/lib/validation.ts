import { CustomValidator, Rule, Slug, SlugValidationContext } from "sanity";
import { LANGUAGE_CODES } from "./languages";

// This checks that there are no other documents
// With this published or draft _id
// Or this schema type
// With the same slug and language

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext
) {
  const { document, getClient } = context;
  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: "2023-04-24" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  };
  const query = `!defined(*[
      !(_id in [$draft, $published]) &&
      slug.current == $slug &&
      language == $language
    ][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}

const requireAllInternationalizedValueValidator = <T = unknown>(
  value: { _key: string; value: T }[] | null
) =>
  (value &&
    value.length === LANGUAGE_CODES.length &&
    value.every((v) => v.value)) ||
  "All languages are required";

const requireOneInternationalizedValueValidator = <T = unknown>(
  value: { _key: string; value: T }[] | null
) =>
  (value && value.some((v) => v.value)) || "At least one language is required";

const requireLanguageInternationalizedValueValidator =
  <T = unknown>(language: string) =>
  (value: { _key: string; value: T }[] | null) =>
    (value && value.some((v) => v._key === language && v.value)) ||
    `Language ${language} is required`;

export const requireAllInternationalizedValue = (Rule: Rule) =>
  Rule.custom<{ _key: string; value: unknown }[]>(
    requireAllInternationalizedValueValidator
  );

export const requireOneInternationalizedValue = (Rule: Rule) =>
  Rule.custom<{ _key: string; value: unknown }[]>(
    requireOneInternationalizedValueValidator
  );

export const requireLanguageInternationalizedValue =
  (language: string) => (Rule: Rule) =>
    Rule.custom<{ _key: string; value: unknown }[]>(
      requireLanguageInternationalizedValueValidator(language)
    );

const requireAllInternationalizedObjectFieldsValidator =
  <T extends Record<string, unknown>>(keys: string[]) =>
  (value: { _key: string; value: T }[] | null) =>
    (value &&
      value.length === LANGUAGE_CODES.length &&
      value.every((v) =>
        keys.every((k) => v.value && k in v.value && Boolean(v.value[k]))
      )) ||
    `Fields ${keys.join(", ")} are required for all languages`;

const requireOneInternationalizedObjectFieldsValidator =
  <T extends Record<string, unknown>>(keys: string[]) =>
  (value: { _key: string; value: T }[] | null) =>
    (value &&
      value.every((v) =>
        keys.every((k) => v.value && k in v.value && Boolean(v.value[k]))
      )) ||
    `Fields ${keys.join(", ")} are required for at least one language`;

export const requireAllInternationalizedObjectFields =
  <T extends Record<string, unknown>>(keys: string[]) =>
  (Rule: Rule) =>
    Rule.custom<{ _key: string; value: T }[]>(
      requireAllInternationalizedObjectFieldsValidator(keys)
    );

export const requireOneInternationalizedObjectFields =
  <T extends Record<string, unknown>>(keys: string[]) =>
  (Rule: Rule) =>
    Rule.custom<{ _key: string; value: T }[]>(
      requireOneInternationalizedObjectFieldsValidator(keys)
    );

const slugFormatValidator = (value: Slug) =>
  value?.current === value?.current.toLowerCase().replace(/\s+/g, "-");

export const slugValidator = (Rule: Rule) =>
  Rule.custom<Slug>(
    (value) =>
      slugFormatValidator(value) ||
      "Slug should be lowercase and have no spaces"
  );

export const internationalizedSlugValidator = (Rule: Rule) =>
  Rule.custom<{ _key: string; value: Slug }[]>(
    (values) =>
      values.every((v) => slugFormatValidator(v.value)) ||
      "Slugs should be lowercase and have no spaces"
  );

const requireSameLanguagesValidator =
  (
    otherFieldName: string
  ): CustomValidator<{ _type: string; _key: string; value: any }[]> =>
  (value, context) => {
    // do we even have a document? if not, we can't validate against another field.
    if (!context.document) return true;
    const otherFieldValue = context.document[otherFieldName] as {
      _type: string;
      _key: string;
    }[];
    // which languages have been filled in the other field?
    const requiredKeys = otherFieldValue.map((v) => v._key);
    // make sure a value exists for each language found in other field
    if (
      requiredKeys.every(
        (key) => value && value.some((v) => v._key === key && v.value)
      )
    )
      return true;
    return `Languages ${requiredKeys.join(
      ", "
    )} are required because of field ${otherFieldName}`;
  };

export const requireSameLanguages = (otherFieldName: string) => (Rule: Rule) =>
  Rule.custom(requireSameLanguagesValidator(otherFieldName));

/**
 * This validator makes sure any added languages to an InternationalizedArray field has a value and is not empty.
 * This is useful especially for fields that control the visibility of certain entities in different languages.
 */
export const noEmptyLanguagesValidator = <T = unknown>(
  value: { _key: string; value: T }[] | null
) =>
  (value && value.every((v) => v.value)) ||
  "Empty values are not allowed, please remove all unused languages";
