<template>
    <section class="chart-container">
      <el-row>
        <el-col :span="1" >
            <el-button float="right" text-align="right" padding-left="35px" type="primary" icon="el-icon-refresh" circle @click="jumpTo('/首页/个人信息')"></el-button>
        </el-col>
        <el-col :span="22" :offset="22"></el-col>
        <el-col :span="12">
            <div id="myChart1" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
            <div id="myChart" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
            <div id="myChart2" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
            <div id="myChart3" style="width:100%; height:400px;"></div>
        </el-col>
      </el-row>
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
import echarts from 'echarts'
export default {
  data () {
    return {
      chart1: {
        col: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-99', '100'],
        tip: [10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100],
        value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        data: []
      },
      chart2: {
        col: ['学生-男', '学生-女', '企业人员-男', '企业人员-女', '未认证用户'],
        tip: [['M', 'S'], ['W', 'S'], ['M', 'C'], ['W', 'C'], ['M', 'S']],
        value: [0, 0, 0, 0, 0],
        data: []
      },
      chart3: {
        col: [],
        tip: ['company', 'college'],
        num: 0,
        value: [],
        data: []
      },
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
    var that = this
    for (var i = 0; i < 11; i++) {
      // 使用闭包 防止变量污染
      (function (i) {
        // console.log(`打印${i}`)
        // 格式fileName规则 fileName.docx
        axios.post('/api/v1/low_credit_count', {
          credit: that.chart1.tip[i]
        }).then((response) => {
          var data = JSON.parse(response.data.data)
          that.chart1.value[i] = data.count.count
          that.drawLine()
          // console.log(data.count.count)
        })
        // 进行循环连接判断是否存在,以及进度问题
      })(i)
    }
    for (i = 0; i < 5; i++) {
      //  使用闭包 防止变量污染
      (function (i) {
        if (i === 4) {
          axios.post('/api/v1/get_user_count', {
            user_type: 'all'
          }).then((response) => {
            var data = JSON.parse(response.data.data)
            that.chart2.value[i] = data.count
            that.drawLine2()
            // console.log(that.chart2.value)
          })
        } else {
          axios.post('/api/v1/specific_user_count', {
            gender: that.chart2.tip[i][0],
            identity: that.chart2.tip[i][1]
          }).then((response) => {
            var data = JSON.parse(response.data.data)
            that.chart2.value[i] = data.count
            //  console.log(response)
          })
        }
        // 进行循环连接判断是否存在,以及进度问题
      })(i)
    }
    for (i = 0; i < 2; i++) {
      // 使用闭包 防止变量污染
      (function (i) {
        // console.log(`打印${i}`)
        // 格式fileName规则 fileName.docx
        axios.post('/api/v1/get_company_count', {
          type: that.chart3.tip[i]
        }).then((response) => {
          var data = JSON.parse(response.data.data)
          for (var j = that.chart3.num; j < that.chart3.num + data.length; j++) {
            that.chart3.data[j] = {value: data[j - that.chart3.num].count, name: data[j - that.chart3.num].school}
            that.chart3.col[j] = that.chart3.data[j].name
            // console.log(that.chart3.data)
          }
          that.chart3.num += data.length
          that.drawLine3()
          // console.log(response)
        })
        // 进行循环连接判断是否存在,以及进度问题
      })(i)
    }
    // for (var i = this.chart1.tip.length-2; i >=0; i--) {
    //   console.log(i)
    //   axios.post('/api/v1/low_credit_count', {
    //     credit: this.chart1.tip[i]
    //   }).then((response) => {
    //     var data = JSON.parse(response.data.data)
    //     // this.chart1.value[i+1] = this.chart1.value[i+1] - data.count.count
    //     this.chart1.value[i] = data.count.count
    //     // console.log(data.count.count)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // }
    // axios.post('/api/v1/get_task', {
    //   task_type: 'all',
    //   page: 0
    // }).then((response) => {
    //   var data = JSON.parse(response.data.data)
    //   this.length = data.length
    //   this.tableData = data
    //   console.log(data)
    // }).catch(function (err) {
    //   console.log(err)
    // })
    // axios.post('/api/v1/get_task_count', {
    //   task_type: 'all'
    // }).then((response) => {
    //   var data = JSON.parse(response.data.data)
    //   this.length = data.count
    //   // console.log(data)
    // }).catch(function (err) {
    //   console.log(err)
    // })
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
    // details () {
    //   axios.post('/api/v1/get_task_count', {
    //     task_type: 'O',
    //     task_state: 'all'
    //   }).then((response) => {
    //     var data = JSON.parse(response.data.data)
    //     this.length = data.count
    //     console.log(response)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    jumpTo (url) {
      this.$router.go(0) // 用go刷新
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      for (var i = this.chart1.col.length - 1; i >= 0; i--) {
        if (i === 0) {
          this.chart1.data[i] = {value: this.chart1.value[i], name: this.chart1.col[i]}
        } else {
          this.chart1.data[i] = {value: this.chart1.value[i] - this.chart1.value[i - 1], name: this.chart1.col[i]}
        }
      }
      var zoomSize = 6
      var dataAxis = this.chart1.col
      var data = this.chart1.value
      myChart1.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        })
      })
      var yMax = 30
      var dataShadow = []

      for (i = 0; i < data.length; i++) {
        dataShadow.push(yMax)
      }
      console.log(dataShadow)
      myChart.setOption({
        title: {
          text: '用户信誉度总计',
          subtext: '最低：0   最高：100',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: this.chart1.col
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.chart1.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
      myChart1.setOption({
        title: {
          text: '用户信誉度分布',
          subtext: '0 - 100',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '信誉度{b} : {c}人'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [{
          type: 'inside'
        }],
        series: [{ // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: data
        }]
      })
    },
    drawLine2 () {
      // console.log(this.chart3)
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      for (var i = 0; i <= this.chart2.col.length - 1; i++) {
        if (this.chart2.col.length - 1) {
          this.chart2.data[i] = {value: this.chart2.value[i], name: this.chart2.col[i]}
        } else {
          this.chart2.data[i] = {value: this.chart2.value[i], name: this.chart2.col[i]}
          this.chart2.data[this.chart2.col.length - 1] -= this.chart2.value[i]
        }
      }

      myChart2.setOption({
        title: {
          text: '用户总计',
          subtext: '性别-身份',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: this.chart2.col
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.chart2.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    drawLine3 () {
      // console.log(this.chart3)
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart3.setOption({
        title: {
          text: '参与的组织',
          subtext: '学校/企业',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: this.chart3.col
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.chart3.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  }
}
</script>
