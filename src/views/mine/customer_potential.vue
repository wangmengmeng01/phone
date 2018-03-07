<template>
  <div class="customer_potential">
    <div class="head p4 flex" @click="$toask('请下载理财师app导入')">
      <img src="../../assets/common/contacts.png" alt="" class="contacts">
      <span class="f32 color_font">从通讯录导入</span>
      <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
    </div>
    <div class="item" v-for="i in item">
      <div class="top flex">
        <img src="" alt="" class="icon">
        <div class="text">
          <h2 class="f36 color_font">{{i.name}}</h2>
          <p class="f20 color_font-s">{{i.phone}} {{i.text}}</p>
        </div>
      </div>
      <div class="bot">
        <a class="color_main f32" :href="`tel:${i.phone}`">拨打电话</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'customer_potential',
    data() {
      return {
        item: [{
          name: '赵一',
          phone: '13112341234',
          text: '2016.01.15 成为我的客户'
        },{
          name: '赵一',
          phone: '13112341234',
          text: '2016.01.15 成为我的客户'
        },{
          name: '赵一',
          phone: '13112341234',
          text: '2016.01.15 成为我的客户'
        },{
          name: '赵一',
          phone: '13112341234',
          text: '2016.01.15 成为我的客户'
        },{
          name: '赵一',
          phone: '13112341234',
          text: '2016.01.15 成为我的客户'
        }],
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
  .customer_potential
    .head
      padding-top: .32rem
      padding-bottom: .32rem
      background: #fff
      .contacts
        height: .72rem
      .arrow
        height: .34rem
    .item
      border-radius: .08rem
      margin: .4rem
      background: #fff
      padding: .4rem .3rem .3rem .2rem
      .top
        height: .96rem
        .icon
          margin-right: .4rem
          width: .96rem
          border: 1px solid red
          border-radius: 50%
          height: .96rem
        .text
          line-height: 1.5
          flex: 1
      .bot
        margin-top: .4rem
        display: flex
        justify-content: flex-end
        align-items: center
        a
          display: inline-block
          text-align: center
          width: 1.92rem
          height: .56rem
          line-height: .56rem
          border-radius: .28rem
          background: #E5E5F4
          text-decoration: none
</style>
