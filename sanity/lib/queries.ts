import { groq } from "next-sanity";

export const allPagePathsQuery = groq`*[_type in ["homePage", "articlePage", "categoryPage", "treatmentPage", "specialistPage", "specialistListPage", "teamPage", "clinicPage", "clinicListPage"]] {
    _type,
    _updatedAt,
    language, 
    "slug": slug,
    _type == "treatmentPage" => {
        "parents": categories[]->slug[_key == ^.language][0].value.current,
        "slug": slug.current
    },
    _type == "clinicPage" => {
        "parent": *[_type == "clinicListPage"][0].slug,
        "slug": slug.current,
        "languages": description[defined(value)]._key,
    },
    _type == "specialistPage" => {
        "parent": *[_type == "specialistListPage"][0].slug,
        "slug": slug.current,
        "languages": description[defined(value)]._key,
    }
}`;

export const previewDocumentQuery = groq`*[_id==$id][0] {
    _type,
    "language": coalesce(language, $language),
    "slug": coalesce(slug[_key == $language][0].value.current, slug.current),
    _type == "treatmentPage" => {
         //Picks the first parent in the categories array
        "parent": categories[0]->slug[_key == ^.language][0].value.current,
    },
    _type == "clinicPage" => {
        "parent": *[_id == "clinicListPage"][0].slug[_key == $language].value.current,
    },
    _type == "specialistPage" => {
        "parent": *[_id == "specialistListPage"][0].slug[_key == $language].value.current,
        "slug": slug.current,
        "languages": description[defined(value)]._key
    }
}`;

export const docTypeQuery = groq`*[
    (_type == 'homePage' && !$slug) || 
    (_type == "treatmentPage" && defined(language) && language == $language && slug.current == $slug && $parent in categories[]->slug[_key == $language][0].value.current) || 
    (_type == "articlePage" && defined(language) && language == $language && slug.current == $slug && !$parent) ||
    (!defined(language) && defined(slug) && slug[_key == $language][0].value.current == $slug ) ||
    (_type == "specialistPage" && slug.current == $slug) ||
    (_type == "teamPage" && slug[_key == $language][0].value.current == $slug) ||
    (_type == "clinicPage" && slug.current == $slug) ||
    (_type == "privacyPolicyPage" && slug[_key == $language][0].value.current == $slug)
][0] { _id, _type }`;

export const homePagePathsQuery = groq`*[_type=='homePage' && defined(language)] { language }`;

export const homePageQuery = groq`*[_type=="homePage" && _id == $id][0]{
    _id,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    secondaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "language": $language,
    "payoff": payoff[_key == $language][0].value,
    "aboutTitle": aboutTitle[_key == $language][0].value,
    "aboutBody": aboutBody[_key == $language][0].value,
    "valueProposition": valueProposition[_key == $language][0].value,
    "promotedCategories": promotedCategories[_key == $language].value[]-> {
        _id,
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value
        },
        "language": $language,
        "title": title[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
    },
    "finance": *[_type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
    "clinicList": *[_id == "clinicListPage"][0] {
        _id,
        primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
        "title": title[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
        "menuTitle": menuTitle[_key == $language][0].value,
        "description": description[_key == $language][0].value,
        "valueProposition": valueProposition[_key == $language][0].value,
    },
    "specialistList": *[_id == "specialistListPage"][0] {
        _id,
        "menuTitle": menuTitle[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    },
    "home": *[_type == "home"][0]{
        heroSections[]{
            eyebrow,
            headline,
            description,
            cta{
                label,
                url
            },
            "backgroundVideoUrl": backgroundVideo.asset->url
        },
        servicesSection{
            services[]{
                title,
                link,
                image{
                    hotspot,
                    crop,
                    asset->{
                        _id,
                        _type,
                        url,
                        metadata
                    }
                }
            }
        }
    }
}`;

export const categoryPagePathsQuery = groq`*[_type=='categoryPage'] {  "category": slug }`;

