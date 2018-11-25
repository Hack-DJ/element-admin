<template>
  <form-page ref="pageCache" :default-from="getPageCache" />
</template>

<script>
import FormPage from './components/index'
import tageCache from '@/mixins/tagCache'

export default {
  name: 'Form',
  components: { FormPage },
  mixins: [tageCache]
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

