<template>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {

    name: 'prod-index',

    data () {
      return {

      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
