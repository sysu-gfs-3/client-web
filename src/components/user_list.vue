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
                    @click="details (scope.$index, scope.row)"
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
    details (index, row) {
      console.log(row)
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
