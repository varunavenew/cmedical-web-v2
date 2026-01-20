import { at, defineMigration, set, setIfMissing } from "@sanity/migrate";
import { customAlphabet } from "nanoid";
import { PortableTextBlock } from "sanity";

// Create an id with the same characters and the same length as the keys created by @sanity/migrate
const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  22
);

type ClinicData = {
  method: "closed" | "metodika";
  metodikaCityId?: number;
  showDescriptionWhenClosed?: boolean;
  descriptionWhenClosedDesktop?: PortableTextBlock[];
  descriptionWhenClosedMobile?: PortableTextBlock[];
};

// A manually created map of clinic page slugs with new booking data
const clinics: Record<string, ClinicData> = {
  majorstuen: {
    method: "closed",
    metodikaCityId: 0,
    showDescriptionWhenClosed: true,
    descriptionWhenClosedDesktop: createDescriptionWhenClosedDesktop(),
    descriptionWhenClosedMobile: createDescriptionWhenClosedMobile(),
  },
  bekkestua: {
    method: "closed",
    metodikaCityId: 1,
    showDescriptionWhenClosed: true,
    descriptionWhenClosedDesktop: createDescriptionWhenClosedDesktop(),
    descriptionWhenClosedMobile: createDescriptionWhenClosedMobile(),
  },
  ski: {
    method: "closed",
    showDescriptionWhenClosed: false,
  },
};

export default defineMigration({
  title: "Clinic page booking with Metodika support",
  documentTypes: ["clinicPage"],

  migrate: {
    document(clinicPage: any) {
      const slug = clinicPage.slug.current;
      if (typeof slug !== "string") {
        return;
      }

      // Check if we have new data for this clinic
      const clinic = clinics[slug];
      if (clinic != null) {
        const actions = [
          at("booking", setIfMissing({})),
          at("booking.method", set(clinic.method)),
          at("booking.metodikaCityId", set(clinic.metodikaCityId)),
          at(
            "booking.showDescriptionWhenClosed",
            set(clinic.showDescriptionWhenClosed)
          ),
          at(
            "booking.descriptionWhenClosedDesktop",
            set(clinic.descriptionWhenClosedDesktop)
          ),
          at(
            "booking.descriptionWhenClosedMobile",
            set(clinic.descriptionWhenClosedMobile)
          ),
        ];

        return actions;
      }

      // Check if this clinic should be explicitly set to show the PasientSky form
      if (clinicPage.booking?.serviceProviderId != null) {
        return [
          at("booking", setIfMissing({})),
          at("booking.method", set("pasientsky")),
        ];
      }

      // All other clinics should use the default "info" booking method
      return [
        at("booking", setIfMissing({})),
        at("booking.method", set("info")),
      ];
    },
  },
});

function createDescriptionWhenClosedDesktop() {
  const telephoneKeyNo = nanoid();
  const telephoneKeyEn = nanoid();

  return [
    {
      _key: "no",
      _type: "internationalizedArrayModifiedFormattedTextValue",
      value: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Vi forbedrer systemet, og derfor er vår online booking utilgjengelig. Online booking er tilgjengelig igjen fra 26.08 kl. 07:00.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Ønsker du å booke time i mellomtiden, vennligst ring oss på ",
            },
            {
              _type: "span",
              marks: [telephoneKeyNo],
              text: "22600050",
            },
            {
              _type: "span",
              marks: [],
              text: ", så kontakter vi deg så snart vi kan.",
            },
          ],
          markDefs: [
            {
              _key: telephoneKeyNo,
              _type: "link",
              href: "tel:22600050",
            },
          ],
          style: "normal",
        },
      ],
    },
    {
      _key: "en",
      _type: "internationalizedArrayModifiedFormattedTextValue",
      value: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "We are improving our system, so online booking is currently unavailable. Online booking will be available again from 26.08 at 07:00 am. ",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "If you wish to schedule an appointment during this period, please call us at ",
            },
            {
              _type: "span",
              marks: [telephoneKeyEn],
              text: "22600050",
            },
            {
              _type: "span",
              marks: [],
              text: ", and we will get back to you as soon as possible.",
            },
          ],
          markDefs: [
            {
              _key: telephoneKeyEn,
              _type: "link",
              href: "tel:22600050",
            },
          ],
          style: "normal",
        },
      ],
    },
  ];
}

function createDescriptionWhenClosedMobile() {
  const telephoneKeyNo = nanoid();
  const telephoneKeyEn = nanoid();

  return [
    {
      _key: "no",
      _type: "internationalizedArrayModifiedFormattedTextValue",
      value: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Online booking er tilgjengelig igjen fra 26.08 kl. 07:00.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Ring ",
            },
            {
              _type: "span",
              marks: [telephoneKeyNo],
              text: "22600050",
            },
            {
              _type: "span",
              marks: [],
              text: " for å booke time i mellomtiden, så kontakter vi deg så snart vi kan.",
            },
          ],
          markDefs: [
            {
              _key: telephoneKeyNo,
              _type: "link",
              href: "tel:22600050",
            },
          ],
          style: "normal",
        },
      ],
    },
    {
      _key: "en",
      _type: "internationalizedArrayModifiedFormattedTextValue",
      value: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Online booking is available again from 26.08 at 07:00 am.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              marks: [],
              text: "Call ",
            },
            {
              _type: "span",
              marks: [telephoneKeyEn],
              text: "22600050",
            },
            {
              _type: "span",
              marks: [],
              text: " to schedule an appointment in the meantime, and we’ll get back to you as soon as possible.",
            },
          ],
          markDefs: [
            {
              _key: telephoneKeyEn,
              _type: "link",
              href: "tel:22600050",
            },
          ],
          style: "normal",
        },
      ],
    },
  ];
}
