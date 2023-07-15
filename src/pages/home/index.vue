<script setup>
import zhe from './zhe.vue'
import bar from './bar.vue'
// import Line from './line.vue'
import pie from './pie.vue'
import Map from './map.vue'
</script>
<template>
  <div class="content">
    <div class="rol">
      <div class="row">
        <zhe></zhe>
      </div>
      <div class="row">
        <Map></Map>
      </div>
    </div>
    <div class="rol">
      <div class="row">
        <pie></pie>
      </div>
      <div class="row">
        <bar></bar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;
  // background-color: pink;
  display: flex;

  .rol {
    flex: 1;
    // background-color: skyblue;
    // margin: 10px;
    display: flex;
    flex-direction: column;

    .row {
      flex: 1;
      // background-color: pink;
      // margin: 10px;
    }
  }
}
</style>