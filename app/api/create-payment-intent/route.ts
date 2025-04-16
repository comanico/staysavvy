import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { booking, payment_intent_id } = body;

  const bookingData = {
    ...booking,
    userName: user.firstName,
    userEmail: user.emailAddresses[0].emailAddress,
    userId: user.id,
    currency: "usd",
    paymentIntentId: payment_intent_id,
  };

  let foundBooking;

  if (payment_intent_id) {
    foundBooking = await prismadb.booking.findUnique({
      where: { paymentIntentId: payment_intent_id, userId: user.id },
    });
  }

  if (foundBooking && payment_intent_id) {

  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalPrice * 100,
      currency: bookingData.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    bookingData.payment_intent_id = paymentIntent.id;
    await prismadb.booking.create({
      data: bookingData,
    });
    return NextResponse.json({ paymentIntent });
  }
  return new NextResponse("Internal Server Error", { status: 500 });
}
