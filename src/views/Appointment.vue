<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <h3 class="pageTitle">Meeting during MEDICA Reservation Form</h3>
    </div>
    <div class="content" v-if="canBookAppointment">
      <Card class="card" style="margin-top: 1vh;">
        <div>
          <h4>Pick up a day</h4>
          <Select
            v-model="date"
            placeholder="Date"
            prefix="ios-calendar-outline"
            style="width:100%; margin-top: 1vh;"
          >
            <Option
              v-for="item in activeDates"
              :key="item.value"
              :value="item.value"
              :disabled="item.disabled"
            >{{ item.label }}</Option>
          </Select>
        </div>
      </Card>
      <Card class="card" style="margin-top: 2vh;">
        <div>
          <h4>Pick up a time</h4>
          <Select
            v-model="timeId"
            placeholder="Time"
            prefix="ios-time-outline"
            style="width:100%; margin-top: 1vh;"
          >
            <Option
              v-for="item in availableTimings"
              :key="item.value"
              :value="item.value"
              :disabled="item.disabled"
            >{{ item.label }}</Option>
          </Select>
        </div>
      </Card>
      <Card class="card" style="margin-top: 2vh;">
        <div style="margin-top: 1vh">
          <Input v-model="fname" prefix="ios-contact" placeholder="First Name" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input v-model="lname" prefix="ios-contact" placeholder="Last Name" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input
            v-model="contact"
            prefix="ios-mail"
            placeholder="Email/mobile number"
            size="large"
          />
        </div>
        <p
          class="info"
        >If you submitted your email we will contact you via email, if you submit your mobile phone we will contact you through a text message.</p>
        <div style="margin-top: 1vh">
          <Button class="makeBtn" long @click="confimBooking">
            <b>Make booking</b>
          </Button>
        </div>
      </Card>
    </div>
    <div class="content" v-if="!canBookAppointment">
      <Alert
        type="warning"
      >All available slots are fully booked and we do not have a free appointment period.</Alert>
    </div>
    <Modal v-model="bookingModel" class-name="vertical-center-modal">
      <p slot="header" style="color:green;text-align:center">
        <Icon type="ios-checkmark-circle" color="green" />
        <span style="margin-left: 2vw;">Booking Received</span>
      </p>
      <div>
        <h3
          class="success--message"
        >You have made an appointment. Someone from Orantech will reach out you soon.</h3>
        <CellGroup>
          <Cell>
            <b>Appointment Info</b>
          </Cell>
          <Cell title="Email/mobile number" :extra="contact" />
          <Cell title="Date" :extra="date" />
          <Cell title="Time" :extra="time" />
        </CellGroup>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="goBack()">Close</Button>
      </div>
    </Modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Appointment',
  data() {
    return {
      bookingModel: false,
      canBookAppointment: false,
      date: '',
      timeId: '',
      time: '',
      contact: '',
      fname: '',
      lname: ''
    }
  },
  computed: {
    ...mapGetters({
      activeDates: 'getAvalableDates',
      availableTimings: 'getAvailableTimings'
    })
  },
  methods: {
    ...mapActions({
      getAvailabeDates: 'getAvailabeDates',
      getTiming: 'getTiming',
      makeAppointment: 'makeAppointment'
    }),
    goBack() {
      this.$router.go(-1)
    },
    confimBooking() {
      const that = this
      if (!that.date || that.date == '') {
        this.$Message.error('Date required')
      } else if (!that.time || that.time == '') {
        this.$Message.error('Time required')
      } else if (!that.fname || that.fname == '') {
        this.$Message.error('First Name required')
      } else if (!that.lname || that.lname == '') {
        this.$Message.error('Last Name required')
      } else if (!that.contact || that.contact == '') {
        this.$Message.error('Contact required')
      } else {
        let data = {
          fname: that.fname,
          lname: that.lname,
          contact: that.contact,
          timeId: that.timeId,
          date: that.date,
          time: that.time
        }
        that
          .makeAppointment(data)
          .then(res => {
            that.fname = ''
            that.lname = ''
            that.bookingModel = true
            this.getAvailabeDates()
            this.$Message.success(res.message)
          })
          .catch(err => {
            this.$Message.error(err.message)
          })
      }
    }
  },
  watch: {
    activeDates(newVal) {
      let that = this
      if (newVal) {
        // that.date = newVal[0].value;
        that.canBookAppointment = true
      }
    },
    availableTimings(newVal) {
      let that = this
      if (newVal) {
        // that.timeId = newVal[0].value;
        that.canBookAppointment = true
      }
    },
    date(newVal) {
      let that = this
      if (newVal) {
        let data = {
          date: newVal
        }
        that.getTiming(data)
      }
    },
    timeId(newVal) {
      let that = this
      if (newVal) {
        var time = that.availableTimings.find(function(element) {
          return element.value == newVal
        })
        that.time = time.label
      }
    }
  },
  mounted() {
    this.getAvailabeDates()
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
  align-items: center;
  justify-content: flex-start;
  padding: 3% 5% 3% 5%;
  border-bottom: 1px solid gray;
}

.logos--row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
  justify-content: space-between;
}

.orantect--logo {
  width: 50%;
  height: 35px;
}

.cmef--logo {
  width: 45%;
  height: 46px;
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
.pageTitle {
  width: 100%;
  text-align: center;
}
.makeBtn {
  background-color: gray;
  color: #fff;
  font-size: 16px;
}
</style>
