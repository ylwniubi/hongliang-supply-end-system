<script setup>
import { ref, defineExpose, defineProps, reactive } from 'vue';
import axios from 'axios';
const props = defineProps(['refreshList']); // 接收属性
const visible = ref(false); // 窗口是否显示
let isCreate = true; // 判断是否是新增
let value = null; // 用来保存record
const form = reactive({
  name: '方运江', // 姓名
  phone: '13012341234', // 手机号码
});
const title = ref('新增自提点信息');

const show = () => {  // 显示窗口
  visible.value = true;
  title.value = '新增自提点信息';
  isCreate = true;
}
const showModify = (record) => { // 编辑的时候显示出窗口
  value = record; // 保存record
  visible.value = true; // 显示出窗口
  form.name = record.name; // 去更改form的值
  form.phone = record.phone;
  title.value = '编辑自提点信息';
  isCreate = false;
}
// 定义提交的函数
const submit = async () => {
  // return console.log(form);
  if (isCreate) {
    const res = await axios.post('/api/create/station', form); // 新增自提点的接口
    const data = res.data;
    if (!data.success) {
      return alert(data.message);
    }
    visible.value = false; // 关闭本身窗口
    // 通知列表刷新
    props.refreshList();
  } else {
    // console.log('================={ id: value.id, ...form }', { id: value.id, ...form });
    const res = await axios.post('/api/modify/station', { id: value.id, ...form });
    const data = res.data;
    if (!data.success) {
      return alert(data.message);
    }
    visible.value = false; // 关闭本身窗口
    // 通知列表刷新
    props.refreshList();
  }
};
defineExpose({ show, showModify }); // 一定要用对象， 把方法和属性暴漏出去，其他组件可以调用
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <!-- 如果需要验证,一定要给form传递一个model -->
    <el-form ref="ruleFormRef" :model="form" status-icon label-width="120px" class="headContainer">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- 添加prop为验证的字段名称 -->
      <el-form-item label="手机号码" prop="phone" :rules="[
          { type: 'number', message: '请输入正确的电话号码' },
          // 自定义验证的时候用validator
          { validator: (rule, value, callback) => {
            // 验证电话号码的正确性
            if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
              callback(); // 如果成功,callback为空
            } else {
              callback('请输入正确的电话号码'); // 如果失败,传提示的语句
            }
          } }
        ]">
        <!-- 需要验证,一定要添加rules -->
        <el-input v-model.number="form.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped>
/* 需要调整ui框架的css时，需要指定父元素的class */
.headContainer .el-form-item__content {
  line-height: normal;
}
</style>