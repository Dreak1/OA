<template>
  <el-form
    :model="room"
    :rules="rules"
    ref="room"
    @submit.native.prevent="saveOrder"
    label-width="400px"
  >
    <div class="roomId">会议室编号:{{ room.roomId }}</div>

    <el-form-item label="会议主题" prop="name">
      <el-col :span="12">
        <el-input v-model="room.name"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="会议主持人" prop="host">
      <el-col :span="12">
        <el-select v-model="room.host" filterable placeholder="请选择会议主持人">
          <el-option
            v-for="item in allPerson"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item label="会议申请人" prop="orderPerson">
      <el-col :span="12">
        <el-select v-model="room.orderPerson" filterable placeholder="请选择会议申请人">
          <el-option
            v-for="item in allPerson"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item label="主持部门" prop="department">
      <el-select v-model="room.department" placeholder="请选择主持部门">
        <el-option label="部门一" value="开发部门"></el-option>
        <el-option label="部门二" value="测试部门"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="会议日期" required>
      <el-col :span="12">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="room.date1"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

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

    <el-form-item label="选择参会人员" prop="attendee">
      <el-col :span="12">
        <el-tag
          v-for="tag in room.attendee"
          :key="tag.label"
          closable
          :type="tag.type"
          @close="handleClose(tag)"
        >
          {{ tag.label }}
        </el-tag>
      </el-col>
      <el-col :sapn="12">
        <el-button class="choseMeet" type="primary" @click="dialogVisible = true">点击选择参会人员</el-button>
      </el-col>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="phandleClose"
      >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
        <div class="personChose">
          <el-tree
            show-checkbox
            check-strictly 
            :getCheckedKeys= true
            :data="personDate"
            :filter-node-method="filterNode"
            ref="tree"
          ></el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="chosePerson">确 定</el-button>
        </span>
      </el-dialog>
    </el-form-item>

    <el-form-item label="是否通知参会人员" prop="notice">
      <el-switch v-model="room.notice"></el-switch>
    </el-form-item>

    <el-form-item label="会议备注" prop="remarks">
      <el-col :span="16">
        <el-input type="textarea" v-model="room.remarks"></el-input>
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
      personDate: [
        {
          label: "A部门",
          disabled:true,
          children: [
            {
              label: "A员工",
            },
            {
              label: "B员工",
            },
            {
              label: "C员工",
            },
          ],
        },
        {
          label: "B部门",
          disabled:true,
          children: [
            {
              label: "A员工",
            },
            {
              label: "A员工",
            },
          ],
        },
      ],
      allPerson: [
        {
          value: "测试1",
          label: "一号员工",
          type: "success",
        },
        {
          value: "测试2",
          label: "二号员工",
          type: "success",
        },
        {
          value: "测试3",
          label: "二号员工",
          type: "success",
        },
      ],
      dialogVisible: false,
      filterText: "",
      room: {
        roomId: '',
        name: "",//会议主题
        host: "",//会议主持人
        orderPerson: "",//申请人
        address:"",
        department: "",//部门
        date1: "",//日期
        startTime: "",//开始时间
        endTime: "",//结束时间
        notice: "", //通知参会人
        remarks: "", //会议备注
        attendee: [
         
        ], //参会人员
      },
      rules: {
        name: [{ required: true, message: "请输入会议主题", trigger: "blur" }],
        department: [{ required: true, message: "请输入会议部门", trigger: "blur" }],
        host: [{ required: true, message: "请输入会议主持人", trigger: "blur" }],
        orderPerson: [{ required: true, message: "请输入会议申请人", trigger: "blur" }],
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.room.roomId = this.$route.params.id
    this.room.address = this.$route.params.address
  },
  methods: {
    saveOrder() {
      console.log(this.room)
      this.$http.post('./apply/room',this.room).then(()=>{
        this.$message({
          message:"保存成功",
          type:"success"
        })
        this.$router.push('../../../room/approval')
      })
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(tag) {
      const person = this.room.attendee.filter((item) => {
        return item != tag;
      });
      this.room.attendee = person;
    },
    chosePerson() {
      this.dialogVisible = false, 
      this.room.attendee = this.$refs.tree.getCheckedNodes();
    },
    phandleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style>
.row {
  display: inline-block;
  width: 40px;
  text-align: center;
}

.el-tag {
  margin-right: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-tree {
  min-width: 100%;
  display: inline-block;
}
.personChose {
  overflow-y: auto;
  overflow-x: scroll;
  overflow: auto;
  max-height: 300px;
  border: 1px solid #f5f5f5;
}
.choseMeet{
  margin-top: 30px;
}
.roomId{
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 320px;
}
</style>
