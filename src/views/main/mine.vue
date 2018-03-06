<template>
  <div class="mine">
    <div class="head">
      <img src="" alt="" class="id_icon">
      <div class="name">
        <h2><span>{{item.name}}</span><img src="" alt=""></h2>
        <p>{{item.complany}}</p>
        <p>手机号 <span>{{item.phone}}</span></p>
      </div>
      <img src="" alt="" class="qrcode_icon">
    </div>
    <foot-tip/>
  </div>
</template>

<script>
  import footTip from '@/components/foot-tip/foot-tip'
  export default {
    name: 'mine',
    data() {
      return {
        item: {
          name: '贞子问',
          complany: '中赢卓信财富投资管理(北京)有限公司闵行分公司',
          phone: '17211112222'
        }
      }
    },
    created() {
    },
    components: {
      "foot-tip" : footTip
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
</style>
