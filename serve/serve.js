const express = require('express')

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(require('cors')())
const jwt = require('jsonwebtoken');
const { Admin, Room, User, Apply } = require('./models');
app.use(express.json())
app.use('/img', express.static(__dirname + '/img'))

//token中间件
const auth = async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop();
  if (!token) {
    return res.status(401).send({
      message: '请先登录'
    })
  }
  const { id } = jwt.verify(token, 'abc');
  if (!token) {
    return res.status(401).send({
      message: '无效token'
    })
  }
  req.user = await Admin.findById(id);
  if (!req.user) {
    return res.status(401).send({
      message: '请先登陆'
    })
  }
  await next();
}

//注册管理员
app.post('/api/admin/register', async (req, res) => {
  const user = await Admin.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.send(user)
})

//获取管理员列表
app.get("/api/admin/list",auth, async (req, res) => {
  const admin = await Admin.find();
  res.send(admin)
})

//根据id获取管理员信息
app.get("/api/admin/:id", async (req, res) => {
  const admin = await Admin.findById(req.params.id)
  res.send(admin)
})

//注册普通用户
app.post('/api/user/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.send(user)
})

//用户登陆
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({
    username
  }).select('+password');
  if (!user) {
    return res.status(422).send({
      message: '用户不存在'
    })
  }
  const isPasswordVaild = require('bcryptjs').compareSync(
    password,
    user.password
  )
  if (!isPasswordVaild) {
    return res.status(422).send({
      message: '密码不正确'
    })
  };
  const token = jwt.sign({
    id: String(user._id)
  }, 'abc')
  res.send({
    user,
    token
  })
})

//录入会议室
app.post('/api/creatroom', async (req, res) => {
  const user = await Room.findOne({
    username: { $elemMatch: { $eq: req.body.username } }
  })
  if (user) {
    return res.send({
      message: '会议id重复'
    })
  } else {
    const room = await Room.create(req.body)
    res.send(room)
  }

})

//删除会议室
app.delete('/api/rooms/:id', async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id)
  res.send(room)
})

//会议室列表
app.get('/api/roomList', async (req, res) => {
  const room = await Room.find();
  res.send(room)
})

//根据id查询会议室
app.get('/api/room/:id', async (req, res) => {
  const room = await Room.findById(req.params.id)
  res.send(room)
})

//更新会议室
app.put('/api/room/:id', async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body)
  res.send(room)
})






//前端接口

app.post('/api/apply/room', async (req, res) => {
  const apply = await Apply.create(req.body)
  res.send(apply)
})

//待审核会议室数据
app.get('/api/apply/process', async (req, res) => {
  const room = await Apply.find({
    start:{$ne:4}
  })
  res.send(room)
})

//待审核会议室数据
app.get('/api/examine/process', async (req, res) => {
  const room = await Apply.find({
    start:0
  })
  res.send(room)
})

//撤回申请
app.delete('/api/remove/process/:id', async (req, res) => {
  const room = await Apply.findByIdAndDelete(req.params.id);
  res.send(room)
})

//正在使用的会议室
app.get('/api/query/room', async (req, res) => {
  const data1 = req.query.date1;
  const startTime = req.query.startTime;
  const endTime = req.query.endTime;
  const room = await Apply.find({
    date1:data1,
    startTime:{$gte:startTime},
    endTime:{$lte:endTime}
  })
  res.send(room)
})

//查询所有会议室
app.get('/api/query/allRoom', async (req, res) => {
  const room = await Room.find()
  res.send(room)
})

//拒绝申请
app.put('/api/refuse/room/:id', async (req, res) => {
  const room = await Apply.findByIdAndUpdate(req.params.id, req.body)
  res.send(room)
})

//同意申请
app.put('/api/agree/room/:id', async (req, res) => {
  const room = await Apply.findByIdAndUpdate(req.params.id, req.body)
  res.send(room)
})

//删除申请记录
app.put('/api/del/process/:id', async (req, res) => {
  const room = await Apply.findByIdAndUpdate(req.params.id, req.body)
  res.send(room)
})



app.listen(4000, () => {
  console.log('服务器端口4000启动成功');
})      