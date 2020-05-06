const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  cates: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Cate'
  }],
  body: {
    type: String
  }
}, { timestamps: true })  


module.exports = mongoose.model('Article', schema)

// const mongoose = require('mongoose')
// const schema = new mongoose.Schema({})
// module.exports = mongoose.model('xx', schema)