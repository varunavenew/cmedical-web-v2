// Get city and caregiver ids from Metodika's settings endpoint so we have the
// data we need to manually add the ids in Sanity.
// Ideally we'd get this from an officially supported endpoint and create an
// autosuggest dropdown in Sanity to make it easy to add correct id to a clinic
// or a specialist.

// HACK: Workaround for the "Error: unable to verify the first certificate" error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// This URL is what the Metodika iframe loads to get data
const URL =
  "https://ws.metodika.com/skalpell/ws/wb3/backend/init.php?metodika_system=cme&lang=nor";

(async function run() {
  const response = await fetch(URL);
  const content = await response.json();
  const data = content.data;

  const cities = getCities(data);
  console.log("Cities:");
  for (const city of cities) {
    console.log(`- ${city.name}: ${city.id}`);
  }

  console.log("");

  const caregivers = getCaregivers(data);
  console.log("Caregivers:");
  for (const caregiver of caregivers) {
    console.log(`- ${caregiver.name} (${caregiver.email}): ${caregiver.id}`);
  }
})();

function getCities(data) {
  const settingsLocationsGroupName = data.settings.settingsLocationsGroupName;
  if (settingsLocationsGroupName.length === 0) {
    throw new Error("settingsLocationsGroupName is empty");
  }

  const locationsGroup = settingsLocationsGroupName[0].locationsGroup;

  return locationsGroup.map((location, index) => ({
    id: index,
    name: location.name,
  }));
}

function getCaregivers(data) {
  const caregivers = data.caregivers;

  return caregivers.map((caregiver) => {
    let name = caregiver.firstname;
    if (caregiver.lastname) {
      name = `${name} ${caregiver.lastname}`;
    }

    return {
      id: caregiver.id,
      name,
      email: caregiver.email || "N/A",
    };
  });
}
