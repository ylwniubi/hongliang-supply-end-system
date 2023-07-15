<script setup>
import AddRole from './AddRole.vue'
import { ref, reactive } from 'vue';
import { onMounted, watch } from 'vue';
import { ElMessageBox } from 'element-plus'; // 如果没有引入，会爆红，xxx is not defined
import axios from 'axios'
import { ROLE_MAP } from '@/lib/types.js'; // 用export暴露出来的一定要用{}
import post from '@/lib/post.js'  //引入post接口
import { hasAuth } from '@/lib/utils.js' // 引入hasAuth
const detailRef = ref(null); // 详情窗口的引用
const total = ref(0); // 列表数据的总数
const input = ref('') // 关键字
let pageNo = ref(1); // 拉取数据的页数，从1开始
let list = ref([]); // 因为要改变list的值，所以一定要用ref不能使用reactive
const pageSize2 = ref(4)
onMounted(() => {
    // 拉取list
    // getList(0)
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
// const getList = async (page) => {
//     const res = await axios.post("/api/list/role", {
//         pageNo: page,
//         pageSize: pageSize2.value,
//         search: input.value
//     });
//     console.log(res)
//     const data = res.data;
//     if (!data.success) {
//         alert(data.message);
//     }
//     if (page === 0) { //在第0页的时候去获取总数
//         total.value = data.result.total
//     }
//     list.value = data.result.list;//将获取到的list赋值给list.value
// };

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
                <el-input placeholder="Please input" class="input" v-model="input" />
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
            <el-button type="primary" @click="showCreate" class="add">新增</el-button>
        </div>
        <el-table border :data="list" v-if="1">
            <!-- prop对应的是列表中每一个项的字段 -->
            <el-table-column label="管理员头像" align="center" width="180">
                <template #default="scope">
                    <img class="head" v-if="scope.row.head" :src="scope.row.head" alt="">
                    <!-- 经过编译器编译之后才能识别 -->
                    <img class="head" v-else src="@/assets/default_head.png" alt="">
                    <!-- 不要用表达式 -->
                    <!-- <img class="head" :src="scope.row.head || '@/assets/img/default_head.png'" alt=""></img> -->
                </template>
            </el-table-column>
            <el-table-column prop="name" label="管理员姓名" align="center" width="180"></el-table-column>
            <el-table-column prop="description" label="角色简介" width="180" align="center" />
            <el-table-column label="权限" align="center">
                <template #default="scope">
                    {{ (scope.row.authority || []).map(o => ROLE_MAP[o]).join('，') }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="180"></el-table-column>
            <!-- 操作栏 -->
            <el-table-column prop="id" label="操作" align="center" width="220">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
.container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.header {
    height: 50px;
    background: #ecebeb;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    position: relative;
}

.input {
    width: 300px;
    margin-right: 10px;
}

.add {
    position: absolute;
    right: 20px;
}

.el-table {
    text-align: center;
    border: 10px solid #ccc;
    border-bottom: 0;
}

.pagination {
    margin-top: 10px;
    margin-left: 5px;
}

.head {
    width: 60px;
    height: 60px;
}
</style>
