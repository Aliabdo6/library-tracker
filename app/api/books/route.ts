import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import dbConnect from '@/app/lib/mongodb'
import Book from '@/app/models/Book'

export async function GET(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const books = await Book.find({ userId })
  return NextResponse.json(books)
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const bookData = await req.json()
  const book = new Book({ ...bookData, userId })
  await book.save()

  return NextResponse.json(book, { status: 201 })
}