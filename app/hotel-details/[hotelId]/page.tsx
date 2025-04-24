import { getBookings } from "@/actions/getBookings";
import { getHotelById } from "@/actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";

interface HotelDetailsProps {
  params: Promise<{
    hotelId: string;
  }>;
}

const HotelDetails = async ({ params }: HotelDetailsProps) => {
  const hotelParams = await params;
  const hotel = await getHotelById(hotelParams.hotelId);
  if (!hotel) return <div>Oops! No hotel found...</div>;

  const bookings = await getBookings(hotel.id);

  return (
    <div>
      <HotelDetailsClient hotel={hotel} bookings={bookings} />
    </div>
  );
};

export default HotelDetails;
