<template>
  <div class="coupon_main">
    <Coupon data="data"/>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { showGiveCouponList } from '@/service'
  export default {
    name: 'coupon_main',
    data() {
      return {

      }
    },
    components: {
      Coupon,
    },
    created() {
      showGiveCouponList({couponType:'1'}).then(r=>{
          log(r)
      })
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .coupon_main
</style>
