// routes/communityPostsRoutes.js

const express = require('express');
const router = express.Router();
const communityPostsController = require('../controllers/communityPostsController');

// Community Posts 목록 가져오기
router.get('/', communityPostsController.getCommunityPosts);

// Community Post 생성
router.post('/', communityPostsController.createCommunityPost);

// Community Post 상세 정보 가져오기
router.get('/:id', communityPostsController.getCommunityPostById);

// Community Post 업데이트
router.put('/:id', communityPostsController.updateCommunityPost);

// Community Post 삭제
router.delete('/:id', communityPostsController.deleteCommunityPost);

// Community Post에 댓글 추가
router.post('/:id/comments', communityPostsController.addComment);

module.exports = router;
