import ProtectedRoute from '@/app/_components/route/ProtectedRoute'
import NavBar from '../_components/navigation/NavBar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
        <div className="h-screen flex flex-col">
          <header className="flex-1 max-h-14 bg-white dark:bg-gray-800 shadow-sm">
            <NavBar />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
}