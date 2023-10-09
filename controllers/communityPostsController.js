// controllers/communityPostsController.js

const CommunityPost = require('../models/CommunityPosts');

// Community Posts 목록 가져오기
exports.getCommunityPosts = async (req, res) => {
  try {
    const communityPosts = await CommunityPost.find();
    res.json(communityPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Community Post 생성
exports.createCommunityPost = async (req, res) => {
  try {
    const communityPost = new CommunityPost(req.body);
    const savedCommunityPost = await communityPost.save();
    res.status(201).json(savedCommunityPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Community Post 상세 정보 가져오기
exports.getCommunityPostById = async (req, res) => {
  try {
    const communityPost = await CommunityPost.findById(req.params.id);
    if (!communityPost) {
      return res.status(404).json({ message: 'Community Post not found' });
    }
    res.json(communityPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Community Post 업데이트
exports.updateCommunityPost = async (req, res) => {
  try {
    const updatedCommunityPost = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCommunityPost) {
      return res.status(404).json({ message: 'Community Post not found' });
    }
    res.json(updatedCommunityPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Community Post 삭제
exports.deleteCommunityPost = async (req, res) => {
  try {
    const deletedCommunityPost = await CommunityPost.findByIdAndRemove(
      req.params.id
    );
    if (!deletedCommunityPost) {
      return res.status(404).json({ message: 'Community Post not found' });
    }
    res.json(deletedCommunityPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Community Post에 댓글 추가
exports.addComment = async (req, res) => {
  try {
    const communityPost = await CommunityPost.findById(req.params.id);
    if (!communityPost) {
      return res.status(404).json({ message: 'Community Post not found' });
    }

    const newComment = {
      userId: req.body.userId, // 댓글 작성자
      commentContent: req.body.commentContent,
    };

    communityPost.comments.push(newComment);
    const updatedCommunityPost = await communityPost.save();

    res.json(updatedCommunityPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
