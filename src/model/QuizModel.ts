import mongoose, { Document, Schema } from "mongoose";

interface IQuiz extends Document {
  title: string;
  category: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  created_by: mongoose.Types.ObjectId;
  slug?: string;
  created_at: Date;
  content?: string;
  duration: number;
  is_sheduled?: string;
  sheduled_start?: string;
  sheduled_end?: string;
  is_open: boolean;
}

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  is_sheduled: {
    type: String,
  },
  sheduled_start: {
    type: String,
  },
  sheduled_end: {
    type: String,
  },
  is_open: {
    type: Boolean,
    default: true,
  },
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
