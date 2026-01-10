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
  if(leadOwner=="Krishan Chaitanya")
    return "chaitanya@tatpara.com"
  else if(leadOwner=="Swetha Ramana")
    return "swetha@tatpara.com"
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
      subject: `Hello ${fullName} - Thank You for Registering | Dandes Academy`,
      html: `
        <p>Hello ${fullName},</p>
        <p>
          Thank you for showing interest in <b>Dandes Academy</b> and submitting your details.
          <br/>We have successfully received your information.
        </p>
        <p>Our team will review your details and get in touch with you shortly.</p>
        <p>Looking forward to connecting with you soon.</p>
        <br/>
        <p>
          Regards,<br/>
          <b>Srinivas Dande</b><br/>
          Founder & Instructor<br/>
          Dandes Academy
        </p>
      `,
    };

    const teamMail = {
      from: '"Dandes Academy" <hello@dandesacademy.com>',
      to: salesEmails,
      subject: `New Lead Received – ${fullName} | ${course || "Course Not Specified"}`,
      html: `
        <p>Hello Team,</p>
        <p>New lead has been submitted on the <b>Dandes Academy</b> website.</p>

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
        Founder & Instructor<br/>
        Dandes Academy
      </p>
    `,
  };
}
