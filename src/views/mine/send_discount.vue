<template>
  <div class="send_discount">
    <div class="customer p4">
      <h2 class="title f32 color_font">送给这位客户</h2>
      <img src="/" alt="" class="icon">
      <p class="name center f28 color_font-s">{{item.name}}</p>
    </div>
    <div class="send p4">
      <h2 class="title f32 color_font flex">送他(她)什么好呢 <span class="f24 color_foot-s">可选一个或多个优惠</span></h2>
      <div class="item">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'send_discount',
    data() {
      return {
          item:{
              name: '赵一'
          }
      }
    },
    created() {
    },
    components: {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .send_discount
    padding-top: .42rem
    height: 100%
    background: #f1f1f9
    .title
      line-height: 1rem
    .customer
      background: #fff
      .icon
        width: 1.48rem
      .name
        padding: .66rem
    .send
      margin-top: .42rem
      background: #fff

</style>
