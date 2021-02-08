<template>
  <div>
    <el-row>
      <el-form
        :model="room"
        ref="room"
        @submit.native.prevent="queryRoom"
        label-width="200px"
      >
        <el-col :span="5">
          <el-form-item label="会议日期" required>
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="room.date1"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="会议时间" required>
            <el-time-select
              placeholder="起始时间"
              v-model="room.startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
              }"
            >
            </el-time-select>
            <span class="row">-</span>
            <el-time-select
              placeholder="结束时间"
              v-model="room.endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: room.startTime,
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" native-type="submit">点击查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="freeRoom">
      <div class="content" v-for="item in roomList" v-bind:key="item.roomId">
        <el-card class="box-card" v-show="item.isUse">
          <el-row>
            <el-col :span="8"><div class="left">会议室ID：</div></el-col>
            <el-col :span="16"
              ><div class="">{{ item.roomId }}</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"><div class="left">会议室名称：</div></el-col>
            <el-col :span="16"
              ><div class="">{{ item.name }}</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"><div class="left">会议室位置：</div></el-col>
            <el-col :span="16"
              ><div class="">{{ item.address }}</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"><div class="left">可容纳人数：</div></el-col>
            <el-col :span="16"
              ><div class="">{{ item.personNumber }}</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"><div class="left">会议室资源：</div></el-col>
            <el-col :span="16"
              ><div class="">
                <span v-for="v in item.resources" :key="v">{{ v + " " }}</span>
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="15"><div class="left"></div></el-col>
            <el-col :span="9">
              <el-button type="primary" @click="applyRoom(item.roomId,item.address)"
                >申请会议室</el-button>
                
              </el-col>
              
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      room: {
        date1: "", //日期
        startTime: "", //开始时间
        endTime: "", //结束时间
      },
      roomList: [],
      allRoom: [],
    };
  },
  mounted() { 
    this.queryRoom();
  },
  methods: {
    //查询已经使用的会议室
    queryRoom() {
      this.queryAllRoom();
      this.$http
        .get("./query/room", {
          params: this.room,
        })
        .then((res) => {
          res.data.forEach((item) => {
            this.allRoom.forEach((v)=>{
              if(item.roomId == v.roomId){
                v.isUse = false
              }
            })
          });
          this.$message({
            message: "查询成功",
            type: "success",
          });
          this.roomList = this.allRoom
        });
    },
    //查询所有会议室
    queryAllRoom() {
      this.$http.get("./query/allRoom").then((res) => {
        this.allRoom = res.data;
      });
    },
    //申请会议室
    applyRoom(id,address) {
      this.$router.push(`../order/room/${id}/${address}`);
    },
  },
};
</script>
<style>
.box-card {
  width: 380px;
  margin: 20px;
}
.freeRoom {
  display: flex;
  flex-wrap: wrap;
}
.content {
  margin-left: 70px;
}
.el-col {
  height: 40px;
}
.left {
  display: flex;
}
</style>
