<script setup>
// 生命周期 create mount update unmount
import { watch } from 'vue';
import _ from 'lodash';
import { ElMessageBox } from 'element-plus'; // 如果没有引入，会爆红，xxx is not defined
import post from '@/lib/post.js'; // 引入post接口
import Detail from './Detail.vue'; // 引入详情窗口
import axios from 'axios';
import { ref } from 'vue';
import { hasAuth } from '@/lib/utils.js' // 引入hasAuth

// =============================== 数据

const PAGE_SIZE = 10; // 常量用大写
const detailRef = ref(null); // 详情窗口的引用
const total = ref(0); // 列表数据的总数
let pageNo = ref(1); // 拉取数据的页数，从1开始
let list = ref([]); // 因为要改变list的值，所以一定要用ref不能使用reactive
const keyword = ref(''); // 搜索关键字

// =============================== 函数
// 拉取list
const getList = async (page) => {
  const res = await axios.post('/api/list/station', { pageNo: page, pageSize: PAGE_SIZE, search: keyword.value }); // 使用keyword的值进行搜索
  const data = res.data;
  if (!data.success) {
    alert(data.message);
  }
  if (page === 0) { // 在第0页的时候去获取总数
    total.value = data.result.total;
  }
  list.value = data.result.list; // 将获取到的list赋值给list.value
}
const refreshList = () => { // 刷新列表
  pageNo.value = 1;
  getList(0);
}
const search = () => { // 搜索
  refreshList();
}

getList(0); // 推荐直接获取网络接口

// 监听pageNo的变化，拉取新的数据
watch(pageNo, (cur) => { // current
  getList(cur - 1);
});

const showCreate = () => { // 新增的函数
  detailRef.value.show(); // 显示人员详情
}
const showEdit = (item) => { // 显示编辑的窗口
  detailRef.value.showModify(item)
}
const handleDelete = async (item) => { // 删除
  // 让用户去判断是否删除
  await ElMessageBox.confirm(
    `是否确认删除${item.name}自提点`,
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  );
  // 点击取消的时候，抛出异常，不会过这里，只有点击确认的时候才过这里
  const data = await post('/api/remove/station', { id: item.id });
  if (data) { // 如果删除成功，就去更新列表
    refreshList();
  }
}

const exportExcel = () => { // 导出excel
  const el = document.createElement('a'); // 创建一个a标签
  el.href = '/api/excel/station?filename=自提点表'; // 下载的路由
  el.style.display = 'none'
  document.body.appendChild(el); // 添加到body中
  el.click(); // 模拟点击
  document.body.removeChild(el); // 从body中删除
};

</script>

<template>
  <div class="container">
    <!-- border 为边框 -->
    <div class="header">
      <div>
        <el-input placeholder="请输入关键字进行搜索" class="input" v-model="keyword" />
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" @click="exportExcel">导出excel</el-button>
        <!-- 必须要用“管理人员”这个权限才可以看见这个按钮 “管理人员”对应的值是1-->
        <el-button v-if="hasAuth([1])" type="primary" @click="showCreate">新增</el-button>
      </div>
    </div>
    <el-table border :data="list" class="table">
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
      <!-- 操作栏 -->
      <el-table-column label="操作" v-if="hasAuth([1])">
        <template #default="scope">
          <el-button size="small" type="primary" @click="showEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" class="pagination" v-model:current-page="pageNo" background layout="prev, pager, next" :total="total" :default-page-size="PAGE_SIZE" />
    <Detail ref="detailRef" :refreshList="refreshList" />
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  flex-direction: column;
}
.header {
  height: 50px;
  background: #ecebeb;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
.input {
  width: 300px;
  margin-right: 10px;
}
.pagination {
  margin-top: 10px;
}
.head {
  width: 40px;
  height: 40px;
}
</style>