<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>预约会议室</template>
          <el-menu-item-group>
            <el-menu-item index="/index/query/room">预约会议室</el-menu-item>
            <el-menu-item index="/index/room/approval">会议室审批流程</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>审核会议室</template>
          <el-menu-item-group>
            <el-menu-item index="/index/create/admin">待审核会议室</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
     
      <el-header style="text-align: right; font-size: 12px;">
        <div class="out" @click="out">
          退出登陆
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>


    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    out(){
      this.$router.replace("/login");
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.out{
  float: right;
  width: 70px;
  padding-right: 50px;
  font-size: 16px;
  cursor: pointer;
}
</style>
