import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/app/lib/mongodb";
import Book from "@/app/models/Book";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();

  const book = await Book.findOne({
    _id: params.id,
    userId,
  });
  if (!book) {
    return NextResponse.json(
      { error: "Book not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(book);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();

  const bookData = await req.json();
  const book = await Book.findOneAndUpdate(
    { _id: params.id, userId },
    bookData,
    { new: true }
  );

  if (!book) {
    return NextResponse.json(
      { error: "Book not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(book);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();

  const book = await Book.findOneAndDelete({
    _id: params.id,
    userId,
  });

  if (!book) {
    return NextResponse.json(
      { error: "Book not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Book deleted successfully",
  });
}
