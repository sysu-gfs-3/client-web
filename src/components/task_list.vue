<template>
<section>
  <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" >
      <el-form-item>
        <el-button type="primary" v-on:click="getUser" class="el-icon-refresh">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-col> -->
    <template>
      <el-col :span="1" >
        <el-button float="right" text-align="right" padding-left="35px" type="primary" icon="el-icon-refresh" circle @click="jumpTo('/首页/用户目录')"></el-button>
      </el-col>
      <el-table
          :data="tableData"
          id="table"
      >
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                >
                    <el-form-item label="发布者">
                      <el-tooltip class="item" effect="dark" content="点击查看用户详情" placement="right">
                        <span class="el-icon-info" @click="dialogVisible = true;details(props.$index, props.row)"></span>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item label="报名开始时间">
                        <span>{{ props.row.sign_end_time }}</span>
                    </el-form-item>
                    <el-form-item label="报名截止时间">
                        <span>{{ props.row.sign_end_time }}</span>
                    </el-form-item>
                    <el-form-item label="最大需要参与人数">
                        <span>{{ props.row.max_num }}</span>
                    </el-form-item>
                    <el-form-item label="目前参与人数">
                        <span>{{ props.row.participants_num }}</span>
                    </el-form-item>
                    <el-form-item label="奖励">
                        <span>{{ props.row.money }}</span>
                    </el-form-item>
                    <el-form-item label="描述">
                        <span>{{ props.row.task_intro }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="任务 ID" prop="task_id" sortable>
        </el-table-column>
        <el-table-column label="任务名" prop="title" sortable>
        </el-table-column>
        <el-table-column label="任务类别" prop="type" :formatter="formatType" sortable>
        </el-table-column>
        <el-table-column label="任务状态" prop="state" :formatter="formatState" sortable>
        </el-table-column>
        <el-table-column label="发布时间" prop="release_time" sortable>
        </el-table-column>
        <!-- <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="details(scope.$index, scope.row)"
                >详情</el-button>
            </template>
        </el-table-column> -->
      </el-table>
      <!--工具条-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="length">
        </el-pagination>
      </div>
    </template>
    <el-dialog
      title="发布者信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" label-width="100px">
        <el-form-item label="名称:">
          <span class="user_info">{{form.name}}</span>
        </el-form-item>
        <el-form-item label="用户名:">
          <span class="user_info">{{form.nickname}}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span class="user_info">{{form.gender}}</span>
        </el-form-item>
        <el-form-item label="身份:">
          <span class="user_info">{{form.identity}}</span>
        </el-form-item>
        <el-form-item label="学号/工号:">
          <span class="user_info">{{form.number}}</span>
        </el-form-item>
        <el-form-item label="信用度:">
          <span class="user_info">{{form.credit}}</span>
        </el-form-item>
        <el-form-item label="余额:">
          <span class="user_info">{{form.balance}}</span>
        </el-form-item>
        <el-form-item label="所属组织:">
          <span class="user_info">{{form.orgnization}}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span class="user_info">{{form.phone_number}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 150px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item {
  width: 1000px;
}
#table {
  width: 100%;
  overflow: hidden;
}
.user_info {
  text-align: left;
  padding-left: 10px;
  float: left;
}
.right {
  float: right;
  width: 60px;
}
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        nickname: '',
        identity: '',
        number: '',
        orgnization: '',
        phone_number: '',
        email: '',
        balance: '',
        credit: '',
        gender: ''
      },
      dialogVisible: false,
      currentPage: 1,
      length: 0,
      tableData: []
    }
  },
  created () {
    axios.post('/api/v1/get_task', {
      task_type: 'all',
      page: 0
    }).then((response) => {
      var data = JSON.parse(response.data.data)
      this.tableData = data
      // console.log(data)
    }).catch(function (err) {
      console.log(err)
    })
    axios.post('/api/v1/get_task_count', {
      task_type: 'all',
      task_state: 'all'
    }).then((response) => {
      // var data = JSON.parse(response.data.data)
      // this.length = data.count
      console.log(response)
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    // getUser () {
    //   console.log('123')
    //   axios.post('/api/v1/get_users', {
    //     user_type: 'all',
    //     page: 0
    //   }).then((response) => {
    //     var data = JSON.parse(response.data.data)
    //     this.tableData = data
    //     console.log(data)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    jumpTo (url) {
      this.$router.go(0) // 用go刷新
    },
    formatType: function (row, column) {
      return row.type === 'W' ? '问卷调查' : '普通任务'
    },
    formatState: function (row, column) {
      return row.state === 'W' ? '待审核' : row.state === 'S' ? '任务进行中' : row.state === 'F' ? '审核失败' : '任务完成'
    },
    details (index, row) {
      // console.log(row)
      axios.post('/api/v1/get_user_info', {
        user_id: row.publish_id
        // identity: row.identity
      }).then((response) => {
        var data = JSON.parse(response.data.data)
        this.form.name = data.name
        this.form.nickname = data.nickname
        if (data.identity === 'S') {
          this.form.identity = '学生'
          this.form.number = data.student_num
          this.form.orgnization = data.school
        } else {
          this.form.identity = '企业人员'
          this.form.number = data.job_num
          this.form.orgnization = data.company
        }
        if (data.gender === 'W') {
          this.form.gender = '女'
        } else {
          this.form.gender = '男'
        }
        this.form.balance = data.balance
        this.form.credit = data.credit
        this.form.phone_number = data.phone_number
        this.form.email = data.email
        // this.form.balance = data.balance
        // this.form.credit = data.credit
        console.log(data)
      }).catch(function (err) {
        console.log(err)
      })
    },
    handlePass (index, row) {
      console.log(index, row)
    },
    handleReject (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
