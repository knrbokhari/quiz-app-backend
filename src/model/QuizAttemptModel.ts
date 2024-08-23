import mongoose, { Document, Schema } from "mongoose";

interface IAnswer {
  question: mongoose.Types.ObjectId;
  answer_text: string;
  pasted: boolean;
  number_of_paste: number;
  number_of_change_tab: number;
  paste_content?: string;
}

interface IQuizAttempt extends Document {
  user: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  started_at: Date;
  finished_at?: Date;
  answers: IAnswer[];
  score: number;
}

const quizAttemptSchema = new Schema<IQuizAttempt>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  started_at: {
    type: Date,
    default: Date.now,
  },
  finished_at: {
    type: Date,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer_text: {
        type: String,
        required: true,
      },
      pasted: {
        type: Boolean,
        default: false,
      },
      number_of_paste: {
        type: Number,
        default: 0,
      },
      number_of_change_tab: {
        type: Number,
        default: 0,
      },
      paste_content: {
        type: String,
      },
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
});

const QuizAttempt = mongoose.model<IQuizAttempt>(
  "QuizAttempt",
  quizAttemptSchema,
);

export default QuizAttempt;
