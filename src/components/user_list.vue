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
      <el-table
          :data="tableData"
          id="table"
          :row-class-name="tableRowClassName"
          position="absolute"
      >
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column type="expand" @click="details">
            <template slot-scope="props">
                <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                    @click="details"
                >
                    <el-form-item label="姓名">
                        <span>{{ props.row.nickname }}</span>
                    </el-form-item>
                    <el-form-item label="用户 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="性别">
                        <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="类别">
                        <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="学校/公司">
                        <span>{{ props.row.org }}</span>
                    </el-form-item>
                    <el-form-item label="学号/工号">
                        <span>{{ props.row.num }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{ props.row.tle }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="证明">
                        <el-image :src="props.row.cert"></el-image>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="用户 ID" prop="user_id" width="200" sortable>
        </el-table-column>
        <el-table-column label="用户昵称" prop="nickname" width="220" sortable>
        </el-table-column>
        <el-table-column label="身份类别" prop="identity" width="220" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column label="申请审核时间" prop="create_date" width="270" sortable>
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="dialogVisible = true;details (scope.$index, scope.row)"
                >详情</el-button>
            </template>
        </el-table-column>
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
      :showClose="false"
      width="60%">
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称:" margin-left="2px">
              <span class="user_info" >{{form.name}}</span>
            </el-form-item>
            <el-form-item label="用户名:">
              <span class="user_info">{{form.nickname}}</span>
            </el-form-item>
            <el-form-item label="微信 ID:">
              <span class="user_info">{{form.wechat_id}}</span>
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
          </el-col>
          <el-col :span="12">
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
            <el-form-item label="审核状态:">
              <span class="user_info">{{form.state}}</span>
            </el-form-item>
            <el-form-item label="申请时间:">
              <span class="user_info">{{form.time}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="介绍:">
              <span class="user_info">{{form.intro}}</span>
            </el-form-item>
            <el-form-item label="证明材料:">
              <el-image class="user_info" :src="form.prove"></el-image>
            </el-form-item>
          </el-col>
        </el-row>
        
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;reform()">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
#table {
  width: 100%;
  overflow: hidden;
}
.el-table .warning-row {
  background: oldlace
}
.el-table .success-row {
  background: #f0f9eb
}
.user_info {
  text-align: left;
  padding-left: 1px;
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
        gender: '',
        prove: '',
        intro: '',
        wechat_id: '',
        state: '',
        time: ''
      },
      dialogVisible: false,
      currentPage: 1,
      length: 0,
      tableData: []
    }
  },
  created () {
    axios.post('/api/v1/get_users', {
      user_type: 'all',
      page: 0
    }).then((response) => {
      var data = JSON.parse(response.data.data)
      this.length = data.length
      this.tableData = data
      console.log(data)
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
    formatSex (row, column) {
      return row.identity === 'S' ? '学生' : row.identity === 'C' ? '企业人员' : '游客'
    },
    reform () {
      this.form.name = ''
      this.form.phone_number = ''
      this.form.email = ''
      this.form.prove = ''
      this.form.gender = ''
    },
    details (index, row) {
      console.log(this.form)
      axios.post('/api/v1/get_user_info', {
        user_id: row.user_id,
        identity: row.identity
      }).then((response) => {
        var data = JSON.parse(response.data.data)
        if (data.identity !== 'U') {
          this.form.name = data.name
          this.form.phone_number = data.phone_number
          this.form.email = data.email
          this.form.prove = data.prove
          if (data.gender === 'W') {
            this.form.gender = '女'
          } else {
            this.form.gender = '男'
          }
        }
        this.form.wechat_id = data.wechat_id
        this.form.nickname = data.nickname
        this.form.balance = data.balance
        this.form.credit = data.credit
        this.form.time = data.create_date
        this.form.intro = data.intro
        if (data.identity === 'S') {
          this.form.identity = '学生'
          this.form.number = data.student_num
          this.form.orgnization = data.school
        } else if (data.identity === 'C'){
          this.form.identity = '企业人员'
          this.form.number = data.job_num
          this.form.orgnization = data.company
        }
        if (data.isprove === 'W') {
          this.form.state = '审核中'
        } else if (data.isprove  === 'P'){
          this.form.state = '已审核'
        } else if (data.isprove  === 'F'){
          this.form.state = '审核未通过'
        } else {
          this.form.state = '未审核'
        }
        console.log(response)
      }).catch(function (err) {
        reform() 
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
    tableRowClassName ({row, rowIndex}) {
      if (row.identity === 'S') {
        return 'warning-row'
      } else if (row.identity === 'C') {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
