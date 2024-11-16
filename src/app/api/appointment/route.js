import connectDB from "@/lib/connectDB";
import { AppointmentModal } from "@/lib/models/AppointmentModal";
import { UserModal } from "@/lib/models/UserModal";
import { RequestModal } from "@/lib/models/RequestModal";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();

    let newAppointment = await new AppointmentModal({ ...obj });
    newAppointment = await newAppointment.save();

    return Response.json(
      {
        error: false,
        msg: "Your appointment is booked, You will soon have confirmation message.",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (e) {
    return Response.json(
      {
        error: true,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  const query = {};
  const doctor = req?.nextUrl?.searchParams?.get("doctor");
  const user = req?.nextUrl?.searchParams?.get("user");

  if (doctor) {
    const doctorRequest = await RequestModal.findOne({ user: doctor });
    query.request = doctorRequest._id;
  }

  if (user) query.user = user;

  const appointments = await AppointmentModal.find(query)
    .populate("user")
    .populate({
      path: "request",
      populate: { path: "user" }, // Populate the user field inside request
    });
  return Response.json(
    {
      error: false,
      msg: "Appointments fetched Successfully",
      appointments,
    },
    { status: 200 }
  );
}

export async function PUT(req) {}

export async function DELETE(req) {}
