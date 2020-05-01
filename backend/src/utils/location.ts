import mapbox from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = mapbox({
  accessToken: process.env.MAPBOX_TOKEN!,
});

const getCoordsForAddress: (
  address: string
) => Promise<[string, string]> = async (address) => {
  const result = await geocodingClient
    .forwardGeocode({
      query: address,
      limit: 2,
      mode: "mapbox.places",
    })
    .send();

  return result.body.features[0]?.center;
};

export default getCoordsForAddress;
