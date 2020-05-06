module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const path = require('path')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const Cate = require('../../models/Cate')

  // 保存
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })


  // 读取
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName == 'Cate') {
      queryOptions.populate = 'parent'
    } else if (req.Model.modelName == 'Article') {
      queryOptions.populate = 'cates'
    } else if(req.Model.modelName == 'Strategy'){
      queryOptions.populate = 'cate'
    }
    const model = await req.Model.find().setOptions(queryOptions)
    res.send(model)
  })

  // 读取单个
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //删除
  router.delete('/:id', async (req, res) => { 
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
      message: `成功删除${req.Model.name}`
    })
  })

  // 中间件
  const authMiddleWare = require('../../middleware/auth')
  const resourceMiddleWare = require('../../middleware/resource') // 根据你传过来的resource来打开对应的模型

  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)



  function upload(url) {
    // express处理数据需要中间件multer
    const multer = require('multer')
    // multer({ dest: __dirname + '../../uploads/items' }).single('file')
    const upload = multer({
      dest: path.join(__dirname, `../../uploads/${url}`)
    })
    return upload
  }

  function postUpload(uploadWhere) {
    return app.post(`/admin/api/upload/${uploadWhere}`, authMiddleWare(), upload(uploadWhere).single('file'), async (req, res) => {
      const file = req.file
      file.url = `http://localhost:3000/admin/api/upload/${uploadWhere}/${file.filename}`
      res.send(file)
    })
  }
  // app.post('/admin/api/upload/items',
  //   multer({ dest: __dirname + '../../uploads/items' }).single('file'),
  //   async (req, res) => {
  //     const file = req.file
  //     file.url = `http://localhost:3000/admin/api/upload/items/${file.filename}`
  //     res.send(file)
  //   })

  postUpload('items')
  postUpload('heros')
  postUpload('skills')
  postUpload('articles')
  postUpload('ads')
  postUpload('banners')
  postUpload('strategies')
  postUpload('covers')
  postUpload('races')


  // 获取对应分类
  const catesOptions = {
    strategies: '图文攻略',
    articles:'新闻资讯',
    heroes:'英雄分类',
    races:'赛事中心'
  }
  app.get('/admin/api/cates/:name', async (req, res) => {
    const name = req.params.name
    const parent = await Cate.findOne({ name: catesOptions[name] })
    const data = await Cate.find({ parent: parent })
    res.send(data)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    // 1.根据用户名找用户
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username: username }).select('+password')
    //  -前缀强制排除，+强制选择
    assert(user, 401, '用户不存在')
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 401, '密码不正确')
    // 3.token
    var token = jwt.sign({
      id: user._id,
      _id: user._id,
    }, app.get('secret'))
    res.send({ token, username })
  })

  app.use((err, req, res, next) => {
    res.status(err.statusCode).send({
      message: err.message
    })
  })
}