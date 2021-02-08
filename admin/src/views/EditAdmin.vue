<template>
  <el-form @submit.native.prevent="saveUsers" ref="form" :model="user" label-width="150px">
    <el-form-item label="用户名">
      <el-input v-model="user.username"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input type="password" v-model="user.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
   fetch() {
      this.$http.get(`/userdetail/${this.$route.params.id}`).then((res) => {
        this.user = res.data;
      });
    },
    saveUsers() {
      this.$http.put(`/edituser/${this.$route.params.id}`, this.user).then(() => {
        this.$message({
          message: "修改用户成功",
          type: "success",
        });
        this.$router.push("/admin/list");
      });
    },
     
  },
  created() {
      this.fetch();
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
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
