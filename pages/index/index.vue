<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN -->
    <uv-navbar
        :fixed="false"
        title="首页"
        left-arrow="false"
        @leftClick="$onClickLeft"
    />
    <!-- #endif -->

  </view>
</template>

<script setup>

</script>

<style lang="scss">
.container{
  background-color: #FFF;
  width: 100%;
  height: 100vh;
  padding: 0 0;
  background-size: 100%;
  background-repeat: no-repeat;

}
</style>
