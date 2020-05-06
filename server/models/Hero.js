const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  title: {
    type: String
  },
  avatar: {
    type: String
  },
  banner: {
    type: String
  },
  cate: [{ // 实现多选
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Cate'
  }],
  scores: {
    difficult: { type: Number },
    ability: { type: Number },
    attack: { type: Number },
    tank: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
    cost: { type: String },
    cooldown: { type: String },
  }],
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamfightTips: { type: String },
  relationships: [{
    name: { type: String },
    heroes: [{
      _id: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      desc: { type: String }
    }]
  }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')