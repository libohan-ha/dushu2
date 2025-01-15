import { Book } from '@/app/models/Book';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const data = await request.json();
    const book = await Book.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!book) {
      return NextResponse.json(
        { error: '未找到该书籍' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: '更新书籍失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const book = await Book.findByIdAndDelete(params.id);
    
    if (!book) {
      return NextResponse.json(
        { error: '未找到该书籍' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    return NextResponse.json(
      { error: '删除书籍失败' },
      { status: 500 }
    );
  }
} 