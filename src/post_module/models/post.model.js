import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );
  

const Post = model('Post', PostSchema);

export default Post;
