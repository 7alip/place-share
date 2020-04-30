import mapbox from "@mapbox/mapbox-sdk/services/geocoding";
import { MapiResponse } from "@mapbox/mapbox-sdk/lib/classes/mapi-response";

const geocodingClient = mapbox({
  accessToken:
    "pk.eyJ1IjoiN2FsaXAiLCJhIjoiY2s5M2x0cnJwMDI0MDNycWxwZmkwZHNpaSJ9.Pks-bKp8MIQ6m_zq6V0sfw",
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
