interface ParamsType {
  language: string;
  path?: string[];
  [key: string]: string | string[];
}

type SanityImage = import("sanity").Image & {
  asset: { metadata: { lqip: string }; altText?: string };
};

interface ValueProposition {
  socialProof: string;
  valueProposition1?: string;
  valueProposition2?: string;
}

interface HomePage {
  title: string;
  language: string;
  primaryImage: ImageWithAlt;
  primaryVideo?: VideoObject;
  secondaryImage: ImageWithAlt;
  secondaryVideo?: VideoObject;
  payoff: string;
  aboutTitle: string;
  aboutBody: import("sanity").PortableTextBlock[];
  valueProposition: ValueProposition;
  promotedCategories?: import("@sanity/client").SanityDocument<
    Pick<CategoryPage, "primaryImage" | "title" | "slug" | "language">
  >[];
  home?: HomeDocument;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
  clinicList: import("@sanity/client").SanityDocument<
    Pick<
      ClinicListPage,
      | "title"
      | "menuTitle"
      | "description"
      | "slug"
      | "primaryImage"
      | "valueProposition"
    >
  >;
  specialistList: import("@sanity/client").SanityDocument<
    Pick<SpecialistListPage, "menuTitle" | "slug">
  >;
}

interface HomeDocument {
  heroSections?: HeroVideoCard[];
  servicesSection?: {
    services?: ServiceCard[];
  };
}

interface HeroVideoCard {
  eyebrow?: string;
  headline: string;
  description?: string;
  backgroundVideoUrl?: string;
  cta?: {
    label?: string;
    url?: string;
  };
}

interface ServiceCard {
  title: string;
  link?: string;
  image: SanityImage;
}

interface CategoryPage {
  language: string;
  primaryImage: ImageWithAlt;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
  title: string;
  slug: string;
  about: import("sanity").PortableTextBlock[];
  hideFromMainMenu?: boolean | null;
  valueProposition: ValueProposition;
  expertise: {
    title: string;
    body: string;
  };
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
  treatments: Pick<
    import("@sanity/client").SanityDocument<TreatmentPage>,
    "title" | "slug" | "_id"
  >[];
  teams: Pick<
    import("@sanity/client").SanityDocument<TeamPage>,
    "title" | "slug" | "_id"
  >[];
  clinicList: import("@sanity/client").SanityDocument<
    Pick<
      ClinicListPage,
      | "title"
      | "menuTitle"
      | "description"
      | "slug"
      | "primaryImage"
      | "valueProposition"
    >
  >;
  specialistList: import("@sanity/client").SanityDocument<
    Pick<SpecialistListPage, "menuTitle" | "slug">
  >;
}

interface TreatmentPage {
  title: string;
  slug: string;
  primaryImage: ImageWithAlt;
  secondaryImage: SanityImage;
  body: import("sanity").PortableTextBlock[];
  subTopics?: SubTopic[];
  categories: Pick<
    import("@sanity/client").SanityDocument<CategoryPage>,
    "slug"
  >[];
  testimonial?: Testimonial;
  bookingLink: import("sanity").Link;
  language: string;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
  valueProposition: ValueProposition;
  clinicList: import("@sanity/client").SanityDocument<
    Pick<
      ClinicListPage,
      | "title"
      | "menuTitle"
      | "description"
      | "slug"
      | "primaryImage"
      | "valueProposition"
    >
  >;
  specialistList: import("@sanity/client").SanityDocument<
    Pick<SpecialistListPage, "menuTitle" | "slug">
  >;
}

interface HomePageQuery {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _key: string;
  title: string;
  language: string;
  finance: SubTopicsWithIntro;
}

interface SubTopicsWithIntro {
  title: string;
  ingress: import("sanity").PortableTextBlock[];
  subTopics: SubTopic[];
}

interface SubTopic {
  title?: string;
  description?: import("sanity").PortableTextBlock[];
}

interface SpecialistPage {
  name: string;
  slug: string;
  primaryImage: ImageWithAlt;
  descriptionHeading: string;
  description: import("sanity").PortableTextBlock[];
  valueProposition: ValueProposition;
  categories: CategoriesInClinicList[];
  booking?: SpecialistBooking;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
}

