import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '请输入书名'],
    trim: true,
  },
  learnings: {
    type: String,
    required: [true, '请输入学习内容'],
    trim: true,
  },
}, {
  timestamps: true,
});

export const Book = mongoose.models.Book || mongoose.model('Book', bookSchema); 