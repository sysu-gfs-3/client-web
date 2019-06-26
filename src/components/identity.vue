<template>
<section>
    <template>
      <el-table
          :data="tableData"
          id="table"
          :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column type="expand" @click="details(props.row.id)">
            <template slot-scope="props">
                <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                    @click="details(props.row.id)"
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
        <el-table-column label="操作" width="250">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handlePass(scope.row)"
                >通过</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleReject(scope.row)"
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
      tableData: [],
      exData: []
    }
  },
  created () {
    axios.post('/api/v1/get_users', {
      user_type: 'waiting',
      page: 0
    }).then((response) => {
      var data = JSON.parse(response.data.data)
      this.tableData = data
      // console.log(data)
    }).catch(function (err) {
      console.log(err)
    })
    axios.post('/api/v1/get_user_count', {
      user_type: 'waiting'
    }).then((response) => {
      var data = JSON.parse(response.data.data)
      this.length = data.count
      // console.log(data)
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    formatSex: function (row, column) {
      return row.identity === 'S' ? '学生' : row.identity === 'C' ? '企业人员' : '游客'
    },
    handleReject (row) {
      console.log(row)
      axios.post('/api/v1/audit_user', {
        user_id: row.user_id,
        identity: row.identity,
        audit: false
      }).then((response) => {
        // var data = JSON.parse(response.data.data)
        // this.tableData = data
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
    },
    handlePass (row) {
      console.log(row)
      axios.post('/api/v1/audit_user', {
        user_id: row.user_id,
        identity: row.identity,
        audit: true
      }).then((response) => {
        // var data = JSON.parse(response.data.data)
        // this.tableData = data
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
    },
    // handleReject (index, row) {
    //   console.log(index, row)
    // },
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
