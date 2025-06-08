import ProtectedRoute from '@/app/_components/route/ProtectedRoute'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </>
  );
}