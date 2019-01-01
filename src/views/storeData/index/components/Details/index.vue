<template>
  <div class="app-container">
    <form-plan :form-data="ruleForm" :rules="rules" :item-list="itemList" />
  </div>
</template>

<script>
import FormPlan from '@/components/Table/FormPlan'

export default {
  name: 'PageDetails',
  components: {
    FormPlan
  },
  props: {
    formConfig: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    up() {
      this.$emit('up')
    },
    next() {
      this.$emit('next')
    },
    save() {
      this.$emit('save')
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>
