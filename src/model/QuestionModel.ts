import mongoose, { Document, Schema } from "mongoose";

interface IOption {
  id: number;
  option: string;
}

interface IQuestion extends Document {
  quiz: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  type: "QA" | "MCQ" | "CODE";
  slug?: string;
  question_text: string;
  options?: IOption[];
  correct_answer?: string;
  is_multipull?: boolean;
  mark: number;
  created_at: Date;
}

const questionSchema = new Schema<IQuestion>({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  type: {
    type: String,
    enum: ["QA", "MCQ", "CODE"],
    required: true,
  },
  slug: {
    type: String,
  },
  question_text: {
    type: String,
    required: true,
  },
  options: [
    {
      id: {
        type: Number,
      },
      option: {
        type: String,
      },
    },
  ],
  correct_answer: {
    type: String,
  },
  is_multipull: {
    type: Boolean,
  },
  mark: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
