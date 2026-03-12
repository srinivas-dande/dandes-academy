import { prisma } from "@/lib/prisma";
import { sendWebinarFeedbackThankYouEmail } from "@/lib/mail/sendLeadEmails";

export async function saveWebinarFeedbackAndSendEmail(data) {

  const {
    fullName,
    email,
    whatsappNumber,
    experienceLevel,
    valuableTopics,
    targetRole,
    biggestChallenges,
    programInterest,
    contentClarity,
    webinarRating,
    recommendation,
    extraFeedback
  } = data;

  await prisma.webinar_Feedback.create({
    data: {
      fullName,
      email,
      whatsappNumber,

      
      experienceLevel,

      valuableTopics: Array.isArray(valuableTopics) ? valuableTopics : [],
      biggestChallenges: Array.isArray(biggestChallenges) ? biggestChallenges : [],

      targetRole,
      programInterest,
      contentClarity,
      webinarRating: Number(webinarRating),
      recommendation,
      extraFeedback,
      status: "ACTIVE",
    },
  });

  await sendWebinarFeedbackThankYouEmail({
    name: fullName,
    email,
  });
}