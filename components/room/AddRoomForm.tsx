"use client";

import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogueOpen: () => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  description: z
    .string()
    .min(10, { message: "Title must be at least 10 characters long." }),
  bedCount: z.coerce.number().min(1, { message: "At least 1 is required." }),
  guestCount: z.coerce.number().min(1, { message: "At least 1 is required." }),
  bathroomCount: z.coerce
    .number()
    .min(1, { message: "At least 1 is required." }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, { message: "Image is required." }),
  breakfastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, { message: "Price is required." }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});

const AddRoomForm = ({
    hotel,
    room,
    handleDialogueOpen,
  }: AddRoomFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: room || {
      },
    });
  
    return <>Add</>;
};

export default AddRoomForm;
