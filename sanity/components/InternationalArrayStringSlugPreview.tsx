import { FC } from "react";
import { StringInputProps, useFormValue } from "sanity";
import {
  Stack,
  Flex,
  Text,
  Button,
  Tooltip,
  Box,
  useToast,
  Label,
} from "@sanity/ui";
import slugify from "@sindresorhus/slugify";
import { CopyIcon } from "@sanity/icons";
import { Value } from "sanity-plugin-internationalized-array";

export const InternationalArrayStringSlugPreview: FC<StringInputProps> = (
  props
) => {
  const toast = useToast();
  const path = props.path.slice(0);
  path.pop();
  path.push("title");
  const titles = useFormValue(path) as Value[] | null;
  const copySlug = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.push({ title: "Slug copied to clipboard", status: "success" });
      })
      .catch(() => {
        toast.push({ title: "Could not copy slug", status: "error" });
      });
  };
  return (
    <Stack space={1}>
      {titles?.map((title) => (
        <Flex align="center" gap={2}>
          <Label size={2} muted>
            {title._key}
          </Label>
          <Text size={2}>{slugify(title.value ?? "")}</Text>
          <Tooltip
            content={
              <Box padding={2}>
                <Text>Copy slug to clipboard</Text>
              </Box>
            }
          >
            <Button
              mode="bleed"
              paddingY={1}
              disabled={!title.value}
              onClick={() => copySlug(slugify(title.value ?? ""))}
            >
              <CopyIcon />
            </Button>
          </Tooltip>
        </Flex>
      ))}
    </Stack>
  );
};
