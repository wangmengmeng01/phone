<template>
  <div class="protocol">
    <Protocol/>
  </div>
</template>

<script>
  import Protocol from '@/components/protocol/protocol'
  export default {
    name: 'protocol',
    components: {
      Protocol,
    },
  }
</script>

<style lang="sass" scoped>
.protocol
  font-size: .32rem
  line-height: .4rem
  p
    .center
      text-align: left
</style>
