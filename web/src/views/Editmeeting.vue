<template>
  <el-form
    :model="room"
    ref="room"
    @submit.native.prevent="saveOrder"
    label-width="400px"
  >
    <el-form-item label="请输入会议纪要" prop="remarks">
      <el-col :span="16">
        <el-input type="textarea" v-model="remarks"></el-input>
      </el-col>
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
      remarks: "",
      room: {
        
      },
    };
  },
  watch: {},
  mounted() {},
  methods: {
    saveOrder() {
      this.$http.put(`./editmeet/${this.$route.params.id}`,{remarks:this.remarks}).then(() => {
        this.$message({
          message: "上传成功",
          type: "success",
        });
      });
      this.$router.push(`/index/room/approval`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style></style>
