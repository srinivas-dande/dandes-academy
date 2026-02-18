import { prisma } from "@/lib/prisma";
import { sendWebinarFeedbackThankYouEmail } from "@/lib/mail/sendLeadEmails";

export async function saveWebinarFeedbackAndSendEmail(data) {
  const {
    fullName,
    email,
    whatsappNumber,
    webinarRating,
    clarityLevel,
    helpfulParts,
    targetRoles,
    biggestChallenges,
    programInterest,
    sessionFeedback,
  } = data;

  
  await prisma.webinar_Feedback.create({
    data: {
      fullName,
      email,
      whatsappNumber,
      webinarRating: Number(webinarRating),
      clarityLevel,
      helpfulParts,
      targetRoles,
      biggestChallenges,
      programInterest,
      sessionFeedback,
      status: "ACTIVE",
    },
  });

  
  await sendWebinarFeedbackThankYouEmail({
    name: fullName,
    email,
  });
}
