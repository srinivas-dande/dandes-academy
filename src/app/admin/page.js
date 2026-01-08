export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Admin Dashboard</h1>

      <p className="text-gray-600">
        Welcome Admin! Manage leads, enrollments, and system settings here.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="p-4 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Total Leads</h2>
          <p className="text-gray-600 text-sm">View and manage all leads</p>
        </div>

        <div className="p-4 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Enrollments</h2>
          <p className="text-gray-600 text-sm">Monitor student enrollments</p>
        </div>

        <div className="p-4 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="text-gray-600 text-sm">Manage staff & permissions</p>
        </div>

      </div>
    </div>
  );
}
