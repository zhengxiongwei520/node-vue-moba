const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId, // 存在于数据库中，是数据库的某个对象ID
    ref: 'Cate' // 对应哪个模型
  },
})

// 虚拟属性
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Cate'  
  // 这个表示去Cate模型查找parent数据
  // 可以在外面通过populate的path来访问children
})
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'cates',
  justOne: false,
  ref: 'Article'
})
schema.virtual('heroesList', {
  localField: '_id',
  foreignField: 'cate',
  justOne: false,
  ref: 'Hero'
})

module.exports = mongoose.model('Cate', schema)