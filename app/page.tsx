import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/hotel/HotelList";
import ReactCookieBot from "react-cookiebot";

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
      <ReactCookieBot
        domainGroupId={process.env.COOKIEBOT_CBID}
        language="en"
      />
      <HotelList hotels={hotels} />
    </div>
  );
}
