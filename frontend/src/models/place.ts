interface PlaceProps {
  _id: string;
  imageUrl: string;
  title: string;
  address: string;
  description: string;
  creator?: string;
  coordinates: { lat: number; lng: number };
  onDelete?: (id: string) => void;
}

export default PlaceProps;
