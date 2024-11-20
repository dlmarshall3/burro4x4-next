export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white p-8 bg-opacity-50">{children}</div>;
}
