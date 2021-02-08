<template>
  <el-table :data="room">
    <el-table-column prop="name" label="会议主题" width="350vw"> </el-table-column>
    <el-table-column prop="orderPerson" label="申请人" width="150vw"> </el-table-column>
    <el-table-column prop="department" label="申请部门" width="150vw"> </el-table-column>
    <el-table-column prop="address" label="会议室位置" width="150vw"> </el-table-column>
    <el-table-column prop="date1" label="会议日期" width="150vw"> </el-table-column>
    <el-table-column prop="startTime" label="开始时间" width="150vw"> </el-table-column>
    <el-table-column prop="endTime" label="结束时间" width="150vw"> </el-table-column>
    <el-table-column prop="apply" label="审核状态"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <!-- scope.row就是这一行的所有数据 -->
        <el-button @click="remove(scope.row._id)" type="text" size="small"
          >撤回申请</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      room: [name],
    };
  },
  methods: {
    fetch() {
      this.$http.get("./apply/process").then((res) => {
        console.log(res.data);
        this.room = res.data;
      });
    },
    remove(id) {
      this.$http.delete(`./remove/process/${id}`).then(() => {
        this.$message({
          message: "撤回申请成功",
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
