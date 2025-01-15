'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const BooksList = dynamic(
  () => import('./components/BooksList'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    )
  }
) as any;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Suspense fallback={<div>加载中...</div>}>
        <BooksList />
      </Suspense>
    </div>
  )
}

