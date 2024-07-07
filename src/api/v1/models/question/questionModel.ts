import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    slug: {
      type: String,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "module",
    },
    options: [
      {
        id: {
          type: Number,
        },
        options: {
          type: String,
        },
        // answer: {
        //   type: String,
        // },
      },
    ],
    correctAnswerIndex: {
      type: Number,
    },
    mark: {
      type: Number,
      default: 1,
    },
    copyPast: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  },
);

const QuestionModel = mongoose.model<UserDocument>("question", questionSchema);

export default QuestionModel;
