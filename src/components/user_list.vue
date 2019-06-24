<template>
    <el-table
        :data="tableData"
        id="table"
        height="700"
    >
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                >
                    <el-form-item label="姓名">
                        <span>{{ props.row.name }}</span>
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
        <el-table-column label="用户 ID" prop="id" sortable>
        </el-table-column>
        <el-table-column label="用户姓名" prop="name" sortable>
        </el-table-column>
        <el-table-column label="性别" prop="gender" sortable>
        </el-table-column>
        <el-table-column label="身份类别" prop="type" sortable>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handlePass(scope.$index, scope.row)"
                >通过</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleReject(scope.$index, scope.row)"
                >拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
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
  height: 100%;
  overflow: hidden;
}
</style>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '谷雨',
        gender: '男',
        type: '学生',
        org: '中山大学',
        num: '16341006',
        tel: '13169766411',
        email: '53461616@qq.com',
        cert: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        id: '12987123',
        name: '蒋侑生',
        gender: '男',
        type: '企业人员',
        org: '大山企业',
        num: '1546221',
        tel: '13169746411',
        email: '123124216@qq.com',
        cert: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        id: '12987122',
        name: '蒋侑生',
        gender: '女',
        type: '企业人员',
        org: '大山企业',
        num: '1546221',
        tel: '13169746411',
        email: '123124216@qq.com',
        cert: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }]
    }
  },
  methods: {
    handlePass (index, row) {
      console.log(index, row)
    },
    handleReject (index, row) {
      console.log(index, row)
    }
  }
}
</script>
