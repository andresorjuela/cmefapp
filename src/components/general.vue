<template>
  <section>
    <h1>General Setting</h1>
    <div style="padding: 2vh 0vw" v-for="(sysVar , index) in variables" :key="index">
      <Card :bordered="false">
        <p slot="title">{{sysVar.name}}</p>
        <span v-if="sysVar.isBoolean">
          <i-switch v-model="sysVar.value" @on-change="change(sysVar)" />
        </span>
        <span v-if="!sysVar.isBoolean">
          <Input v-model="sysVar.value" readonly>
            <span slot="append">
              <Button type="warning" @click="editVariable(sysVar)">Edit</Button>
            </span>
          </Input>
        </span>
      </Card>
    </div>
    <Modal v-model="showVarModel" ok-text="update" cancel-text="Cancel" @on-ok="updateNewValue" class-name="vertical-center-modal">
       <p slot="header" style="color:green;text-align:center">
        <span style="margin-left: 2vw;">Update variable {{currentVar.name}}</span>
      </p>
      <Input v-model="currentVar.value" readonly  placeholder="Current Value">
        <span slot="prepend">Current Value</span>
    </Input>
      <div style="margin-top: 1vh">
        <Input v-model="newVarValue" placeholder="Enter New Value">
        <span slot="prepend">New Value</span>
    </Input>
    </div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'setting',
  data() {
    return {
      showVideo: true,
      showVarModel: false,
      currentVar: {},
      newVarValue: ''
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
    change(sysVar) {
      let that = this
      let data = {
        id: sysVar._id,
        newValue: sysVar.value
      }
      that
        .updateVariable(data)
        .then(function(res) {
          that.$Message.success(res.message)
          that.getALLVars()
        })
        .catch(err => {
          that.$Message.error(err.message)
          that.getALLVars()
        })
    },
    editVariable(sysVar){
      let that = this
      that.currentVar= sysVar
      that.showVarModel = true
    },
    updateNewValue(){
      let that = this
      if(that.newVarValue == that.currentVar.value){
          that.$Message.error('Cannot update same Value')
      }else{
        let data = {
          _id: that.currentVar._id,
          value: that.newVarValue
        }
        that.change(data)
      }
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
            if (val.value == 'true' || val.value == true) {
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