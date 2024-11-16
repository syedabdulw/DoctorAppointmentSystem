import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DoctorAppointmentCard from "@/components/DoctorAppointmentCard/DoctorAppointmentCard";
import PatientAppointmentCard from "@/components/PatientAppointmentCard/PatientAppointmentCard";
dayjs.extend(relativeTime);

export default async function Appointments() {
  const session = await auth();
  console.log("session=>", session);
  const { appointments } = await getAppointments(
    session.user.role == "doctor" ? "doctor" : "user",
    session.user._id
  );

  const isDoctor = session.user.role == "doctor";
  return (
    <div className="container mx-auto">

      <h1 className="font-bold text-2xl mt-10">
        {isDoctor ? "Patients Appointments" : "Your Doctors Appointments"}
      </h1>
      <div className="my-10 grid grid-cols-3 gap-4">
        {appointments?.map((appointment) =>
          isDoctor ? (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ) : (
            <PatientAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          )
        )}
      </div>
    </div>
  );
}
