<template>
  <Fxd-mask @click.native="cancel" transition="bouncelnDown">
    <div class="dialog actionsheet">
      <ul>
        <li class="title" @click.stop.prevent>
          热线服务时间：9:00-17:30（工作日）
        </li>
        <li>
          <a href='tel:4008-678-655'>
              4008-678-655
            </a>
        </li>
      </ul>
      <p @click.native="cancel" class="act">取消</p>
    </div>
  </Fxd-mask>
</template>

<style lang="sass" scoped>
  .actionsheet
    position: fixed
    bottom: 10px
    width: 90%
    left: 5%
    z-index: 101
    font-size: 14px
    text-align: center
    ul
      border-radius: 4px
      background: #fff
      li
        font-size: 20px
        color: #0090ff
        line-height: 2.5
        border-bottom: 1px solid #ececec
        &.title
          color: #595757
          font-size: 14px
          line-height: 60px
        a
          text-decoration: none
          color: #0090ff
    p
      font-size: 20px
      color: #0090ff
      line-height: 2.5
      border-radius: 5px
      background: #fff
      margin-top: 10px

</style>

<script>
  import mask from '@/components/mask';
  export default {
    name: 'actionsheet',
    props: ['msg'],
    components: {
      'Fxd-mask': mask,
    },
    methods: {
      cancel() {
        this.$parent.showActionsheet = false
      },
    }
  }
</script>
