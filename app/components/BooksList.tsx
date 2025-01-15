'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddBookModal from './AddBookModal'
import BookCard from './BookCard'

interface Book {
  _id: string;
  title: string;
  learnings: string;
}

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('获取书籍列表失败');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取书籍列表失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (book: { id?: string; title: string; learnings: string }) => {
    try {
      if (book.id) {
        const response = await fetch(`/api/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: book.title, learnings: book.learnings }),
        });
        
        if (!response.ok) throw new Error('更新书籍失败');
        const updatedBook = await response.json();
        setBooks(books.map(b => b._id === book.id ? updatedBook : b));
        toast({
          title: "成功",
          description: "书籍更新成功",
        });
      } else {
        const response = await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: book.title, learnings: book.learnings }),
        });
        
        if (!response.ok) throw new Error('添加书籍失败');
        const newBook = await response.json();
        setBooks([newBook, ...books]);
        toast({
          title: "成功",
          description: "书籍添加成功",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: error instanceof Error ? error.message : "操作失败",
      });
    }
  };

  const handleEdit = (id: string) => {
    const book = books.find(b => b._id === id);
    if (book) {
      setEditBook(book);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('删除书籍失败');
      setBooks(books.filter(book => book._id !== id));
      toast({
        title: "成功",
        description: "书籍删除成功",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "删除书籍失败",
      });
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.learnings.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditBook(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <span className="text-2xl font-bold text-white shrink-0">我的读书记录</span>
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                type="search"
                placeholder="搜索书名或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder:text-white placeholder:text-opacity-70"
              />
            </div>
            <Button 
              variant="secondary" 
              className="bg-white text-purple-600 hover:bg-purple-600 hover:text-white shrink-0"
              onClick={() => {
                setEditBook(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> 添加新书
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              title={book.title}
              learnings={book.learnings}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {filteredBooks.length === 0 && (
          <div className="text-center text-white mt-12">
            <p className="text-xl">没有找到相关的读书记录</p>
          </div>
        )}
      </main>

      <AddBookModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleSubmit}
        editBook={editBook ? { 
          id: editBook._id, 
          title: editBook.title, 
          learnings: editBook.learnings 
        } : null}
      />
    </>
  )
} 