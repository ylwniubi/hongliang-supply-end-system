<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
const option = {
   // 提示框组件
   tooltip: {
      trigger: 'axis', // 触发类型。坐标轴触发
      axisPointer: {
         // 坐标轴指示器配置项
         type: 'cross', // 指示器类型 十字准星指示器
         label: {
            // 坐标轴指示器的文本标签
            backgroundColor: '#e6b600' // 文本标签的背景颜色就是x轴y轴上的内容
         }
      }
   },
   // 组件离容器的距离
   grid: {
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
   },
   legend: {
      data: ['折线图1', '折线图2', '散点图']
   },
   // 配置x轴
   xAxis: {
      type: 'value',
      axisTick: {
         show: false
      }
   },
   yAxis: {
      type: 'value',
      axisLabel: {
         interval: 0,
         fontSize: 12,
         color: '#fff'
      },
      axisLine: { show: true },
      splitLine: {
         // 修改背景线条样式  x、y轴都可以给添加
         show: true, // 是否展示
         lineStyle: {
            color: '#0A3C40' // 线条颜色
         }
      }
   },
   // 配置折线图数据
   series: [
      {
         name: '折线图1',
         type: 'line',
         data: [
            [14, 25],
            [15, 30],
            [16, 35],
            [17, 40],
            [18, 45],
            [19, 50],
            [20, 55],
            [21, 60],
            [22, 65],
            [23, 70],
            [24, 75],
            [25, 80],
            [26, 85],
            [27, 90],
            [28, 95],
            [29, 100]
         ],
         symbolSize: 5,
         symbol: 'emptyCircle',
         smooth: true
      },
      {
         name: '折线图2',
         type: 'line',
         data: [
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [9, 10],
            [11, 12],
            [13, 14],
            [15, 16],
            [17, 18],
            [19, 20],
            [21, 22],
            [23, 24],
            [25, 26],
            [27, 28],
            [29, 30]
         ],
         symbolSize: 5,
         symbol: 'emptyCircle',
         smooth: true
      },
      {
         name: '散点图',
         type: 'scatter',
         data: [
            [0, 1],
            [2, 3],
            [3, 5],
            [4, 7],
            [5, 9],
            [6, 11],
            [7, 13],
            [8, 15],
            [9, 17],
            [10, 19],
            [11, 21],
            [12, 23],
            [13, 25],
            [14, 27],
            [15, 29]
         ],
         symbolSize: 10
      }
   ]
};
</script>