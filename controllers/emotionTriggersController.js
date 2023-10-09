// controllers/emotionTriggersController.js

const EmotionTrigger = require('../models/EmotionTriggers');

// Emotion Triggers 목록 가져오기
exports.getEmotionTriggers = async (req, res) => {
  try {
    const emotionTriggers = await EmotionTrigger.find();
    res.json(emotionTriggers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Emotion Trigger 생성
exports.createEmotionTrigger = async (req, res) => {
  try {
    const emotionTrigger = new EmotionTrigger(req.body);
    const savedEmotionTrigger = await emotionTrigger.save();
    res.status(201).json(savedEmotionTrigger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Emotion Trigger 상세 정보 가져오기
exports.getEmotionTriggerById = async (req, res) => {
  try {
    const emotionTrigger = await EmotionTrigger.findById(req.params.id);
    if (!emotionTrigger) {
      return res.status(404).json({ message: 'Emotion Trigger not found' });
    }
    res.json(emotionTrigger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Emotion Trigger 업데이트
exports.updateEmotionTrigger = async (req, res) => {
  try {
    const updatedEmotionTrigger = await EmotionTrigger.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmotionTrigger) {
      return res.status(404).json({ message: 'Emotion Trigger not found' });
    }
    res.json(updatedEmotionTrigger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Emotion Trigger 삭제
exports.deleteEmotionTrigger = async (req, res) => {
  try {
    const deletedEmotionTrigger = await EmotionTrigger.findByIdAndRemove(
      req.params.id
    );
    if (!deletedEmotionTrigger) {
      return res.status(404).json({ message: 'Emotion Trigger not found' });
    }
    res.json(deletedEmotionTrigger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
