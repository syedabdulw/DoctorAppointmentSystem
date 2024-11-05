"use server";

import { revalidatePath } from "next/cache";

export async function addRequest(data) {
  const add = await fetch(`${process.env.BASE_URL}api/requests`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

