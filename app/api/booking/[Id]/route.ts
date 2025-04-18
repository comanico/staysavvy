import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = await auth();
    const bookingParams = await params;

    if (!bookingParams.Id) {
      return new NextResponse("Hotel ID is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const bookings = await prismadb.booking.findMany({
      where: {
        paymentStatus: true,
        roomId: bookingParams.Id,
        endDate: {
          gt: yesterday,
        },
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.log("Error at /api/booking/Id GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = await auth();
    const bookingParams = await params;

    if (!bookingParams.Id) {
      return new NextResponse("Payment Intent Id is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const booking = await prismadb.booking.update({
      where: { paymentIntentId: bookingParams.Id },
      data: { paymentStatus: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at /api/booking/Id PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = await auth();
    const bookingParams = await params;

    if (!bookingParams.Id) {
      return new NextResponse("Booking ID is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const booking = await prismadb.booking.delete({
      where: { paymentIntentId: bookingParams.Id },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at /api/booking/Id DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
