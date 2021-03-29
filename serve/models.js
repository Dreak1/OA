const mongoose = require('mongoose');
//连接数据库 mongodb://ip地址和端口号/数据库的名称
mongoose.connect('mongodb://localhost:27017/oa-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        select: false,
        set(val) {
            //使用bcrypt加密密码
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    power: { type: String, default: 0 },
    department: { type: String}
})

//会议室信息
const roomSchema = new mongoose.Schema({
    roomId: { type: String, unique: true },
    name: { type: String },
    address: { type: String },
    personNumber: { type: String },
    resources: { type: Array },
    spare:{type:String},
    isUse: { type: Boolean, default: true }
})

//申请会议
const applyRoomSchema = new mongoose.Schema({
    personName: { type: String },
    roomId: { type: String },
    name: { type: String },
    host: { type: String },
    orderPerson: { type: String },
    department: { type: String },
    address: { type: String },
    date1: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    notice: { type: String },
    remarks: { type: String },
    attendee: { type: Array },
    apply: { type: String, default: '审核中' },
    start: { type: Number, default: 0 }
})

const Admin = mongoose.model('Admin', userSchema);
const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const Apply = mongoose.model('Apply', applyRoomSchema);


module.exports = {
    Admin,
    User,
    Room,
    Apply
}