'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: { id?: string; title: string; learnings: string }) => void;
  editBook?: { id: string; title: string; learnings: string } | null;
}

export default function AddBookModal({ isOpen, onClose, onSubmit, editBook }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [learnings, setLearnings] = useState('');

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setLearnings(editBook.learnings);
    } else {
      setTitle('');
      setLearnings('');
    }
  }, [editBook]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ id: editBook?.id, title, learnings });
    setTitle('');
    setLearnings('');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editBook ? '编辑读书记录' : '添加新的读书记录'}</DialogTitle>
          <DialogDescription>
            {editBook ? '修改你的读书记录和学到的内容。' : '在这里添加你最近读过的书和学到的内容。'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">书名</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="learnings">学到的内容</Label>
            <Textarea 
              id="learnings" 
              value={learnings} 
              onChange={(e) => setLearnings(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" className="w-full">
            {editBook ? '保存' : '添加'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

