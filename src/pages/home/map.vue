<script setup>
const option = {
  title: {
    text: '贵州人口分布图', // 标题
    subtext: '2023', // 副标题
    left: 'center', // 左右居中
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c} (万人口)' // 格式
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  visualMap: {
    min: 100,
    max: 800,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    }
  },
  series: [
    {
      name: '贵州人口分布图',
      type: 'map',
      map: 'map',
      label: {
        show: true
      },
      data: [
        { name: '贵阳市', value: 650 },
        { name: '六盘水市', value: 220 },
        { name: '遵义市', value: 320 },
        { name: '安顺市', value: 120 },
        { name: '毕节市', value: 720 },
        { name: '铜仁市', value: 420 },
        { name: '黔西南布依族苗族自治州', value: 320 },
        { name: '黔东南苗族侗族自治州', value: 220 },
        { name: '黔南布依族苗族自治州', value: 120 },
      ],

    }
  ]
}
</script>

<template>
  <v-chart :option="option"></v-chart>
</template>