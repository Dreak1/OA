<template>
  <el-form @submit.native.prevent="saveRoom" ref="form" :model="room" label-width="150px">
    <el-form-item label="会议室编号">
      <el-input v-model="room.roomId"></el-input>
    </el-form-item>

    <el-form-item label="会议室名称">
      <el-input type="textarea" v-model="room.name"></el-input>
    </el-form-item>

    <el-form-item label="可容纳人数">
      <el-input type="textarea" v-model="room.personNumber"></el-input>
    </el-form-item>

    <el-form-item label="会议室位置">
      <el-input type="textarea" v-model="room.address"></el-input>
    </el-form-item>

    <el-form-item label="会议室配备资源">
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
      <el-button>取消</el-button>
    </el-form-item>
    
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      room: {
        resources: [],
      },
    };
  },
  methods: {
    fetch() {
      this.$http.get(`/room/${this.$route.params.id}`).then((res) => {
        this.room = res.data;
      });
    },

    saveRoom() {
      this.$http.put(`/room/${this.$route.params.id}`, this.room).then(() => {
        this.$message({
          message: "修改会议室成功",
          type: "success",
        });
        this.$router.push("/index/room/list");
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
