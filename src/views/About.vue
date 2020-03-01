<template>
  <div class="about">
    <h1 class="title">This is an about page</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    console.log('100'.includes('1'))
  }
}
</script>

<style lang="less">
  .title {
    color: blue;
    &:hover {
      background: yellow;
    }
  }
</style>
