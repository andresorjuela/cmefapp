<template>
  <section>
    <h1>General Setting</h1>
    <div style="padding: 2vh 5vw">
      <h3>
        Show Video:
        <i-switch v-model="showVideo" @on-change="change" />
      </h3>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'setting',
  data() {
    return {
      showVideo: true
    }
  },
  computed: {
    ...mapGetters({
      variables: 'getVariables'
    })
  },
  methods: {
    ...mapActions({
      getALLVars: 'getALLVars',
      updateVariable: 'updateVariable'
    }),
    change(status) {
        let that = this
      let data = {
          id: that.variables[0]._id,
          status
      }
      that.updateVariable(data).then(function(res){
      that.$Message.success(res.message)
      }).catch(err => {
      that.$Message.error(err.message)
      })
    }
  },
  mounted() {
    this.getALLVars()
  },
  watch: {
    variables(newVal, oldVal) {
      if (newVal) {
        newVal.forEach(function(val) {
          if (val.isBoolean) {
            if (val.value == 'true') {
              val.value = true
              val.updated = true
            } else {
              val.value = false
            }
          }
        })
      }
    }
  }
}
</script>

<style>
</style>