import Card from "../../components/myhome/Card";
import { headers } from "next/headers";

/* -----------------------------
   Server-side fetch (FIXED)
------------------------------*/
async function getDashboardData() {
  const headersList = await headers(); 
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  return res.json(); // { data: {...} }
}

/* -----------------------------
   Report Table
------------------------------*/
function ReportTable({ title, rows = [] }) {
  const total = rows.reduce((sum, r) => sum + (r.count || 0), 0);

  return (
    <Card title={title}>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-b-0">
              <td className="py-1 pr-2 text-gray-700 truncate">
                {r.name}
              </td>
              <td className="py-1 text-right font-semibold w-10">
                {r.count || 0}
              </td>
            </tr>
          ))}
          <tr className="font-semibold border-t">
            <td className="py-1 pr-2">Total</td>
            <td className="py-1 text-right w-10">{total}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

/* -----------------------------
   4 ROW × 2 COLUMN DASHBOARD
------------------------------*/
export default async function MyHomePage() {
  const { data: dashboard } = await getDashboardData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <ReportTable title="Leads By Owner" rows={dashboard.leadsByOwner} />
      <ReportTable title="Leads By Source" rows={dashboard.leadsBySource} />

      <ReportTable title="Leads By Course" rows={dashboard.leadsByCourse} />
      <ReportTable title="Leads By Ad Source" rows={dashboard.leadsByAdSource} />

      

      <ReportTable
        title="Enrollments By Owner"
        rows={dashboard.enrollmentsByOwner}
      />
      <ReportTable
        title="Enrollments By Source"
        rows={dashboard.enrollmentsBySource}
      />

      <ReportTable
        title="Enrollments By Course"
        rows={dashboard.enrollmentsByCourse}
      />
      
      <ReportTable
        title="Enrollments By Ad Source"
        rows={dashboard.enrollmentsByAdSource}
      />
      
    </div>
  );
}
