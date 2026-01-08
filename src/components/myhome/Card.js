export default function Card({ title, children }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      {title && <h1 className="text-lg font-semibold mb-4">{title}</h1>}
      <div>{children}</div>
    </div>
  );
}
