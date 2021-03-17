<template>
  <el-table :data="adminList">
    <el-table-column prop="username" label="用户名"> </el-table-column>
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
      adminList: [],
      user: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("/user/list").then((res) => {
        this.adminList = res.data;
      });
    },
    edit(id) {
      this.$router.push(`/index/user/edit/${id}`);
    },
    remove(id) {
      this.$http.delete(`/deleteUser/${id}`).then(() => {
        this.$message({
          message: "用户删除成功",
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
