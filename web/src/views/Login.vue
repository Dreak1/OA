<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form :model="admin" ref="admin" :rules='rules' @submit.native.prevent="login">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="admin.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="admin.password"> </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
          <el-button @click="resetForm('admin')">重置</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        username:"",
        password:""
      },
      rules :{
        username :[
          {required:true,message:"请输入用户名",trigger: 'blur'}
        ],
        password :[
          {required:true,message:"请输入密码",trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    async login() {
      if (!this.admin.username) {
        this.$message({
          message: "请输入用户名",
          type: "error",
        });
      } else if (!this.admin.password) {
        this.$message({
          message: "请输入密码",
          type: "error",
        });
      } else {
        const res = await this.$http.post("/user/login", this.admin);
        localStorage.token = res.data.token;
        localStorage.username = res.data.user.username;
        localStorage.power = res.data.user.power;
        this.$router.replace("./index"),
          this.$message({
            type: "success",
            message: "登陆成功",
          });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>
