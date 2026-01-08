export const dynamic = "force-dynamic";
export const revalidate = 0;

import AddLeadClient from "./AddLeadClient";

export default function Page({ searchParams }) {
  return <AddLeadClient searchParams={searchParams} />;
}
