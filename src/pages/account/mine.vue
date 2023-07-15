<template>
  <div class="all">
    <div class="user">
      <table
          ref="form"
          :model="form"
          label-width="30px"
          border="border: 1px solid black;"
      >
        <h3>个人信息</h3>
        <hr/>
        <center><img src="../assets/bj.jpeg" /></center>
        <!-- 使用接口数据时用下面哪个 -->
        <!-- <el-table v-model="form.img"></el-table> -->
        <hr/>
        <el-form-item label="用户名">
          <el-table v-model="name"></el-table>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-table v-model="phone"></el-table>
        </el-form-item>
        <el-form-item label="系统职位">
          <el-table v-model="job"></el-table>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-table v-model="time"></el-table>
        </el-form-item>
      </table>
      <el-button type="primary">切换账号</el-button>
      <el-button type="primary">退出账号</el-button>
    </div>

    <div class="base">
      <table
          ref="form"
          :model="form"
          label-width="80px"
          border="border: 1px solid black;"
      >
        <h3>基本信息</h3>
        <hr />
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息">
            <el-form-item label="用户名">
              <el-table v-model="form.name"></el-table>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-table v-model="form.phone"></el-table>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <el-form-item label="新密码" prop="newPwd">
              <el-input type="text"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input type="text"/>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="but">保存</el-button>
        <el-button type="primary" class="but">关闭</el-button>
      </table>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      form:[{
        name:'张三',
        phone:'12345679854',
        job:'资深员工',
        time:'2023-11-19'
      }]
    }
  },

}
</script>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 500;
}
.all {
  /* display: table; */
}
.user {
  /* display: table-cell; */
  width: 30%;
  height: 100%;
  float: left;
  margin: 5% 2%;
  /* background-color: blue; */
}

.user table {

  width: 100%;
  height: 100%;
}
.user h3 {
  text-align: center;
}
.user img {
  width: 20%;
  height: 20%;
}
.base {
  /* display: table-cell; */
  /* background-color: aqua; */
  float: right;
  width: 60%;
  height: 20%;
  margin: 10% 2%;
}
.base h3 {
  text-align: center;
}
.base table {

  float: right;
  width: 100%;
  height: 100%;
}
</style>
