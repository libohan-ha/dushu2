'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BookCardProps {
  id: string
  title: string
  learnings: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function BookCard({ id, title, learnings, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group bg-white bg-opacity-20 backdrop-blur-lg">
      <CardHeader className="relative">
        <CardTitle className="text-xl font-bold text-white pr-20">{title}</CardTitle>
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onEdit(id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white">{learnings}</p>
      </CardContent>
    </Card>
  )
}

