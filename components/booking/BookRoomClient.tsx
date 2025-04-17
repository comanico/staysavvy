"use client";

import useBookRoom from "@/hooks/useBookRoom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import RoomCard from "../room/RoomCard";
import RoomPaymentForm from "./RoomPaymentForm";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const BookRomClient = () => {
  const { bookingRoomData, clientSecret } = useBookRoom();
  const [paymentSucess, setPaymentSucess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme.theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSucess(value);
  };

  if (pageLoaded && !paymentSucess && (!bookingRoomData || !clientSecret)) {
    return (
      <div className="flex items-center flex-col gap-4">
        <div>This page could not be properly loaded...</div>
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/")}>Home</Button>
          <Button onClick={() => router.push("/my-bookings")}>
            View My Bookings
          </Button>
        </div>
      </div>
    );
  }

  if (paymentSucess) {
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-teal-500 text-center">Payment Success</div>
        <Button onClick={() => router.push("/my-bookings")}>
          View Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <h3 className="text-2xl font-smeibold">
            Complete payment to reserve this room
          </h3>
          <div className="mb-6">
            <RoomCard room={bookingRoomData.room} />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <RoomPaymentForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default BookRomClient;
