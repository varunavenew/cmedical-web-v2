# PatientSky setup

The PatientSky integration requires two environment variables to be set:

```sh
NEXT_PUBLIC_PATIENTSKY_IFRAME_URL=https://psno-patient-platform-fe.svc.pasientsky.no
NEXT_PUBLIC_PATIENTSKY_API_URL=https://psno-planner.svc.pasientsky.no
```

In addition, each clinic that should be bookable needs a `serviceProviderId` filled in. This can be found on the settings page for the web booking in PatientSky by examining the embed code. For booking a specific specialist, the specialist should be connected to a particular clinic with a `serviceProviderId` and must have a `calendarId` filled in.

## Custom style for embedded booking form

Add this script to the field "Sporingsscript for brukerbesøk på bestillingssiden" on the settings page for web bookings:

```js
(function (d) {
  var b = d.querySelector(".main-content");
  var c = d.querySelector(".booking-container");
  b.style.backgroundColor = "#fff";
  c.style.boxShadow = "none";
})(document);
```

This script will set some styles on the form making it blend in better when embedded with an iframe.
