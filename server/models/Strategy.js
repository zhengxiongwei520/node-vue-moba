const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  body: {
    type: String
  },
  desc: { type: String },
  cover: { type: String },
  cate: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Cate'
  }
}, { timestamps: true })

module.exports = mongoose.model('Strategy', schema, 'strategies')