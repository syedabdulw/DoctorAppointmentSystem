import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";

export default async function Appointments() {
  const session = await auth();
  const { appointments } = await getAppointments("user", session.user._id);
  console.log("appointments=>", appointments);
  return (
    <div className="container mx-auto">
      <div className="my-10 grid grid-cols-3 gap-4">
        {appointments?.map((appointment) => (
          <div className="border rounded p-10 shadow" key={appointment._id}>
            <h1>{appointment?.request?.user?.firstName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
