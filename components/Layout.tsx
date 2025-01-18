import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              Marriage Proposal Tracker
            </Link>
            <nav className="flex space-x-4">
              <Link href="/">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/proposals/new">
                <Button variant="ghost">New Proposal</Button>
              </Link>
              <Link href="/search">
                <Button variant="ghost">Search</Button>
              </Link>
              <Link href="/meetings">
                <Button variant="ghost">Meetings</Button>
              </Link>
              <Link href="/reports">
                <Button variant="ghost">Reports</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Marriage Proposal Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

