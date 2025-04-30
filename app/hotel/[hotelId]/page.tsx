import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
  params: Promise<{
    hotelId: string;
  }>;
}

const Hotel = async ({ params }: HotelPageProps) => {
  const param = await params;
  const hotel = await getHotelById(param.hotelId);
  const { userId } = await auth();
  const whitelistedUserIds = (process.env.WHITELISTED_USERS || "").split(',')

  if (!userId) return <div>Not authenticated...</div>;

  if (!whitelistedUserIds.includes(userId)) {
    return <div>Access denied...</div>;
  }

  if (hotel && hotel.userId !== userId) return <div>Access denied...</div>;

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
};

export default Hotel;
