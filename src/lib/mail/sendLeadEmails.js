// src/lib/mail/sendLeadEmails.js
import { transporter } from "./transporter.js";

/* -------------------------------------------------
   Helper: format date
-------------------------------------------------- */
function getSubmittedDate() {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/* -------------------------------------------------
   Helper: get sales team emails safely
-------------------------------------------------- */
function getSalesEmails(leadOwner) {
  
  if(leadOwner=="Krishna Chaitanya")
    return "chaitanya@dandesacademy.com"
  else if(leadOwner=="Swetha Ramana")
    return "Swetha@dandesacademy.com"
  else
    return "hello@dandesacademy.com"
  
}



/* =================================================
   TEMPLATE 1 & 2
   Lead Submitted by Student
================================================= */

console.log("📨 sendLeadEmails triggered");


export async function sendLeadEmails({
  fullName,
  email,
  phone,
  course,
  source,
  leadOwner
}) {
  try {
    const submittedDate = getSubmittedDate();
    const salesEmails = getSalesEmails(leadOwner);

    const studentMail = {
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: email,
      subject: "Your AI/ML Course Brochure – Dandes Academy",
      html: `
        <h2>Hello ${fullName}</h2>

        <p>Thank you for your interest in our AI & Machine Learning program.</p>

        <p>Inside the brochure you will find:</p>

        <ul>
          <li>Complete AI/ML course curriculum</li>
          <li>16 detailed modules</li>
          <li>Projects and learning roadmap</li>
        </ul>


        <p>
          Regards,<br/>
          <strong>Srinivas Dande</strong><br/>
          Founder & Lead Trainer<br/>
          Dandes Academy
        </p>
      `
    };

    const teamMail = {
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: salesEmails,
      subject: `New DA-Network Lead - ${fullName} - AI/ML Brochure Download`,
      html: `
        <p>Hello Team,</p>
        <p>New DA-Network Lead has been submitted on the <b>Dandes Academy</b> website.</p>

        <ul>
          <li><b>Name:</b> ${fullName}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Mobile:</b> ${phone}</li>
          <li><b>Interested Course:</b> ${course || "-"}</li>
          <li><b>Lead Source:</b> ${source || "-"}</li>
          <li><b>Submitted On:</b> ${submittedDate}</li>
        </ul>

        <p><b>Next Action:</b> Please prioritize this lead and ensure timely follow-up.</p>
        <br/>
        <p><b>Dandes Academy – System Notification</b></p>
      `,
    };

    if (email) await transporter.sendMail(studentMail);
    if (salesEmails) await transporter.sendMail(teamMail);

  } catch (err) {
    console.error("❌ sendLeadEmails Error:", err);
  }
}

/* =================================================
   TEMPLATE 3
   Lead Added by Sales Team → Student
================================================= */
export function buildLeadAddedBySalesStudentMail({ fullName, email }) {
  return {
    to: email,
    subject: `Hello ${fullName} - Thank You for Contacting Dandes Academy`,
    html: `
      <p>Hello ${fullName},</p>

      <p>
        Thank you for contacting <b>Dandes Academy</b>.
        This is to confirm that our team has successfully recorded your details in our system.
      </p>

      <p>
        If you have any further questions, feel free to connect with our team anytime.
      </p>

      <p>
        Looking forward to supporting you in your learning journey.
      </p>

      <br/>

      <p>
        Regards,<br/>
        <b>Srinivas Dande</b><br/>
        Founder & Instructor<br/>
        Dandes Academy
      </p>
    `,
  };
}

/* =================================================
   TEMPLATE 4
   Lead Added by Sales Team → Sales Team
================================================= */
export function buildLeadAddedBySalesTeamMail({
  fullName,
  email,
  phone,
  course,
  source,
  leadOwner
}) {
  return {
    to: getSalesEmails(leadOwner),
    subject: `New Lead Added by You – ${fullName} | ${course || "-"}`,
    html: `
      <p>Hello Team,</p>

      <p>You have added a new lead. Please find the details below:</p>

      <ul>
        <li><b>Name:</b> ${fullName}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Mobile:</b> ${phone}</li>
        <li><b>Interested Course:</b> ${course || "-"}</li>
        <li><b>Lead Source:</b> ${source || "-"}</li>
        <li><b>Submitted On:</b> ${getSubmittedDate()}</li>
      </ul>

      <p><b>Next Action:</b> Please prioritize this lead and ensure timely follow-up.</p>

      <br/>
      <p><b>Dandes Academy – System Notification</b></p>
    `,
  };
}

/* =================================================
   SEND TEMPLATE 3 & 4
================================================= */
export async function sendSalesAddedLeadEmails(payload = {}) {
  try {
    const studentMail = buildLeadAddedBySalesStudentMail(payload);
    const teamMail = buildLeadAddedBySalesTeamMail(payload);

    if (studentMail?.to) {
      await transporter.sendMail({
        from: `"Dandes Academy" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        ...studentMail,
      });
    }

    if (teamMail?.to) {
      await transporter.sendMail({
        from: `"Dandes Academy" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        ...teamMail,
      });
    }
  } catch (err) {
    console.error("❌ sendSalesAddedLeadEmails Error:", err);
  }
}

/* =================================================
   TEMPLATE 5
   Lead Submitted Again → Student
================================================= */
export function buildLeadResubmittedStudentMail({ fullName, email }) {
  return {
    to: email,
    subject: `Hello ${fullName} - We Have Received Your Details Again | Dandes Academy`,
    html: `
      <p>Hello ${fullName},</p>

      <p>
        Thank you for reaching out to <b>Dandes Academy</b> once again.
        This is to confirm that your details have been successfully recorded in our system.
      </p>

      <p>
        If you have already spoken to our team, please feel free to ignore this email.
        Otherwise, our team will contact you shortly.
      </p>

      <p>
        Thank you for your continued interest in Dandes Academy.
      </p>

      <br/>

      <p>
        Regards,<br/>
        <b>Srinivas Dande</b><br/>
        Founder & Instructor<br/>
        Dandes Academy
      </p>
    `,
  };
}

/* =================================================
   TEMPLATE 6
   Lead Submitted Again → Sales Team
================================================= */
export function buildLeadResubmittedSalesMail({
  fullName,
  email,
  phone,
  course,
  source,
}) {
  return {
    to: getSalesEmails(),
    subject: `Lead Details Submitted Again – ${fullName}`,
    html: `
      <p>Hello Team,</p>

      <p>
        Again, lead has been submitted on the <b>Dandes Academy</b> website.
      </p>

      <ul>
        <li><b>Name:</b> ${fullName}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Mobile:</b> ${phone}</li>
        <li><b>Interested Course:</b> ${course || "-"}</li>
        <li><b>Lead Source:</b> ${source || "-"}</li>
        <li><b>Submitted On:</b> ${getSubmittedDate()}</li>
      </ul>

      <p><b>Next Action:</b> Please prioritize this lead and ensure timely follow-up.</p>

      <br/>
      <p><b>Dandes Academy – System Notification</b></p>
    `,
  };
}

/* =================================================
   SEND TEMPLATE 5 & 6
================================================= */
export async function sendLeadResubmittedEmails(payload = {}) {
  try {
    const studentMail = buildLeadResubmittedStudentMail(payload);
    const teamMail = buildLeadResubmittedSalesMail(payload);

    if (studentMail?.to) {
      await transporter.sendMail({
        from: `"Dandes Academy" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        ...studentMail,
      });
    }

    if (teamMail?.to) {
      await transporter.sendMail({
        from: `"Dandes Academy" <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        ...teamMail,
      });
    }
  } catch (err) {
    console.error("❌ sendLeadResubmittedEmails Error:", err);
  }
}

/* =================================================
   TEMPLATE – Enrollment Confirmed → Student
================================================= */
export function buildEnrollmentConfirmedMail({
  fullName,
  enrollmentNumber,
  email,
  phone,
  course,
  studentId,
  totalFee,
  installmentCount,
}) {
  return {
    to: email,
    subject: `Hello ${fullName} - Enrollment Confirmed for ${course} | Dandes Academy`,
    html: `
      <p>Hello ${fullName},</p>

      <p>
        Congratulations and Welcome to <b>Dandes Academy</b>! 🎉
      </p>

      <p>Your enrollment details are as follows:</p>

      <table cellpadding="6" cellspacing="0" width="100%">
        <tr>
          <td width="50%">
            <b>Full Name:</b> ${fullName}
          </td>
          <td width="50%">
            <b>Enrollment Number:</b> ${enrollmentNumber || "-"}
          </td>
        </tr>

        <tr>
          <td>
            <b>Email:</b> ${email}
          </td>
          <td>
            <b>Phone:</b> ${phone || "-"}
          </td>
        </tr>

        <tr>
          <td>
            <b>Course Enrolled:</b> ${course}
          </td>
          <td>
            <b>Batch Ref-ID:</b> ${studentId}
          </td>
        </tr>

        <tr>
          <td>
            <b>Total Fee:</b> ${totalFee}
          </td>
          <td>
            <b>No. of Installments:</b> ${installmentCount}
          </td>
        </tr>
      </table>


      <br/>

      <p>
        Regards,<br/>
        <b>Srinivas Dande</b><br/>
        Founder & Instructor<br/>
        Dandes Academy
      </p>
    `,
  };
}



/* =================================================
   TEMPLATE – Installment Payment Received → Student
================================================= */
export function buildInstallmentPaidMail({
  fullName,
  enrollmentNumber,
  email,
  phone,
  course,
  studentId,
  totalFee,
  installmentCount,
  installments = [],
  paidInstallmentNo,
}) {
  const paidInstallment = installments.find(i => i.installmentNo === paidInstallmentNo);


  return {
    to: email,
    subject: `Fee Installment Received for ${course} | Dandes Academy`,
    html: `
      <p>Hello ${fullName},</p>

      <p>
        This email is to confirm that we have successfully received your fee installment
        for the <b>${course}</b>.
      </p>

      <table cellpadding="6">
        <tr>
          <td><b>Full Name</b></td>
          <td>: ${fullName}</td>
          <td style="padding-left:30px"><b>Enrollment Number</b></td>
          <td>: ${enrollmentNumber}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>: ${email}</td>
          <td style="padding-left:30px"><b>Phone</b></td>
          <td>: ${phone || "-"}</td>
        </tr>
        <tr>
          <td><b>Course Enrolled</b></td>
          <td>: ${course}</td>
          <td style="padding-left:30px"><b>Batch Ref-ID</b></td>
          <td>: ${studentId}</td>
        </tr>
        <tr>
          <td><b>Total Fee</b></td>
          <td>: ${totalFee}</td>
          <td style="padding-left:30px"><b>No. of Installments</b></td>
          <td>: ${installmentCount}</td>
        </tr>
      </table>

      <h4>Installment Details (Paid)</h4>

      ${
        paidInstallment
          ? `
        <table border="1" cellpadding="6" cellspacing="0" width="70%">
          <tr>
            <th>Installment No</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Paid Date</th>
          </tr>
          <tr>
            <td align="center">${paidInstallment.installmentNo}</td>
            <td align="center">${paidInstallment.amount}</td>
            <td align="center">${paidInstallment.status}</td>
            <td align="center">${paidInstallment.paidDate}</td>
          </tr>
        </table>
        `
          : `<p>No installment details available.</p>`
      }

      <h4>Table of All Installment Details</h4>

      <table border="1" cellpadding="6" cellspacing="0" width="70%" style="table-layout:fixed;">
        <colgroup>
          <col style="width:10%;">
          <col style="width:20%;">
          <col style="width:20%;">
          <col style="width:20%;">
        </colgroup>

        <tr>
          <th>Installment No</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Paid Date</th>
        </tr>
        ${installments
          .map(
            i => `
          <tr>
            <td align="center">${i.installmentNo}</td>
            <td align="center">${i.amount}</td>
            <td align="center">${i.status}</td>
            <td align="center">${i.paidDate}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <br/>

      <p>
        Regards,<br/>
        <b>Srinivas Dande</b><br/>
        Founder & Lead Trainer<br/>
        Dandes Academy
      </p>
    `,
  };
}


export async function sendLeadConfirmationEmail({ name, email }) {
  try {
    await transporter.sendMail({
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: email,
      subject: "Thank You for Your Interest in Our AI & Machine Learning Program | Dandes Academy",
      html: `
        <div style="font-family: Arial, sans-serif; font-size:15px; line-height: 1.6; color: #333;">
          <h2 style="color:#111;">Hi ${name || "there"},</h2>

          <p>Thank you for your interest in our <b>AI & Machine Learning Program.</b></p>

          <p>We're glad you reached out.</p>

          <p><strong>Here's what happens next:</strong></p>

          <ul style="padding-left: 20px;">
            <li>One of our counsellors will contact you shortly</li>
            <li>We'll understand your goals and answer your questions</li>
            <li>We'll share details about the curriculum, fees, and upcoming batches</li>
          </ul>

          <p>We look forward to speaking with you.</p>

          <p>
            Regards,<br/>
            <strong>Dandes Academy</strong>
          </p>
        </div>
      `,
    });

    console.log("Lead confirmation email sent");
  } catch (error) {
    console.error("Error sending lead confirmation email:", error);
    throw error;
  }
}

export async function sendSalesLeadEmail({ fullName, email, phone, form_type, utmSource, }) {
  try {
    const todayDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    await transporter.sendMail({
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: [
        "chaitanya@dandesacademy.com",
        "swetha@dandesacademy.com"
      ],
      subject: `${todayDate} - ${fullName || "Unknown"} - ${form_type || "Unknown Source"} Lead`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size:15px; line-height: 1.6; color: #333;">
          
          <h2 style="color:#111;">New Lead From DA-Network Received</h2>

          <p>A new lead has registered for the AI & Machine Learning Program</p>

          <h3 style="margin-bottom: 10px; color: #000;">
            Lead Details
          </h3>

          <p><strong>Name:</strong> ${fullName || "-"}</p>
          <p><strong>Email:</strong> ${email || "-"}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Source:</strong> ${utmSource || "-"}</p>

          <hr style="margin:20px 0;" />

          <p>
            Regards,<br/>
            <strong>Dandes Academy</strong>
          </p>
        </div>
      `,
    });

    console.log("Sales lead email sent");
  } catch (error) {
    console.error("Error sending sales lead email:", error);
    throw error;
  }
}




