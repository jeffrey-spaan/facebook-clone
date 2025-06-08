export default function Card ({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 min-w-md mx-auto">
      {children}
    </div>
  )
}