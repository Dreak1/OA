<template>
  <el-table :data="room">
    <el-table-column prop="name" label="会议主题" width="350vw"> </el-table-column>
    <el-table-column prop="orderPerson" label="申请人" width="150vw"> </el-table-column>
    <el-table-column prop="department" label="申请部门" width="150vw"> </el-table-column>
    <el-table-column prop="address" label="会议室位置" width="150vw"> </el-table-column>
    <el-table-column prop="date1" label="会议日期" width="150vw"> </el-table-column>
    <el-table-column prop="startTime" label="开始时间" width="150vw"> </el-table-column>
    <el-table-column prop="endTime" label="结束时间" width="150vw"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="250">
      <template slot-scope="scope">
        <!-- scope.row就是这一行的所有数据 -->
        <el-button @click="agree(scope.row._id)" type="primary" size="small"
          >同意</el-button
        >
        <el-button @click="refuse(scope.row._id)" type="danger" size="small"
          >拒绝</el-button
        >
      </template>
    </el-table-column>

  </el-table>
  
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      room: [name],
    };
  },
  methods: {
    fetch() {
      this.$http.get("./examine/process").then((res) => {
        this.room = res.data;
      });
    },
    //拒绝申请
    refuse(id){
      this.$http.put(`./refuse/room/${id}`,{start:2,apply:'拒绝'}).then(() => {
        this.$message({
          message: "成功",
          type: "success",
        });
        this.fetch();
      });
    },
    //同意申请
    agree(id) {
      this.$http.put(`./agree/room/${id}`,{start:1,apply:'同意'}).then(() => {
        this.$message({
          message: "成功",
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