export async function sendWebinarFeedbackThankYouEmail({ name, email }) {
  try {
    await transporter.sendMail({
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: email,
      subject: "Thank You for Attending the Webinar",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

          <p>Hello ${name || "there"},</p>

          <p>
            Thank you for attending our live webinar on<br/>
            <strong>“How Software Engineers are Transitioning to AI/ML Roles”</strong>
          </p>

          <p>I truly appreciate your time and participation.</p>

          <p>I hope the session gave you:</p>

          <ul style="padding-left: 20px;">
            <li>Clear understanding of both roles</li>
            <li>Career direction based on your profile</li>
            <li>A structured roadmap to move forward</li>
          </ul>

          <p>
            If you have selected interest in joining the AI/ML Program or still have
            questions or need clarity, our team will connect with you shortly to guide
            you with the next steps.
          </p>

          <p>Looking forward to supporting you in your AI/ML journey.</p>

          <br/>

          <p>
            Warm Regards,<br/>
            <strong>Srinivas Dande</strong><br/>
            Founder & Lead Trainer<br/>
            Dandes Academy
          </p>

        </div>
      `,
    });

    console.log("Webinar feedback thank-you email sent");
  } catch (error) {
    console.error("Error sending webinar feedback email:", error);
    throw error; 
  }
}
