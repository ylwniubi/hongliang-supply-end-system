<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import * as echarts from "echarts";
const option = {
  title: {
    text: '民族人口分布图', // 正标题
    link: 'http://www.baidu.com/', // 链接跳转
    target: 'self', // 跳转目标
    subtext: '56个民族', // 副标题
    left: 'center', // 左右居中
    // borderWidth: 1, // 边框
    // borderColor: 'red', // 边框颜色
    // padding: 10, // 内边距
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'bar',
      showBackground: true,  // 柱状是否有背景
      backgroundStyle: {  // 柱状的背景色
        color: 'rgba(180, 180, 180, 0.2)'
      },
      barWidth: 20, // 宽度
      label: {
        show: true
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: [
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 200 },
        { name: 'Wed', value: 150 },
        { name: 'Wed', value: 80 },
        { name: 'Fri', value: 70 },
        { name: 'Sat', value: 110 },
        { name: 'Sun', value: 130 },
      ],
    }
  ]
};
</script>