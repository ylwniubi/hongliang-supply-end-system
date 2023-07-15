<script setup>
import { ref, reactive } from 'vue';
import { onMounted, watch } from 'vue';
import { ElMessageBox } from 'element-plus'; // 如果没有引入，会爆红，xxx is not defined
import axios from 'axios'
import post from '@/lib/post.js'  //引入post接口
const detailRef = ref(null); // 详情窗口的引用
const total = ref(0); // 列表数据的总数
const input = ref('') // 关键字
const value = ref(true) //权限设置
let pageNo = ref(1); // 拉取数据的页数，从1开始
let list = ref([
  {name:'张三',
    phone:'1654981564',
    time:'2023-07-13'},
  {name:'李四',
    phone:'118945614',
    time:'2023-07-13'},
]); // 因为要改变list的值，所以一定要用ref不能使用reactive
const pageSize2 = ref(4)
onMounted(() => {
      // 拉取list
      getList(0)
    }
)
const handleSizeChange = (val) => {
  pageNo.value = 1
  getList(0)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
const refreshList = () => {  //刷新列表
  pageNo.value = 1
  getList(0)
}
// 拉取list
const getList = async (page) => {
  const res = await axios.post("/api/list/role", {
    pageNo: page,
    pageSize: pageSize2.value,
    search: input.value
  });
  console.log(res)
  const data = res.data;
  if (!data.success) {
    alert(data.message);
  }
  if (page === 0) { //在第0页的时候去获取总数
    total.value = data.result.total
  }
  list.value = data.result.list;//将获取到的list赋值给list.value
};
//账号管理
watch(pageNo, (pre) => {
  getList(pre - 1)
})
const showCreate = () => { // 新增的函数
  detailRef.value.show()  //显示人员详情
}
const handleEdit = (item) => { //编辑信息
  detailRef.value.edit(item)  //显示人员详情
}
const search = () => {  //关键字搜索
  refreshList()
}
const handleDelete = async (res) => {  //删除数据
  // 判断是否删除
  await ElMessageBox.confirm(
      `是否确认删除${res.name}成员`,
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
  const send = {
    id: res.id,
    $timeout: 1000
  }
  const rul = await post('/api/remove/role', send, 1)
  getList(0)
}
</script>

<template>
  <div class="container">
    <!-- border 为边框 -->
    <div class="header">
      <div>
        用户姓名：<el-input placeholder="请输入用户名" class="input" v-model="input" />
        <el-button type="primary" @click="search">搜索</el-button>
      </div>

    </div>
    <div class="bu">
      <el-button type="primary" @click="showCreate" class="add">新增</el-button>
      <el-button type="primary" @click="showCreate" class="update">修改</el-button>
      <el-button type="primary" @click="showCreate" class="delete">删除</el-button>
    </div>
    <el-table border :data="list" class="tab">
      <!-- prop对应的是列表中每一个项的字段 -->
      <!-- <el-table-column label="管理员头像" align="center" width="180">
          <template #default="scope">
              <img class="head" v-if="scope.row.head" :src="scope.row.head" alt=""> -->
      <!-- 经过编译器编译之后才能识别 -->
      <!-- <img class="head" v-else src="@/assets/default_head.png" alt=""> -->
      <!-- 不要用表达式 -->
      <!-- <img class="head" :src="scope.row.head || '@/assets/img/default_head.png'" alt=""></img> -->
      <!-- </template>
  </el-table-column> -->
      <el-table-column prop="name" label="姓名" align="center" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" width="180" align="center" />
      <el-table-column prop="time" label="创建时间" align="center" width="180"></el-table-column>
      <el-table-column  prop="permission" label="权限设置" align="center">
        <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column prop="controls" label="操作" align="center" width="220">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize2" :page-sizes="[2, 4, 6, 8]"
                   :background="true" layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" class="pagination" />
    <AddRole ref="detailRef" :refreshList="refreshList" />
  </div>
</template>

<style scoped>
.tab{
  height: 498px;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.header {
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  position: relative;
}
.bu {
  position: relative;
  margin: 1%;
  float: left;
}
.input {
  width: 300px;
  margin-right: 10px;
}


.el-table {
  text-align: center;
  border-bottom: 0;
}

.pagination {
  align-self: center;
  margin-bottom: 10px;
}

.head {
  width: 60px;
  height: 60px;
}
</style>
