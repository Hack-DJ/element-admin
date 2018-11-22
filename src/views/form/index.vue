<template>
  <form-page />
</template>

<script>
import FormPage from './components/index'

export default {
  name: 'Form',
  components: { FormPage },
  beforeRouteEnter(to, from, next) {
    console.log('todo before enter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('todo update enter')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('todo leave enter')
    next()
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

