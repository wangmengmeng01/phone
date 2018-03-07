<template>
  <div class="customer_potential">
    <div class="head p4 flex">
      <img src="../../assets/common/contacts.png" alt="" class="contacts">
      <span class="f32 color-font">从通讯录导入</span>
      <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
    </div>
    <div class="item">
      <div class="top">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'customer_potential',
    data() {
      return {
        item: {
          name: '赵一',
          text: '2016.01.15 成为我的客户'
        },
        list:[{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        }]
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
</style>