interface TeamPage {
  title: string;
  tagline: string;
  slug: string;
  country: "no" | "se";
  primaryImage: ImageWithAlt;
  description: import("sanity").PortableTextBlock[];
  category: CategoriesInClinicList;
  specalistListPageSlug: string;
  specialists: import("@sanity/client").SanityDocument<
    Pick<SpecialistPage, "name" | "slug" | "primaryImage" | "valueProposition">
  >[];
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
}

interface SpecialistBooking {
  pasientSkyCalendarId?: string;
  metodikaSpecialistId?: number;
  clinicSlug?: string;
  method?: ClinicBooking["method"];
  serviceProviderId?: string;
  metodikaCityId?: number;
}

interface ClinicPage {
  title: string;
  slug: string;
  primaryImage: ImageWithAlt;
  location: Location;
  contactInfo: ContactInfo;
  description: import("sanity").PortableTextBlock[];
  treatments: TreatmentsInClinic[];
  specialists: SpecilistsInClinic[];
  categories: import("@sanity/client").SanityDocument<
    Pick<CategoryPage, "title">
  >[];
  language: string;
  valueProposition: ValueProposition;
  subTopics?: SubTopic[];
  contactDescription: string;
  specialistData: SpecialistDataInClinicPage;
  booking?: ClinicBooking;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
}

interface ClinicBooking {
  method?: "info" | "pasientsky" | "metodika" | "closed";
  serviceProviderId?: string;
  metodikaCityId?: number;
  externalBookingUrl?: string;
  redirectToExternalBookingUrl?: boolean;
  showDescriptionWhenClosed?: boolean;
  descriptionWhenClosedDesktop?: import("sanity").PortableTextBlock[];
  descriptionWhenClosedMobile?: import("sanity").PortableTextBlock[];
}

interface ContactInfo {
  streetAddress: string;
  openingHours: string;
  phoneOpeningHours?: string;
  phoneNumber: string;
  email: string;
}

interface Location {
  location: import("sanity").GeopointValue;
  placeId: string;
}

interface ClinicListPage {
  language: string;
  title: string;
  menuTitle: string;
  slug: string;
  valueProposition: ValueProposition;
  primaryImage: ImageWithAlt;
  description: import("sanity").PortableTextBlock[];
  clinics: import("@sanity/client").SanityDocument<
    Pick<ClinicPage, "title" | "slug" | "location"> & {
      categories: CategoriesInClinicList[];
    }
  >[];
  faq: SubTopicsWithIntro;
  categoryOrder: {
    title: string;
  }[];
  categories: import("@sanity/client").SanityDocument<
    Pick<CategoryPage, "title">
  >[];
}

interface SpecialistListPage {
  _id: string;
  language: string;
  title: string;
  menuTitle: string;
  slug: string;
  valueProposition: ValueProposition;
  primaryImage: ImageWithAlt;
  body: string;
  specialists: import("@sanity/client").SanityDocument<SpecialistPage>[];
  faq: SubTopicsWithIntro;
  categoryOrder: {
    title: string;
  }[];
  categories: import("@sanity/client").SanityDocument<
    Pick<CategoryPage, "title">
  >[];
}

interface Testimonial {
  age: string;
  name: string;
  text: string;
  title: string;
}

interface GlobalSettings {
  siteTitle: string;
  siteDescription?: string;
  siteImage: import("sanity").Image;
  menuCategories: import("@sanity/client").SanityDocument<
    Pick<
      CategoryPage,
      "title" | "slug" | "language" | "about" | "hideFromMainMenu"
    > & {
      treatments?: Array<{
        _id: string;
        title: string;
        slug: string;
      }>;
    }
  >[];
  otherCategories: import("@sanity/client").SanityDocument<
    Pick<CategoryPage, "title" | "slug" | "language" | "hideFromMainMenu"> & {
      treatments?: Array<{
        _id: string;
        title: string;
        slug: string;
      }>;
    }
  >[];
  clinics: Pick<ClinicListPage, "menuTitle" | "slug">;
  specialists: Pick<SpecialistListPage, "menuTitle" | "slug">;
  socialMedia: {
    facebookUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
  };
}

