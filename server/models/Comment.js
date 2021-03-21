// const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;



const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    commentBody: {
      type: String,
      required: true,
      maxlength: 500
    },
    userName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