export const categoryPageQuery = groq`*[_type=='categoryPage' && _id == $id][0]{
    _id,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "language": $language,
    "title": title[_key == $language][0].value,
    "slug": slug[_key == $language][0].value.current,
    "about": about[_key == $language][0].value,
    "valueProposition": valueProposition[_key == $language][0].value,
    expertise {
        "title": title[_key == $language][0].value,
        "body": body[_key == $language][0].value
    },
    "treatments": *[_type == "treatmentPage" && ^._id in categories[]._ref && language == $language ] | order(coalesce(sortOrder, 10) asc, title asc) {
        _id,
        title,
        "slug": slug.current,
    },
    "teams": *[_type == "teamPage" && defined(description[_key == $language][0].value) && references(^._id)] {
        _id,
        "title": title[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
    },
    "clinicList": *[_id == "clinicListPage"][0] {
        primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "title": title[_key == $language][0].value,
    "menuTitle": menuTitle[_key == $language][0].value,
    "slug": slug[_key == $language][0].value.current,
    "heading": heading[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    "valueProposition": valueProposition[_key == $language][0].value,
    },
    "specialistList": *[_id == "specialistListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
    },
    "finance": *[_type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0]
}`;

export const treatmentPagePathsQuery = groq`*[_type=='treatmentPage' &&  defined(language)] { 
    language, 
    "categories": categories[]->slug[_key == ^.language][0].value.current, 
    "treatment": slug.current 
}`;

export const treatmentPageQuery = groq`*[_type=='treatmentPage' && _id == $id][0]{
    ...,
    "slug": slug.current,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        alt
    },
    "finance": *[ _type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
    "valueProposition":*[_id in ^.categories[]._ref && $parent == slug[_key == $language][0].value.current][0].valueProposition[_key == $language][0].value,
    "categories": categories[]->{ 
        "slug": slug[_key == $language][0].value.current,
    },
    "clinicList": *[_id == "clinicListPage"][0] {
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value
        },
        "title": title[_key == $language][0].value,
        "menuTitle": menuTitle[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
        "description": description[_key == $language][0].value,
        "valueProposition": valueProposition[_key == $language][0].value,
    },
    "specialistList": *[_id == "specialistListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
    },
}`;

export const specialistPagePathsQuery = groq`*[_type=='specialistPage'] { 
    "specialist": slug.current
}`;

export const specialistPageQuery = groq`*[_type=='specialistPage' && _id == $id][0] {
    ...,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "booking": booking {
        pasientSkyCalendarId,
        metodikaSpecialistId,
        "clinicSlug": *[_type == "clinicPage" && $id in specialists[]._ref][0].slug.current,
        ...*[_type == "clinicPage" && $id in specialists[]._ref][0].booking {
            method,
            serviceProviderId,
            metodikaCityId,
        }
    },
    "descriptionHeading": descriptionHeading[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    "slug": slug.current,
    "valueProposition": valueProposition{
        "socialProof": socialProof[_key == $language][0].value,
        "valueProposition1": valueProposition1[_key == $language][0].value,
        "valueProposition2": valueProposition2[_key == $language][0].value
    },
    "finance": *[ _type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
}`;

export const teamPageQuery = groq`*[_type == "teamPage" && _id == $id][0] {
    ...,
    "title": title[_key == $language][0].value,
    "tagline": tagline[_key == $language][0].value,
    "slug": slug[_key == $language][0].value.current,
    "primaryImage": primaryImage[_key == $language][0].value {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        alt
    },
    "description": description[_key == $language][0].value,
    "specalistListPageSlug": *[_type == "specialistListPage"][0].slug[_key == $language][0].value.current,
    "specialists": *[_type == "specialistPage" && defined(description[_key == $language][0].value) && references(^.category._ref)] | order(name) { 
        _id,
        name,
        "slug": slug.current,
        "valueProposition": valueProposition {
            "socialProof": socialProof[_key == $language][0].value,
            "valueProposition1": valueProposition1[_key == $language][0].value,
            "valueProposition2": valueProposition2[_key == $language][0].value
        },
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value
        },
    },
    "finance": *[ _type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
}`;

export const treatmentSpecialistsQuery = groq`*[_type=='specialistPage' && defined(description[_key == $language][0].value) && $treatment in treatments[]->slug.current] {
    ...,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "description": description[_key == $language][0].value,
    "slug": slug.current,
    "parent": *[_id == "specialistListPage"][0].slug[_key == $language][0].value,
    "valueProposition": valueProposition {
        "socialProof": socialProof[_key == $language][0].value,
        "valueProposition1": valueProposition1[_key == $language][0].value,
        "valueProposition2": valueProposition2[_key == $language][0].value
    },
    "booking": {
        "calendarId": booking.calendarId,
        "clinicSlug": *[_type == "clinicPage" && ^._id in specialists[]._ref][0].slug.current,
        "serviceProviderId": *[_type == "clinicPage" && ^._id in specialists[]._ref][0].booking.serviceProviderId,
    },
}`;

