<template>
  <el-form
    @submit.native.prevent="saveRoom"
    ref="room"
    :rules="rules"
    :model="room"
    label-width="150px"
  >
    <el-form-item label="会议室编号" prop="roomId">
      <el-input v-model="room.roomId"></el-input>
    </el-form-item>

    <el-form-item label="会议室名称" prop="name">
      <el-input type="textarea" v-model="room.name"></el-input>
    </el-form-item>

    <el-form-item label="可容纳人数" prop="personNumber">
      <el-input type="textarea" v-model="room.personNumber"></el-input>
    </el-form-item>

    <el-form-item label="会议室位置" prop="address">
      <el-input type="textarea" v-model="room.address"></el-input>
    </el-form-item>

    <el-form-item label="会议室配备资源" prop="resources">
      <el-checkbox-group v-model="room.resources">
        <el-checkbox label="饮水器" name="resources"></el-checkbox>
        <el-checkbox label="无线网" name="resources"></el-checkbox>
        <el-checkbox label="投影仪" name="resources"></el-checkbox>
        <el-checkbox label="大屏显示器" name="resources"></el-checkbox>
        <el-checkbox label="机械升降幕布" name="resources"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button @click="resetForm('room')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      room: {
        roomId: "",
        name: "",
        address: "",
        personNumber: "",
        resources: [],
      },
      rules: {
        roomId:[
          {required: true,message:"请输入会议编号",trigger: 'blur'}
        ],
        name:[
          {required: true,message:"请输入会议名称",trigger: 'blur'}
        ],
        address:[
          {required: true,message:"请输入会议室位置",trigger: 'blur'}
        ],
        personNumber:[
          {required: true,message:"请输入会议室可容纳人数",trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    saveRoom() {
      this.$http.post("/creatroom", this.room).then(() => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        //跳转到列表页
        this.$router.replace("/index/room/list");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
