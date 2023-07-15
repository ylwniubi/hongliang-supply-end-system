<template>
  <div class="mess">
    <div class="head">
      <div class="shijian">
        <span class="change">对比时间段:</span>
        <div class="demo-time-range">
          <el-date-picker v-model="value2" type="daterange" start-placeholder="开始时间"
                          end-placeholder="结束时间" :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]" />
        </div>
      </div>
      <div>
        <el-select v-model="selectedValue" placeholder="请选择时间">
          <el-option v-for="option in options1" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </div>
      <div>平均重量:</div>
    </div>
    <v-chart :option="option" class="zhe"></v-chart>
    <div class="foot">
      <div class="shijian">
        <span class="change">对比时间段:</span>
        <div class="demo-time-range">
          <el-date-picker v-model="value2" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间"
                          :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]" />
        </div>
      </div>
      <div>
        <el-select v-model="selectedValue" placeholder="请选择时间">
          <el-option v-for="option in options1" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </div>
      <div>平均收购价格:</div>
    </div>
    <v-chart :option="options" class="zhe"></v-chart>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const value2 = ref('')
const value1 = ref('')
const selectedValue = ref('')
const option = {
  xAxis: {
    name: '时间/天',
    type: 'category',
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    name: '红梁/斤',
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

const options = {
  xAxis: {
    name: '时间/天',
    type: 'category',
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    name: '价格/元',
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

const options1 = [
  { value: 'option1', label: '2个月' },
  { value: 'option2', label: '4个月' },
  { value: 'option3', label: '6个月' },
]

</script>

<style lang="scss" scoped>
.mess {
  h3 {
    text-align: center;
    color: skyblue;
  }

  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .shijian {
      display: flex;
      align-items: center;
    }
  }
  .foot {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .shijian {
      display: flex;
      align-items: center;
    }
  }
}

.zhe {
  // background-color: pink;
  height: 300px;
}
</style>