export const clinicPagePathsQuery = groq`*[_type=='clinicPage'] { 
    "clinic": slug.current
}`;

export const clinicPageQuery = groq`*[_type=='clinicPage' && _id == $id][0] {
    ...,
    "slug": slug.current,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value 
    },
    "treatments": treatments[ ^.language == description[_key == $language][0].value][]->{
        title,
        "slug": slug.current,
        "categories": categories[]->{ 
        "slug": slug[_key == $language][0].value.current,
        "title": title[_key == $language][0].value
        },
    },
    "specialists": specialists[ ^.language == description[_key == $language][0].value][]->{
        _id,
        name,
        "slug": slug.current,
        "valueProposition": valueProposition {
            "valueProposition1": valueProposition1[_key == $language][0].value,
        },
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value 
        },
    },
    "description": description[_key == $language][0].value,
    "slug": slug.current,
    "language": $language,
    "valueProposition": valueProposition{
        "socialProof": socialProof[_key == $language][0].value,
        "valueProposition1": valueProposition1[_key == $language][0].value,
        "valueProposition2": valueProposition2
    },
    "subTopics": subTopics{
        "title": title[_key == $language][0].value,
        "description": description[_key == $language][0].value 
    }[],
    "contactDescription": contactDescription[_key == $language][0].value,
    "contactInfo": contactInfo{
        streetAddress,
        "openingHours": openingHours[_key == $language][0].value,
        phoneNumber,
        email
    },
    "location": locationSearch,
    "specialistData": *[_type == "specialistListPage"][0] {
        "slug": slug[_key == $language][0].value.current,
        "title": title[_key == $language][0].value,
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value 
        }, 
    },
    "finance": *[ _type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
    booking {
        method,
        serviceProviderId,
        metodikaCityId,
        externalBookingUrl,
        redirectToExternalBookingUrl,
        showDescriptionWhenClosed,
        "descriptionWhenClosedDesktop": descriptionWhenClosedDesktop[_key == $language][0].value,
        "descriptionWhenClosedMobile": descriptionWhenClosedMobile[_key == $language][0].value,
    },
}`;

export const clinicListPageQuery = groq`*[_type == "clinicListPage" && _id == $id][0] {
    _id,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "title": title[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    "language": $language,
    "slug": slug[_key == $language][0].value.current,
    "clinics": *[_type == "clinicPage" && defined(description[_key == $language][0].value)] | order(title) {
        _id,
        title,
        "location": locationSearch,
        "slug": slug.current,
        "categories": treatments[]->categories[]->{
          _id,
          "language": $language,  
          "title": title [_key == $language][0].value,
          "slug": slug [_key == $language][0].value.current,
        }
       
    },
    "valueProposition": valueProposition[_key == $language][0].value,
    "faq": *[_type == "faq" && language == $language][0],
    "categoryOrder": *[_id == "globalSettings"][0].menuCategories[_key == $language].value[]-> {
    "title": title[_key == $language][0].value  
  },
    "categories": *[_type == "categoryPage"] {
        _id,
        "language": $language,
        "title": title[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    }
}`;

export const specialistListPageQuery = groq`*[_type == "specialistListPage" && _id == $id][0] {
    _id,
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value
    },
    "title": title[_key == $language][0].value,
    "valueProposition": valueProposition[_key == $language][0].value,
    "language": $language,
    "slug": slug[_key == $language][0].value.current,
    "body": body[_key == $language][0].value,
    "specialists": *[_type == "specialistPage" && defined(description[_key == $language][0].value)] | order(name) { 
        _id,
        name,
        "slug": slug.current,
        "categories": categories[]->{
            _id,
          "language": $language,  
          "title": title [_key == $language][0].value,
          "slug": slug [_key == $language][0].value.current,
        },
        "valueProposition": valueProposition {
            "socialProof": socialProof[_key == $language][0].value,
            "valueProposition1": valueProposition1[_key == $language][0].value,
            "valueProposition2": valueProposition2[_key == $language][0].value
        },
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value
        },
    },
    "faq": *[_type == "faq" && language == $language][0],
    "categoryOrder": *[_id == "globalSettings"][0].menuCategories[_key == $language].value[]-> {
    "title": title[_key == $language][0].value  
  },
    "categories": *[_type == "categoryPage" && defined(slug[_key == $language][0].value)] {
        _id,
        "language": $language,
        "title": title[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    }
  
}`;

