import { Book } from '@/app/models/Book';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const books = await Book.find({}).sort({ createdAt: -1 });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: '获取书籍列表失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const book = await Book.create(data);
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: '创建书籍失败' },
      { status: 500 }
    );
  }
} 