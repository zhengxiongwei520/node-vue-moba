const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  cate: { type: mongoose.SchemaTypes.ObjectId, ref: 'Cate' },
  title: { type: String },
  body: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Race', schema, 'races')