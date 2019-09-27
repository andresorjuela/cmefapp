<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantech_Logo.gif" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
    <div class="content" v-if="canBookAppointment">
      <Card class="card" style="margin-top: 1vh;">
        <div>
          <h4>请选择日期</h4>
          <Select
            v-model="date"
            placeholder="时间"
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
          <h4>请选择时间</h4>
          <Select
            v-model="timeId"
            placeholder="时间"
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
          <Input v-model="fname" prefix="ios-contact" placeholder="姓" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input v-model="lname" prefix="ios-contact" placeholder="名" size="large" />
        </div>
        <div style="margin-top: 1vh">
          <Input v-model="contact" prefix="ios-mail" placeholder="邮箱/手机号" size="large" />
        </div>
        <p
          class="info">如果您提交的是您的电子邮箱，我们会通过电子邮箱联系您。如果您提交的您的手机号（请加上您的国家区号），我们会通过短信联系您。</p>
        <div style="margin-top: 1vh">
          <Button type="success" long @click="confimBooking">
            <b>预约</b>
          </Button>
        </div>
      </Card>
    </div>
    <div class="content" v-if="!canBookAppointment">
      <Alert
        type="warning"
      >所有的预约时段都已订满，我们没有空余的预约时段。</Alert>
    </div>
    <Modal v-model="bookingModel" class-name="vertical-center-modal">
      <p slot="header" style="color:green;text-align:center">
        <Icon type="ios-checkmark-circle" color="green" />
        <span style="margin-left: 2vw;">预定已接收</span>
      </p>
      <div>
        <h3
          class="success--message"
        >您已经预定成功！稍后会有我们公司的专员联系您</h3>
        <CellGroup>
          <Cell title="预约细节" />
          <Cell title="邮箱/手机号" :extra="contact" />
          <Cell title="日期" :extra="date" />
          <Cell title="时间" :extra="time" />
        </CellGroup>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="goBack()">谢谢</Button>
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
        this.$Message.error('日期（必填）')
      } else  if (!that.time || that.time == '') {
        this.$Message.error('时间（必填)')
      } else  if (!that.fname || that.fname == '') {
        this.$Message.error('名 （必填）')
      } else if (!that.lname || that.lname == '') {
        this.$Message.error('姓 （必填）')
      } else if (!that.contact || that.contact == '') {
        this.$Message.error('联系方式 （必填）')
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
            that.contact = ''
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
</style>
