<template>
  <section>
    <div v-if="showHome" class="home">
      <div class="logos--row">
        <img src="@/assets/images/Orantech_Logo.gif" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
      <div class="content">
        <h4>时间地点: 2019.10.19-22, 山东青岛 - 展位号: N3, J01</h4>
      </div>
      <div class="btn--content">
        <div class="btn">
          <Button type="warning" long to="/Appointment">
            <h1 class="btnTitle">合作预约洽谈</h1>
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
      </div>
      <Card class="card" style="background-color: #47C2D1; color: #fff">
        <div style="text-align: center">
          <h3>有兴趣成为我们的经销商吗?</h3>
        </div>
        <Tabs type="card" value="name1" @on-click="tabChanged()">
          <TabPane label="Phone" name="name1">
            <div v-if="showPhoneErr">
              <Alert type="error">Invalid Phone Number</Alert>
            </div>
            <div class="row">
              <Input
                v-model="phone"
                size="large"
                type="number"
                placeholder="请留下您的手机号"
              >
                <Select
                  slot="prepend"
                  v-model="countryCode"
                  style="width: 80px"
                  @on-open-change="selectCountry"
                >
                  <Option :value="countryCode">{{ country }}</Option>
                </Select>
              </Input>
              <div style="margin-left: 2vw;">
                <Button type="info" size="large" @click="submitPhoneRequest">
                  <b>提交</b>
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane label="Email" name="name2">
            <div v-if="showEmailErr">
              <Alert type="error">Invalid Email Address</Alert>
            </div>
            <div class="row">
              <Input v-model="email" type="email" placeholder="请留下您的手机号" />
              <div style="margin-left: 2vw;">
                <Button type="info" size="large" @click="submitEmailRequest">
                  <b>提交</b>
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
        <span style="margin-left: 2vw;">Request recived</span>
      </p>
      <div style="text-align:center">
        <h4
          class="success--message"
        >Your contacts has been recived. Someone from Orantech will reach to you soon</h4>
      </div>
      <div slot="footer" />
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
      countryCode: '+86',
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
      countryList: 'getCountryList'
    })
  },
  methods: {
    ...mapActions({
      getALLCountryList: 'getALLCountryList',
      addNewRequestPhone: 'addNewRequestPhone',
      addNewRequestEmail: 'addNewRequestEmail'
    }),
    selectCountry() {
      this.showHome = false
    },
    changeCountry(country) {
      this.countryCode = country.callingCodes[0]
      this.country = country.name
      this.showHome = true
    },
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
          phone: that.phone,
          countryCode: that.countryCode
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
          this.$Message.error('Invalid Email')
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
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
    this.getALLCountryList()
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
  height: 35vh;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-self: center;
  padding: 1%;
}

.btn {
  margin-top: 2vh;
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
  color: #050001;
}
.ivu-tabs-nav {
  color: #fff;
}
</style>
