import { getHotelById } from "@/actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";

interface HotelDetailsProps {
  params: {
    hotelId: string;
  };
}

const HotelDetails = async ({ params }: HotelDetailsProps) => {
  const hotelParams = await params;
  const hotel = await getHotelById(hotelParams.hotelId);

  if (!hotel) return <div>Oops! No hotel found...</div>;

  return (
    <div>
        <HotelDetailsClient hotel={hotel}/>
    </div>
  );
};

export default HotelDetails;
