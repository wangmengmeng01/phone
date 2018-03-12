<template>
  <div class="bank_choose mt4">
    <ul v-if="list.length">
      <li v-for="i in list" class="color_font m4" @click="gift(i)">
        <img :src="i.imgUrl" alt="" class="place-img">
        <span>{{i.bankName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getBanks } from '@/service'
  export default {
    name: 'bank_choose',
    data() {
      return {
        list: []
      }
    },
    created() {
      getBanks({busiType:1}).then(r=>{
        this.list = r.list
      })
    },
    methods: {
      choose(item){
        const {bankName, bankNo} = item;
        const backurl = this.$route.query.backurl;
        this.$go(backurl ,{bankName, bankNo})
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .bank_choose
    height: 100%
    ul
      background: #fff
      li
        img
          height: .96rem
          width: .96rem
          margin-right: .4rem
        display: flex
        align-items: center
        font-size: .4rem
        line-height: 1.76rem
        height: 1.76rem
        &:not(:last-child)
          border-bottom: 1px solid #CDCED3
</style>
