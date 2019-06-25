<template>
  <div id="container">
    <el-container>
      <el-header id="title">
        <el-col :span="24" class="header">
          <el-col :span="3" class="logo">挣闲钱后台系统</el-col>
          <el-col :span="16">
            <div class="tools">
              <i type="primary" class="el-icon-s-fold"></i>
            </div>
          </el-col>
          <el-col :span="4" class="userinfo">
            <i type="primary" class="el-icon-user-solid"></i>
            <span>蒋侑伸</span>
            <el-dropdown trigger="click">
              <i class="el-icon-setting" style="margin-left: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="jumpTo('/首页/个人信息')"><span>个人信息</span></div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="jumpTo('/首页/修改密码')"><span>修改密码</span></div>
                </el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-header>
      <el-main>
        <div class="aside-col">
          <el-menu class="menu" :default-active="$route.path" router>
            <el-menu-item>
            </el-menu-item>
            <el-menu-item index="/首页">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/首页/用户审核">用户审核</el-menu-item>
                <el-menu-item index="/首页/用户列表">用户目录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">任务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/首页/任务审核">任务审核</el-menu-item>
                <el-menu-item index="/首页/任务目录">任务目录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/首页/个人信息">个人信息</el-menu-item>
                <el-menu-item index="/首页/修改密码">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="main-col">
          <el-row :span="24">
            <el-col :span="12">
              <strong class="grid-content" id="m_tittle">{{$route.name}}</strong>
            </el-col>
            <el-col :span="12">
              <div class="grid-content" id="m_path">
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
          </el-row>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Identity from '../components/identity'
export default {
  components: {
    identity: Identity
  },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    jumpTo (url) {
      console.log('123')
      this.$router.push(url) // 用go刷新
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
#container {
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
#title {
  height: 6%;
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.el-header {
  background-color: #409EFF;
  color: #FFFFFF;
  text-align: center;
  line-height: 60px;
}
.tools {
  text-align: left;
  padding-left: 10px;
  float: left;
}
.el-icon-user-solid {
  padding-right: 5px;
}
.userinfo {
  text-align: right;
  padding-left: 35px;
  float: right;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  padding: 0px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.menu {
    height: 100vh;
}
.aside-col {
  display: inline-block;
  float: left;
  width: 200px;
}
.main-col {
  /* position: fixed; */
  left: 200px;
  display: inline-block;
  padding-top: 10px;
  width: calc(100% - 200px);
  height: 100vh;
}
#el-menu-item {
  padding: 0px;
}
#m_tittle {
  text-align: left;
  padding-left: 10px;
  float: left;
}
#m_path {
  text-align: right;
  padding-right: 20px;
  float: right;
}

</style>
