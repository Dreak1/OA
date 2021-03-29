<template>
  <el-form
    @submit.native.prevent="saveUsers"
    ref="form"
    :model="user"
    label-width="150px"
  >
    <el-form-item label="用户名">
      <el-input v-model="user.username"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input type="password" v-model="user.password"></el-input>
    </el-form-item>

    <el-form-item label="权限等级">
      <el-select v-model="user.power" placeholder="请选择">
        <el-option
          v-for="item in powerList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="所属部门">
      <el-select v-model="user.department" placeholder="请选择">
        <el-option
          v-for="item in departmentList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
      departmentList: [
        {
          value: "开发部门",
          label: "开发部门",
        },
        {
          value: '测试部门',
          label: '测试部门'
        },
        {
          value: '行政部门',
          label: '行政部门'
        },
      ],
      powerList: [
        {
          value: "0",
          label: "权限0",
        },
        {
          value: "1",
          label: "权限1",
        },
        {
          value: "2",
          label: "权限2",
        },
        {
          value: "3",
          label: "权限3",
        },
        {
          value: "4",
          label: "权限4",
        },
      ],
    };
  },
  methods: {
    saveUsers() {
      if (!this.user.username) {
        this.$message({
          message: "请输入用户名",
          type: "error",
        });
      } else if (!this.user.password) {
        this.$message({
          message: "请输入密码",
          type: "error",
        });
      } else {
        this.$http.post("/user/register", this.user).then(() => {
          this.$message({
            message: "注册成功",
            type: "success",
          });
          //跳转到列表页
          this.$router.push("/index/user/list");
        });
      }
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
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
