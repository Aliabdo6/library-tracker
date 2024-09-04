import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default function Home() {
  const { userId } = auth()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Personal Library Tracker</h1>
      {userId ? (
        <div>
          <p className="mb-4">Start managing your personal library!</p>
          <Link href="/books" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View My Books
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4">Sign in to start tracking your books!</p>
          <Link href="/sign-in" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      )}
    </div>
  )
}