import prisma from "@/lib/prisma";


export async function registerWebinar(data) {
  const { webinarId, fullName, email, phone } = data;

  if (!fullName || !email || !phone) {
    throw new Error("All fields are required");
  }

  return await prisma.$transaction(async (tx) => {

    // Insert into Webinar_Registrations
    const registration = await tx.webinar_Registrations.create({
      data: {
        webinarId,
        fullName,
        email,
        phone,
        status: "registered",
      },
    });

    // Increment registration count
    await tx.webinars.update({
      where: { webinarId },
      data: {
        no_of_Registractions: {
          increment: 1,
        },
      },
    });

    return registration;
  });
}


export async function getWebinarCount(webinarId) {
  const webinar = await prisma.webinars.findUnique({
    where: { webinarId },
    select: {
      no_of_Registractions: true,
      web_Date: true   // ✅ MUST be inside select
    }
  });

  return webinar;
}


export async function getWebinarDetails(webinarId) {
  const webinar = await prisma.webinars.findUnique({
    where: { webinarId },
    select: {
      web_Date: true,
      status: true,
    },
  });

  return webinar;
}
