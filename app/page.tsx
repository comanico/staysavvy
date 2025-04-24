import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/hotel/HotelList";

interface HomeProps {
  searchParams: Promise<{
    title: string;
    country: string;
    state: string;
    city: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(await searchParams);

  if (!hotels) return <div>No hotels found...</div>;

  return (
      <div>
        <HotelList hotels={hotels} />
      </div>
  );
}
