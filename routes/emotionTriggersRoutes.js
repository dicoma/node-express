// routes/emotionTriggersRoutes.js
const express = require('express');
const router = express.Router();
const emotionTriggersController = require('../controllers/emotionTriggersController');

// Emotion Triggers 목록 가져오기
router.get('/', emotionTriggersController.getEmotionTriggers);

// Emotion Trigger 생성
router.post('/', emotionTriggersController.createEmotionTrigger);

// Emotion Trigger 상세 정보 가져오기
router.get('/:id', emotionTriggersController.getEmotionTriggerById);

// Emotion Trigger 업데이트
router.put('/:id', emotionTriggersController.updateEmotionTrigger);

// Emotion Trigger 삭제
router.delete('/:id', emotionTriggersController.deleteEmotionTrigger);

module.exports = router;
