// models/CommunityPosts.js

const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Users Collection의 _id와 연결
    ref: 'User',
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, // Users Collection의 _id와 연결
        ref: 'User',
        required: true,
      },
      commentContent: String,
      commentDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { collection: 'communityposts' });

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

module.exports = CommunityPost;