export const globalSettingsQuery = groq`*[_id == "globalSettings"][0] {
    siteTitle,
    "siteDescription": siteDescription[_key == $language][0].value,
    siteImage,
    "menuCategories": menuCategories[_key == $language].value[]-> {
        _id,
        "language": $language,
        "title": title[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
        "about": about[_key == $language][0].value,
        hideFromMainMenu,
        "treatments": *[_type == "treatmentPage" && ^._id in categories[]._ref && language == $language] | order(coalesce(sortOrder, 10) asc, title asc) {
            _id,
            title,
            "slug": slug.current,
        }
    },
    "otherCategories": *[_type == "categoryPage" && !(_id in ^.menuCategories[_key == $language].value[]._ref) && defined(slug[_key == $language][0].value)] {
        _id,
        "language": $language,
        "title": title[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
        hideFromMainMenu,
        "treatments": *[_type == "treatmentPage" && ^._id in categories[]._ref && language == $language] | order(coalesce(sortOrder, 10) asc, title asc) {
            _id,
            title,
            "slug": slug.current,
        }
    },
    "clinics": *[_id == "clinicListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    },
    "specialists": *[_id == "specialistListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    },
    "socialMedia": socialMedia[_key == $language][0].value 
}`;

export const footerQuery = groq`*[_type == "footer" && language == $language][0] {
    language,
    title,
    phone,
    "email": email1,
    "clinics": *[_id == "clinicListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    },
    "specialists": *[_id == "specialistListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value, 
        "slug": slug[_key == $language][0].value.current,
    },
}`;

export const seoQuery = groq`*[($slug == null && _id == "homePage") || 
                               ($slug != null && slug.current == $slug && (!defined(language) || language == $language)) || 
                               ($slug != null && slug[_key == $language][0].value.current == $slug)][0] {
    _id,
    _type,
    "title": coalesce(title[_key == $language][0].value, title),
    _type == "homePage" => {
        "title": payoff[_key == $language][0].value,
    },
    _type == "specialistPage" => {
        "title": name,
    },
    "image": primaryImage.image,
    "description": coalesce(aboutBody[_key == $language][0].value, description[_key == $language][0].value, body[_key == $language][0].value, body),
    seo {
        _type == 'seo' => {
            title,
            description,
            image
        },
        _type == "internationalizedSeo" => {
            "title": title[_key == $language][0].value,
            "description": description[_key == $language][0].value,
            image
        }
    }
}`;

export const alternateLanguagesQuery = groq`*[_type == "translation.metadata" && $id in translations[].value._ref][0].translations[].value->{ language, slug }`;

export const alternateLanguageSlugQuery = groq`*[_id == $id][0].slug[]`;

export const alternateParentLanguageSlugQuery = groq`*[$slug == slug[_key == $language][0].value.current].slug[]`;

export const alternateLanguagesByDescriptionQuery = groq`*[_id == $id][0] {
    "slug": slug.current,
    "languages":  description[][]._key,
    _type == "clinicPage" => {
        "parents": *[_id == "clinicListPage"][0].slug[] { _key, "slug": value.current }  
    },
    _type == "specialistPage" => {
        "parents": *[_id == "specialistListPage"][0].slug[] { _key, "slug": value.current },  
    },
}`;

export const caregiversSpecialistQuery = groq`*[_type == "specialistPage" && booking.caregiverId in $caregiverIds] {
    name,
    "description": description[_key == $language][0].value,
    "caregiverId": booking.caregiverId,
    "timeslots": [],
}`;

export const notFoundQuery = groq`*[_id == "globalSettings"][0].notFound {
    primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        "alt": alt[_key == $language][0].value,
    },
    "content": content[_key == $language][0].value,
    "valueProposition": *[_id == "homePage"][0].valueProposition[_key == $language][0].value {
        valueProposition1,
        valueProposition2,
    },
}`;

