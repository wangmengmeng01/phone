<template>
  <div class="foot-tip" :class="[main?'main':'']">
    <div class="f24 color_font-s" v-if="!main">出借有风险，选择需谨慎</div>
    <div class="f24 color_font-s" v-else>银行存管账户，为您的资金保驾护航</div>
  </div>
</template>

<script>
  export default {
    name: 'foot-tip',
    prop:['main']
  }
</script>

<style lang="sass" scoped>
  .foot-tip
    text-align: center
    margin-top: 5.7rem
    &.main
      margin: 1rem auto .4rem
</style>
