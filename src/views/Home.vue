<template>
  <section>
    <div v-if="showHome" class="home">
      <div class="logos--row">
        <img src="@/assets/images/Orantech_Logo.gif" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
      <div class="content">
        <h2>时间地点: 2019.10.19-22</h2>
        <h2>山东青岛 - 展位号: N3, J01</h2>
      </div>
      <div class="btn--content">
        <div class="btn">
          <Button type="warning" long to="/Appointment">
            <h1 class="btnTitle">现场活动</h1>
          </Button>
        </div>
        <div class="btn">
          <Button type="warning" long to="/Products">
            <h1 class="btnTitle">产品概览</h1>
          </Button>
        </div>
        <div class="btn">
          <Button type="warning" long to="/Events">
            <h1 class="btnTitle">活动</h1>
          </Button>
        </div>
        <div class="btn" v-if="showVideoButton">
          <Button type="warning" long @click="showVideoModel">
            <h1 class="btnTitle" >企业介绍</h1>
          </Button>
        </div>
      </div>
      <Card class="card" style="background-color: #47C2D1; color: #fff">
        <div class="reqText">
          <h2>有兴趣成为我们的经销商吗?</h2>
        </div>
        <Tabs type="card" value="name1" @on-click="tabChanged()">
          <TabPane label="电话" name="name1">
            <div v-if="showPhoneErr">
              <Alert type="error">无效的手机号码</Alert>
            </div>
            <div class="row">
              <Input
                v-model="phone"
                size="large"
                type="number"
                placeholder="请留下您的手机号"
               />
                <!-- <Select
                  slot="prepend"
                  v-model="countryCode"
                  style="width: 80px"
                  @on-open-change="selectCountry"
                >
                  <Option :value="countryCode">{{ country }}</Option>
                </Select>
              </Input> -->
              <div style="margin-left: 2vw;">
                <Button type="warning" size="large" @click="submitPhoneRequest">
                  <b class="btnTitle">提交</b>
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane label="电子邮件" name="name2">
            <div v-if="showEmailErr">
              <Alert type="error">无效的电子邮箱</Alert>
            </div>
            <div class="row">
              <Input v-model="email" type="email" placeholder="请留下您的手机号" />
              <div style="margin-left: 2vw;">
                <Button type="warning" size="large" @click="submitEmailRequest">
                  <b class="btnTitle">提交</b>
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      <div class="bottom-logos--row">
        <img src="@/assets/images/Medten_logo.jpg" class="Medten--logo" />
        <img src="@/assets/images/Medten-QR-Wechat.jpg" class="qr--code" />
      </div>
    </div>
    <div v-if="!showHome" style="padding: 10px;background: #f8f8f9">
      <Card title="Options" icon="ios-options" :padding="0" shadow>
        <CellGroup
          v-for="(country , index) in countryList"
          :key="index"
          @on-click="changeCountry(country)"
        >
          <Cell :title="country.name" :icon="country.flag" :extra="`+${country.callingCodes[0]}`" />
        </CellGroup>
      </Card>
    </div>
    <Modal v-model="confirmModel" class-name="vertical-center-modal" close>
      <p slot="header" style="color:green;text-align:center">
        <Icon type="ios-checkmark-circle" color="green" />
        <span style="margin-left: 2vw;">请求已接收</span>
      </p>
      <div style="text-align:center">
        <h4
          class="success--message"
        >已收到您的联系方式。稍微会有橙汇的工作人员联系您。</h4>
      </div>
      <div slot="footer" />
    </Modal>
    <Modal
        v-model="videoModel"
        title="企业介绍"
        cancel-text=' '
        ok-text="关"
        @on-ok="videoModel = false"
        @on-cancel="videoModel = false">
        <video controls width="100%">

    <source src="https://www.youtube.com/watch?v=XgnUD4stogY&feature=youtu.be"
            type="video/webm">

    <source src="https://www.youtube.com/watch?v=XgnUD4stogY&feature=youtu.be"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>

    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      showHome: true,
      confirmModel: false,
      videoModel: false,
      // countryCode: '+86',
      country: 'China',
      phone: '',
      showPhoneErr: false,
      email: '',
      showEmailErr: false,
      newCountry: ''
    }
  },
  computed: {
    ...mapGetters({
      countryList: 'getCountryList',
      showVideoButton: 'getVideoVar'
    })
  },
  methods: {
    ...mapActions({
      getALLCountryList: 'getALLCountryList',
      addNewRequestPhone: 'addNewRequestPhone',
      addNewRequestEmail: 'addNewRequestEmail',
      getVarByName: 'getVarByName'
    }),
    selectCountry() {
      this.showHome = false
    },
    // changeCountry(country) {
    //   this.countryCode = country.callingCodes[0]
    //   this.country = country.name
    //   this.showHome = true
    // },
    tabChanged() {
      const that = this
      that.showPhoneErr = false
      that.showEmailErr = false
    },
    submitPhoneRequest() {
      const that = this
      if (that.phone == '') {
        that.showPhoneErr = true
      } else {
        const data = {
          phone: that.phone
          // countryCode: that.countryCode
        }
        that
          .addNewRequestPhone(data)
          .then(res => {
            that.confirmModel = true
            that.phone = ''
          })
          .catch(err => {
            this.$Message.error(err.message)
          })
      }
    },
    submitEmailRequest() {
      const that = this
      if (that.email == '') {
        that.showEmailErr = true
      } else {
        const isEmail = that.validateEmail(that.email)
        if (isEmail) {
          const data = {
            email: that.email
          }
          that
            .addNewRequestEmail(data)
            .then(res => {
              that.confirmModel = true
              that.email = ''
            })
            .catch(err => {
              this.$Message.error(err.message)
            })
        } else {
          this.$Message.error('请求已接收')
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    showVideoModel(){
      let that = this
      that.videoModel = true
    }
  },
  watch: {
    phone(newVal) {
      const that = this
      if (newVal != '') {
        that.showPhoneErr = false
      }
    },
    email(newVal) {
      const that = this
      if (newVal != '') {
        that.showEmailErr = false
      }
    }
  },
  mounted() {
    let that = this
    let data = {
      varName: 'showVideo'
    }
    this.getVarByName(data).then((res) => {
      console.log(res)
    }).catch((err) => {
      that.$Message.error(err.message)
    })
  }
}
</script>

<style scoped>
.home {
  max-width: 600px;
  height: 100vh;
  margin: auto;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  justify-content: flex-start;
  border: 1px solid lightgray;
}

.logos--row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5% 5% 3% 2%;
  height: 100px;
}

.orantect--logo {
  width: 60%;
  height: 100%;
}

.cmef--logo {
  width: 40%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-self: center;
  padding: 1% 1%;
}

.btn--content {
  width: 95%;
  height: 38vh;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-self: center;
  padding: 1%;
}

.btn {
  margin-top: 1vh;
}

.card {
  width: 95%;
  margin: auto;
}

.bottom-logos--row {
  height: 120px;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3% 0% 0% 0%;
}

.Medten--logo {
  width: 75%;
  height: 100%;
}

.qr--code {
  width: 25%;
  height: 100%;
}

.success--message {
  color: rgb(236, 102, 8);
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ivu-modal {
  top: 0;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btnTitle{
  color:#6f6f6f;
}
.ivu-tabs-nav {
  color: #fff;
}
.reqText{
  text-align: center;
  padding: 1px 1px 2vh 1px;
}
</style>
