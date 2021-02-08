<template>
  <el-table :data="roomList">
    <el-table-column prop="roomId" label="会议室编号" width="200"> </el-table-column>
    <el-table-column prop="name" label="会议室名称" width="150"> </el-table-column>
    <el-table-column prop="personNumber" label="可容纳人数" width="150"> </el-table-column>
    <el-table-column prop="address" label="会议室位置" width="150"> </el-table-column>
    <el-table-column prop="resources" label="会议室配备资源"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <!-- scope.row就是这一行的所有数据 -->
        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row._id)" type="text" size="small"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      roomList: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("roomList").then((res) => {
        this.roomList = res.data;
      });
    },
    edit(id) {
      this.$router.push(`/index/room/edit/${id}`);
    },
    remove(id) {
      this.$http.delete(`/rooms/${id}`).then(() => {
        this.$message({
          message: "会议室删除成功",
          type: "success",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style></style>
