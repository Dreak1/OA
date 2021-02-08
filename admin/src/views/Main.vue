<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>会议室</template>
          <el-menu-item-group>
            <el-menu-item index="/index/room/create">新增会议室</el-menu-item>
            <el-menu-item index="/index/room/list">会议室列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>管理员用户</template>
          <el-menu-item-group>
            <el-menu-item index="/index/create/admin">新建管理员</el-menu-item>
            <el-menu-item index=/index/create/user>新建用户</el-menu-item>
            <el-menu-item index="/index/admin/list">管理员列表</el-menu-item>
            <el-menu-item index="/index/user/list">用户列表</el-menu-item>
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
