<template>
  <div class="foot-tip" :class="[foot && foot.type==='main'?'main':'normal']" :style="foot && foot.style" v-if="foot">
    <div class="f24 color_font-s" v-if="foot && foot.type==='main'">银行存管账户，为您的资金保驾护航</div>
    <div class="f24 color_font-s" v-else>————出借有风险，选择需谨慎————</div>
  </div>
</template>

<script>
  export default {
    name: 'foot-tip',
    computed: {
      foot() {
        return this.$route.meta.foot
      }
    },
    created() {}
  }
</script>

<style lang="sass" scoped>
  .foot-tip
    text-align: center
    padding: 1rem 0 .4rem
    &.main
      background: #fff
</style>
