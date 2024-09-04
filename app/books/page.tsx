'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

interface Book {
  _id: string
  title: string
  author: string
  status: string
  rating: number
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const { isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchBooks()
    }
  }, [isLoaded, isSignedIn])

  const fetchBooks = async () => {
    const response = await fetch('/api/books')
    const data = await response.json()
    setBooks(data)
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-sm text-gray-500 mb-2">Status: {book.status}</p>
            <p className="text-sm text-gray-500 mb-4">Rating: {book.rating}/5</p>
            <Link href={`/books/${book._id}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/books/add" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Book
        </Link>
      </div>
    </div>
  )
}