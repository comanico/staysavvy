import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from '@clerk/nextjs/server'

interface HotelPageProps {
    params: {
        hotelId: string;
    }
}

const Hotel = async ({params} : HotelPageProps) => {
    const param = await params;
    const hotel = await getHotelById(param.hotelId);
    const {userId} = await auth();

    if (!userId) return <div>Not authenticated...</div>

    if (hotel && hotel.userId !== userId) return <div>Access denied...</div>

    return (
        <div>
            <AddHotelForm hotel={hotel}/>
        </div>
    )
} 

export default Hotel;