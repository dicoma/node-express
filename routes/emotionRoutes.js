const express = require('express');
const router = express.Router();

const EmotionController = require('../controllers/emotionController');

router.post('/add', EmotionController.addEmotion);
router.get('/list/:userId', EmotionController.getEmotionsByUserId);
router.get('/:emotionId', EmotionController.getEmotionById);
router.put('/:emotionId', EmotionController.updateEmotion);
router.delete('/:emotionId', EmotionController.deleteEmotion);

module.exports = router;
