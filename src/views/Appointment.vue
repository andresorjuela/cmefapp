<template>
  <section>
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantect-logo.png" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
    <div class="content">
      <Card class="card" style="margin-top: 1vh;">
        <div>
          <h4>Pick a date</h4>
          <Select
            v-model="date"
            placeholder="Please Select a date"
            prefix="ios-calendar-outline"
            style="width:100%; margin-top: 1vh;"
          >
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </Card>
      <Card class="card" style="margin-top: 2vh;">
        <div>
          <h4>Pick a Time</h4>
          <Select
            v-model="time"
            placeholder="Please Select a Time"
            prefix="ios-time-outline"
            style="width:100%; margin-top: 1vh;"
          >
            <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </Card>
      <Card class="card" style="margin-top: 2vh;">
        <div style="margin-top: 1vh">
          <Input prefix="ios-contact" placeholder="Fist name" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input prefix="ios-contact" placeholder="Last name" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input prefix="ios-mail" placeholder="Phone/Email" size="large" />
        </div>
        <p
          class="info"
        >If you submitted your email we will contact you via email, if you submit your phone (please include country code) we will contact you through a text message.</p>
        <div style="margin-top: 1vh">
          <Button type="success" long @click="confimBooking">
            <b>Confirm Booking</b>
          </Button>
        </div>
      </Card>
    </div>
    <Modal v-model="bookingModel" class-name="vertical-center-modal">
      <p slot="header" style="color:green;text-align:center">
        <Icon type="ios-checkmark-circle" color="green" />
        <span style="margin-left: 2vw;">Booking recived</span>
      </p>
        <div>
          <h3 class="success--message">You have made a booking, someone from Orentio will reach you out</h3>
          <CellGroup>
                <Cell title="Booking details" />
                <Cell title="Contact" extra="186*******" />
                <Cell title="Date" extra="Nov 18" />
                <Cell title="Time" extra="11:30" />
            </CellGroup>
        </div>
        <div slot="footer">
            <Button type="error" size="large" @click="goBack()">Thanks</Button>
        </div>
    </Modal>
  </section>
</template>

<script>
export default {
  name: "Appointment",
  data() {
    return {
      bookingModel: true,
      date: "nov-18",
      time: "11:00",
      dateList: [
        {
          value: "nov-18",
          label: "Nov 18"
        },
        {
          value: "nov-19",
          label: "Nov 19"
        },
        {
          value: "nov-20",
          label: "Nov 20"
        },
        {
          value: "nov-21",
          label: "Nov 21"
        }
      ],
      timeList: [
        {
          value: "11:00",
          label: "11:00"
        },
        {
          value: "11:30",
          label: "11:30"
        },
        {
          value: "12:00",
          label: "12:00"
        },
        {
          value: "12:30",
          label: "12:30"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    confimBooking(){
      console.log('confimBooking')
    }
  }
};
</script>

<style scoped>
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
  border-bottom: 1px solid gray;
}
.logos--row {
  display: flex;
  flex-direction: row;
  margin-left: 5vw;
  justify-content: space-between;
}
.orantect--logo {
  width: 25%;
  height: auto;
}
.cmef--logo {
  width: 30%;
  height: auto;
}
.title {
  color: #fff;
  margin-left: 5vw;
}
.card {
  width: 95%;
  margin: auto;
}
.info {
  text-align: justify;
  margin-top: 1vh;
  padding: 5px;
}
.success--message {
  color: rgb(236, 102, 8);
  text-align: justify;

}
</style>
