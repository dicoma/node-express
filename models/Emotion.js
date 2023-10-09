const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emotionSchema = new Schema({
  userId: String,
  date: Date,
  emoji: String,
  detail: String,
  photo: String,
  sharedTo: [String], // 배열 형태로 친구 리스트 또는 SNS 공유 저장
  // 나머지 필드들 추가
}, { collection: 'emotions' });

module.exports = mongoose.model('Emotion', emotionSchema);
