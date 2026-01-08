export const dynamic = "force-dynamic";
export const revalidate = 0;

import EnrollmentFormClient from "./EnrollmentFormClient";

export default function Page({ searchParams }) {
  return <EnrollmentFormClient searchParams={searchParams} />;
}