export const privacyPolicyPageQuery = groq`*[_id == "privacyPolicy"][0] {
    _id,
    "language": $language,
    "title": title[_key == $language][0].value,
    "slug": slug[_key == $language][0].value.current,
    "body": body[_key == $language][0].value,
    cookiebotKey
}`;

export const tagManagerCodeQuery = groq`*[_id == "globalSettings"][0] {
    tagManagerCode,
}`;

export const bookingClinicsQuery = groq`*[_type == "clinicPage" && defined(description[_key == $clinicLanguage][0].value) && $categorySlug in treatments[]->categories[]->slug[_key == $language].value.current] {
    title,
    booking {
        method,
        serviceProviderId,
        metodikaCityId,
        externalBookingUrl,
        redirectToExternalBookingUrl,
        showDescriptionWhenClosed,
        "descriptionWhenClosedDesktop": descriptionWhenClosedDesktop[_key == $language][0].value,
        "descriptionWhenClosedMobile": descriptionWhenClosedMobile[_key == $language][0].value,
    },
    contactInfo {
        phoneNumber,
        streetAddress,
        "openingHours": openingHours[_key == $language][0].value,
        email
    },
    "category": *[_type == "categoryPage" && slug[_key == $language][0].value.current == $categorySlug] {
        "title": title[_key == $language][0].value,
        "metodikaActivityGroupTitle": metodikaActivityGroupTitle[_key == $language][0].value
    }[0],
}`;
export type BookingClinicsQueryResult = Array<{
    title: string;
    booking: ClinicPage["booking"];
    contactInfo: ClinicPage["contactInfo"];
    category?: {
        title?: string | null;
        metodikaActivityGroupTitle?: string | null;
    } | null;
}>;

export const articlePageQuery = groq`*[_type == "articlePage" && _id == $id && language == $language][0] {
    _id,
    language,
    title,
    "slug": slug.current,
    "primaryImage": primaryImage {
        image {
            hotspot,
            crop,
            asset->{
                ...,
                metadata,
            }
        },
        alt,
    },
    "body": body[] {
        ...select(
          _type == 'imageNotLocalized' => @ {
            ...,
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
          },
          @,
        )
    },
    "subTopics": subTopics[] {
        ...,  
        "description": description[] {
            ...select(
                _type == 'imageNotLocalized' => @ {
                    ...,
                    image {
                        hotspot,
                        crop,
                        asset->{
                            ...,
                            metadata,
                        }
                    },
                },
                @,
            )
        }
    },
    "clinicList": *[_id == "clinicListPage"][0] {
        primaryImage {
            image {
                hotspot,
                crop,
                asset->{
                    ...,
                    metadata,
                }
            },
            "alt": alt[_key == $language][0].value
        },
        "title": title[_key == $language][0].value,
        "menuTitle": menuTitle[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
        "description": description[_key == $language][0].value,
        "valueProposition": valueProposition[_key == $language][0].value,
    },
    "specialistList": *[_id == "specialistListPage"][0] {
        "menuTitle": menuTitle[_key == $language][0].value,
        "slug": slug[_key == $language][0].value.current,
    },
    "finance": *[ _type == "finance" && language == $language][0],
    "faq": *[_type == "faq" && language == $language][0],
}`;

/**
 * Clinics for simple booking flow. Using language="se" in the query
 * because this flow is for booking in Sweden, but the returned text
 * is in the language displayed on the site
 */
export const simpleBookingClinicsQuery = groq`*[_type == "clinicPage" && defined(description[_key == "se"][0].value) && $category in treatments[]->categories[]->slug[_key == "se"].value.current] {
  title,
  contactInfo {
		...,
		"openingHours": openingHours[_key == $language][0].value,
		"phoneOpeningHours": phoneOpeningHours[_key == $language][0].value,
	},
    booking {
        externalBookingUrl,
        redirectToExternalBookingUrl,
    }
}`;

export const bookingCategoriesQuery = groq`*[_type == "categoryPage" && defined(title[_key == $language][0].value) && defined(slug[_key == $language][0].value.current)] | order(title[_key == $language][0].value asc) {
  "title": title[_key == $language][0].value,
  "slug": slug[_key == $language][0].value.current,
  "about": about[_key == $language][0].value,
  "bookable": length(*[_type == "clinicPage" && defined(description[_key == $clinicLanguage][0].value) && ^._id in treatments[]->categories[]._ref]) > 0
}`;

