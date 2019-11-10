<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantech_Logo.gif" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
    <div class="content">
      <Card>
        <div style="text-align:center">
          <h5>Track your request/booking</h5>
          <Tabs value="name1" @on-click="tabChanged()">
            <TabPane label="Phone" name="name1">
              <div v-if="showPhoneErr">
                <Alert type="error">Invalid Phone Number</Alert>
              </div>
              <Input v-model="phone" type="number" placeholder="Enter Your Contact number">
                <Select
                  slot="prepend"
                  v-model="countryCode"
                  style="width: 80px"
                  @on-open-change="selectCountry"
                >
                  <Option :value="countryCode">{{ country }}</Option>
                </Select>
              </Input>
              <div style="margin-top: 2vh">
                <Button type="success" size="large" @click="submitPhoneRequest">
                  <b>Track</b>
                </Button>
              </div>
            </TabPane>
            <TabPane label="Email" name="name2">
              <div v-if="showEmailErr">
                <Alert type="error">Invalid Email Address</Alert>
              </div>
              <Input v-model="email" type="email" placeholder="Enter Your Email here" />
              <div style="margin-top: 2vh">
                <Button type="success" size="large" @click="submitEmailRequest">
                  <b>Track</b>
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </div>
    <div class="bottom-logos--row">
      <img src="@/assets/images/Medten_logo.jpg" class="Medten--logo" />
      <img src="@/assets/images/Medten-QR-Wechat.jpg" class="qr--code" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Track',
  data() {
    return {
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
      getALLCountryList: 'getALLCountryList'
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
        that.phone = ''
        this.$Message.error('No Such Request')
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
          // that.addNewRequestEmail(data).then((res) => {
          that.email = ''
          this.$Message.error('No Such Request')
          // }).catch(err => {
          //   this.$Message.error(err.message);
          // })
        } else {
          this.$Message.error('Invalid Email')
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    goBack() {
      this.$router.go(-1)
    },
    tabChanged() {
      const that = this
      that.showPhoneErr = false
      that.showEmailErr = false
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
  height: 100%;
  margin: auto;
  border: 1px solid lightgray;
  background-size: 100% 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 2%;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3% 5% 3% 5%;
  align-items: center;
  border-bottom: 1px solid gray;
}

.logos--row {
  display: flex;
  flex-direction: row;
  margin-left: 5vw;
  align-items: center;
  justify-content: space-between;
}

.orantect--logo {
  width: 25%;
  height: 35px;
}

.cmef--logo {
  width: 30%;
  height: 46px;
}

.content {
  padding: 2vh 5vw;
}

.card {
  width: 95%;
  margin: auto;
}

.bottom-logos--row {
  bottom: 0;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3% 0% 0% 0%;
}

.Medten--logo {
  width: 70%;
  height: 96px;
}

.qr--code {
  width: 30%;
  height: 96px;
}
</style>
