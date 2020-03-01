<template>
  <div class="home">
    这是主项目<button @click="handleClick">click</button>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  mounted () {
    console.log('Home')
  },
  methods: {
    handleClick () {
      console.log(this.$store)
    }
  }
}
</script>