export const bookingSpecialistDataQuery = groq`*[_type == "specialistPage" && slug.current == $specialistSlug][0] {
    "title": *[_type == "clinicPage" && ^._id in specialists[]._ref][0].title,
    "booking": {
        ...*[_type == "clinicPage" && ^._id in specialists[]._ref][0].booking {
            method,
            serviceProviderId,
            metodikaCityId,
            externalBookingUrl,
            redirectToExternalBookingUrl,
            showDescriptionWhenClosed,
            "descriptionWhenClosedDesktop": descriptionWhenClosedDesktop[_key == $language][0].value,
            "descriptionWhenClosedMobile": descriptionWhenClosedMobile[_key == $language][0].value,
        },
        "pasientSkyCalendarId": calendarId,
        metodikaSpecialistId,
    },
    "contactInfo": *[_type == "clinicPage" && ^._id in specialists[]._ref][0].contactInfo {
        phoneNumber,
        streetAddress,
        "openingHours": openingHours[_key == $language][0].value,
        email
    },
}`;
export type BookingSpecialistDataQueryResult = {
    title: string;
    booking: ClinicPage["booking"] & {
        pasientSkyCalendarId?: string;
        metodikaSpecialistId?: number;
    };
    contactInfo: ClinicPage["contactInfo"];
};

export const bookingClinicDataQuery = groq`*[_type == "clinicPage" && slug.current == $clinicSlug][0] {
    title,
    booking {
        method,
        serviceProviderId,
        metodikaCityId,
        externalBookingUrl,
        redirectToExternalBookingUrl,
        showDescriptionWhenClosed,
        "descriptionWhenClosedDesktop": descriptionWhenClosedDesktop[_key == $language][0].value,
        "descriptionWhenClosedMobile": descriptionWhenClosedMobile[_key == $language][0].value,
    },
    contactInfo {
        phoneNumber,
        streetAddress,
        "openingHours": openingHours[_key == $language][0].value,
        email
    },
}`;
export type BookingClinicDataQueryResult = {
    title: string;
    booking: ClinicPage["booking"];
    contactInfo: ClinicPage["contactInfo"];
};

export const redirectsQuery = groq`*[_type == "redirect"] {
  "source": source.current,
  type,
  "destinationSlug": destinationSlug.current,
  "destinationUrl": destinationUrl,
  permanent
  }`;
export type RedirectsDataQueryResult = Array<{
    source?: string | null;
    type?: "slug" | "url" | null;
    destinationSlug?: string | null;
    destinationUrl?: string | null;
    permanent?: boolean | null;
}>;

// Booking queries for new booking flow
export const bookingServicesByCategoryQuery = groq`*[_type == "categoryPage" && defined(title[_key == $language][0].value) && defined(slug[_key == $language][0].value.current)] | order(title[_key == $language][0].value asc) {
  "id": slug[_key == $language][0].value.current,
  "label": title[_key == $language][0].value,
  "services": *[_type == "treatmentPage" && language == $language && ^._id in categories[]._ref] | order(coalesce(sortOrder, 10) asc, title asc) {
    "name": title,
    "slug": slug.current,
    "price": "",
    "duration": ""
  }
}`;

export const bookingClinicsForServiceQuery = groq`*[_type == "clinicPage" && defined(description[_key == $clinicLanguage][0].value) && $treatmentSlug in treatments[]->slug.current] {
  "id": slug[_key == $clinicLanguage][0].value.current,
  "label": title,
  "address": contactInfo.streetAddress,
  "phone": contactInfo.phoneNumber,
  "email": contactInfo.email,
  booking {
    method,
    serviceProviderId,
    metodikaCityId,
    externalBookingUrl,
    redirectToExternalBookingUrl
  }
}`;

export const bookingSpecialistsQuery = groq`*[_type == "specialistPage" && defined(description[_key == $language][0].value)] {
  _id,
  "name": name,
  "slug": slug.current,
  "title": descriptionHeading[_key == $language][0].value,
  "image": primaryImage.image.asset->url,
  "bio": description[_key == $language][0].value[0].children[0].text,
  "expertise": valueProposition.valueProposition1[_key == $language].value[],
  "languages": [],
  "clinics": *[_type == "clinicPage" && ^._id in specialists[]._ref].title,
  "education": "",
  "experience": ""
}`;
