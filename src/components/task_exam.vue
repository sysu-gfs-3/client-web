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
                        <span>{{ props.row.gender }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="任务 ID" prop="task_id" sortable>
        </el-table-column>
        <el-table-column label="用户昵称" prop="title" sortable>
        </el-table-column>
        <el-table-column label="任务类别" prop="type" :formatter="formatType" sortable>
        </el-table-column>
        <el-table-column label="任务状态" prop="state" sortable>
        </el-table-column>
        <el-table-column label="发布时间" prop="release_time" sortable>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="details(scope.$index, scope.row)"
                >通过</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleReject(scope.$index, scope.row)"
                >拒绝</el-button>
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
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
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
      this.length = data.length
      this.tableData = data
      console.log(data)
    }).catch(function (err) {
      console.log(err)
    })
    axios.post('/api/v1/get_task_count', {
      task_type: 'all'
    }).then((response) => {
      var data = JSON.parse(response.data.data)
      this.length = data.count
      // console.log(data)
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
    formatType: function (row, column) {
      return row.identity === 'S' ? '学生' : row.identity === 'C' ? '企业人员' : '游客'
    },
    details (index, row) {
      axios.post('/api/v1/get_user_info', {
        user_id: row.user_id,
        identity: row.identity
      }).then((response) => {
        var data = JSON.parse(response.data.data)
        // this.tableData = data
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
    }
  }
}
</script>