interface FooterSettings {
  language;
  title: string;
  phone?: { label: string; phoneNo: string };
  email?: { label: string; email: string };
  clinics: Pick<ClinicListPage, "menuTitle" | "slug">;
  specialists: Pick<SpecialistListPage, "menuTitle" | "slug">;
}

interface About {
  title: string;
  body: string;
  valueProposition: ValueProposition;
}

interface Seo {
  title?: string;
  description?: string;
  image?: import("sanity").Image;
}

interface SeoQueryData {
  _id: string;
  _type: string;
  title: string;
  image?: import("sanity").Image;
  description?: string | import("sanity").PortableTextBlock[];
  seo?: Seo;
}

interface ImageWithAlt {
  image: SanityImage;
  alt?: string;
}

interface VideoObject {
  videoType: "file" | "youtube";
  videoFile?: {
    asset?: {
      _id?: string;
      _ref?: string;
      _type?: string;
      url?: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
  youtubeUrl?: string;
  poster?: SanityImage;
  alt?: string;
}

interface NotFoundData {
  primaryImage: ImageWithAlt;
  content: import("sanity").PortableTextBlock[];
  valueProposition: ValueProposition;
}

interface SpecilistsInClinic {
  _id: string;
  name: string;
  slug: string;
  primaryImage: ImageWithAlt;
  valueProposition: Pick<ValueProposition, "valueProposition1">;
}

interface TreatmentsInClinic {
  title: string;
  slug: string;
  categories: { title: string; slug: string }[];
}

interface SpecialistDataInClinicPage {
  slug: string;
  title: string;
  primaryImage: ImageWithAlt;
}

interface CategoriesInClinicList {
  _id: string;
  language: string;
  title: string;
  slug: string;
}

interface CaregiverSpecialist {
  name: string;
  primaryImage: ImageWithAlt;
  description: import("sanity").PortableTextBlock[];
  caregiverId: string;
  timeslots: import("@/src/lib/webdoc/types").Booking[];
}

interface BookingPatientInfo {
  name: string;
  birthdate: string;
  areacode: string;
  phone?: string;
}

interface ArticlePage {
  language: string;
  title: string;
  slug: string;
  primaryImage: ImageWithAlt;
  body: import("sanity").PortableTextBlock[];
  subTopics?: SubTopic[];
  clinicList: import("@sanity/client").SanityDocument<
    Pick<
      ClinicListPage,
      | "title"
      | "menuTitle"
      | "description"
      | "slug"
      | "primaryImage"
      | "valueProposition"
    >
  >;
  specialistList: import("@sanity/client").SanityDocument<
    Pick<SpecialistListPage, "menuTitle" | "slug">
  >;
  finance: SubTopicsWithIntro;
  faq: SubTopicsWithIntro;
}

interface PrivacyPolicyPage {
  language: string;
  title: string;
  slug: string;
  body?: import("sanity").PortableTextBlock[];
  cookiebotKey?: string;
}

type BookingCategory = Pick<CategoryPage, "title" | "slug" | "about"> & {
  bookable: boolean;
};

type PathQuery =
  | {
    _type: "homePage";
    _updatedAt: string;
    language: string;
  }
  | {
    _type: "articlePage";
    _updatedAt: string;
    language: string;
    slug: { current: string };
  }
  | {
    _type:
    | "categoryPage"
    | "clinicListPage"
    | "specialistListPage"
    | "teamPage";
    _updatedAt: string;
    language: string;
    slug: LocalizedSlug[];
  }
  | {
    _type: "treatmentPage";
    _updatedAt: string;
    language: string;
    slug: string;
    parents: string[];
  }
  | {
    _type: "clinicPage" | "specialistPage";
    _updatedAt: string;
    slug: string;
    parent: LocalizedSlug[];
    languages: string[];
  };
interface LocalizedSlug {
  _key: string;
  value: { current: string };
}
