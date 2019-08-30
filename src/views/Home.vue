<template>
  <section>
    <div class="home" v-if="showHome">
      <div class="logos--row">
        <img src="@/assets/images/Orantect-logo.png" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
      <div class="content">
        <h3>Time: 2019.10.19-22</h3>
        <h3>Hall: 展位号：N3，J01</h3>
      </div>
      <div class="btn--content">
        <div class="btn">
          <Button type="warning" size="large" long to="/Appointment">
            <b>Make Appointment</b>
          </Button>
        </div>
        <div class="btn">
          <Button type="warning" size="large" long to="/Products">
            <b>Products Overview</b>
          </Button>
        </div>
        <div class="btn">
          <Button type="warning" size="large" long to="/Events">
            <b>Events at Orantech</b>
          </Button>
        </div>
      </div>
      <Card class="card">
        <div style="text-align:center">
          <h5>Interested in being a distributor？</h5>
          <Tabs value="name1">
            <TabPane label="Phone" name="name1">
              <Input v-model="phone" type="number" placeholder="Enter Your Contact number">
                <Select
                  v-model="countryCode"
                  slot="prepend"
                  style="width: 80px"
                  @on-open-change="selectCountry"
                >
                  <Option :value="countryCode">{{country}}</Option>
                </Select>
              </Input>
              <div style="margin-top: 2vh">
                <Button type="success" size="large">
                  <b>Submit</b>
                </Button>
              </div>
            </TabPane>
            <TabPane label="Email" name="name2">
              <Input v-model="email" type="email" placeholder="Enter Your Email here" />
              <div style="margin-top: 2vh">
                <Button type="success" size="large">
                  <b>Submit</b>
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Card>
      <div class="bottom-logos--row">
        <img src="@/assets/images/Medten_logo.jpg" class="Medten--logo" />
        <img src="@/assets/images/Medten-QR-Wechat.jpg" class="qr--code" />
      </div>
    </div>
    <div style="padding: 10px;background: #f8f8f9" v-if="!showHome">
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
      <div slot="footer"></div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showHome: true,
      confirmModel: false,
      countryCode: "+86",
      country: "China",
      phone: "",
      email: "",
      newCountry: ""
    };
  },
  computed: {
    ...mapGetters({
      countryList: "getCountryList"
    })
  },
  methods: {
    ...mapActions({
      getALLCountryList: "getALLCountryList"
    }),
    selectCountry() {
      this.showHome = false;
    },
    changeCountry(country) {
      this.countryCode = country.callingCodes[0];
      this.country = country.name;
      this.showHome = true;
    }
  },
  mounted() {
    this.getALLCountryList();
  }
};
</script>
<style scoped>
.home {
  max-width: 600px;
  height: 100vh;
  margin: auto;
  background-image: url("./../assets/images/landing-left.jpg");
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
  padding: 3% 5% 3% 12%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-self: center;
  padding: 2% 5%;
}
.btn--content {
  width: 75%;
  height: 35vh;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-self: center;
  padding: 1% 5% 2% 5%;
}
.btn {
  margin-top: 4vh;
}
.card {
  width: 70%;
  margin: auto;
}
.bottom-logos--row {
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3% 0% 0% 0%;
}
.Medten--logo {
  width: 70%;
  height: 96px;
}
.qr--code{
  width: 30%;
  height: 96px;
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
</style>