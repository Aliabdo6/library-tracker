import Link from 'next/link'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Personal Library Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {isSignedIn && (
              <>
                <li>
                  <Link href="/books" className="hover:underline">
                    My Books
                  </Link>
                </li>
                <li>
                  <Link href="/books/add" className="hover:underline">
                    Add Book
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="flex space-x-2">
              <SignInButton mode="modal">
                <button className="bg-white text-blue-600 px-4 py-2 rounded">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-800 text-white px-4 py-2 rounded">Sign Up</button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}