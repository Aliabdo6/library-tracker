'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Book {
  _id: string
  title: string
  author: string
  isbn: string
  categories: string[]
  tags: string[]
  status: string
  rating: number
  review: string
}

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBook()
  }, [])

  const fetchBook = async () => {
    const response = await fetch(`/api/books/${params.id}`)
    if (response.ok) {
      const data = await response.json()
      setBook(data)
    } else {
      console.error('Failed to fetch book')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBook((prev) => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!book) return

    const response = await fetch(`/api/books/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })

    if (response.ok) {
      setIsEditing(false)
      fetchBook()
    } else {
      console.error('Failed to update book')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this book?')
    if (!confirmed) return

    const response = await fetch(`/api/books/${params.id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      router.push('/books')
    } else {
      console.error('Failed to delete book')
    }
  }

  if (!book) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Book' : 'Book Details'}</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={book.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="unread">Unread</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={book.review}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-2"><strong>Title:</strong> {book.title}</p>
          <p className="mb-2"><strong>Author:</strong> {book.author}</p>
          <p className="mb-2"><strong>ISBN:</strong> {book.isbn}</p>
          <p className="mb-2"><strong>Categories:</strong> {book.categories.join(', ')}</p>
          <p className="mb-2"><strong>Tags:</strong> {book.tags.join(', ')}</p>
          <p className="mb-2"><strong>Status:</strong> {book.status}</p>
          <p className="mb-2"><strong>Rating:</strong> {book.rating}/5</p>
          <p className="mb-4"><strong>Review:</strong> {book.review}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="mt-8">
        <Link href="/books" className="text-blue-600 hover:underline">
          Back to My Books
        </Link>
      </div>
    </div>
  )
}