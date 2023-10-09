// models/EmotionTriggers.js

const mongoose = require('mongoose');

const emotionTriggerSchema = new mongoose.Schema({
  emoji: {
    type: String, // 이모지를 저장할 필드
    required: true,
  },
  content: {
    type: String, // 감정 트리거 콘텐츠를 저장할 필드
    required: true,
  },
}, { collection: 'emotiontriggers' });

const EmotionTrigger = mongoose.model('EmotionTrigger', emotionTriggerSchema);

module.exports = EmotionTrigger;
