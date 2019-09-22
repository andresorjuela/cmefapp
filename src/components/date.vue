<template>
  <section class="body">
    <h1>{{date}} Complete Information</h1>
    <div style="padding: 1vh 2vw">
      <Table border :columns="setting" :data="dateInfo"></Table>
    </div>
    <div class="calendar" style="margin-top: 1vh">
        <Row justify="space-around">
            <Col span="6" offset="1" style="padding : 4px"  v-for="(time , index) in dateTiming" :key="index">
          <div  @click="showAppointments(time)">
              <Card :style="{ 'background-color': time.color , 'color': 'white'}" > 
            <p slot="title" style="color: white">{{time.time}}</p>
            <p>Total Slots:  2</p>
            <p>Booked Slots:  {{time.booking}}</p>
            <p>Remaining Slots:  {{2 - time.booking}}</p>
          </Card>
          </div>
          </Col>
        </Row>
    </div>
    <Modal
        v-model="showAppointmentsModel"
        title="Appointments Detail"
      ok-text="Close"
      cancel-text=" ">
        <CellGroup>
                <Cell title="Date" :extra="currentDate" />
                <Cell title="Time" :extra="currenttime" />
                <Cell title="Total Slots" extra="2" />
                <Cell title="Booked" :extra="bookedSlots" />
                <Cell title="Remaining " :extra="availableSlots" />
            </CellGroup>
            <h4>Appointments: </h4>
            <div class="appointmentList" v-for="(appointment , index) in appointments" :key="index">
            <div class="card">
                <CellGroup>
                <Cell title="Name" :extra="appointment.fname + ' ' + appointment.lname" />
                <Cell title="Contact" :extra="appointment.contact" />
            </CellGroup>
            </div>
            </div>
    </Modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      date: '',
      showAppointmentsModel: false,
      currenttime: '',
      currentDate: '',
      bookedSlots: '',
      availableSlots: '',
      appointments: [],
      setting: [
        {
          title: 'Date',
          key: 'date'
        },
        {
          title: 'Total Slots',
          key: 'totalAppointmentSlots'
        },
        {
          title: 'Active Appointments',
          key: 'bookedSlots'
        },
        {
          title: 'Remaining Slots',
          key: 'remainingSlots'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      dateInfo: 'getDateInfo',
      dateTiming: 'getDateTiming'
    })
  },
  methods: {
    ...mapActions({
      getSingleDate: 'getSingleDate',
      filterAppointments: 'filterAppointments'
    }),
    showAppointments(time){
        let that = this
        let data = {
            date: that.date,
            time: time.time
        }
        that.filterAppointments(data).then((res) => {
            let appointments = res.appointments
            if(appointments.length == 0){
          this.$Message.info("NO Appointment Booked on this time Slot");
            }else{
                that.currentDate = data.date
                that.currenttime = data.time
                that.appointments = appointments
                that.bookedSlots = String(appointments.length)
                that.availableSlots = String(2 - appointments.length)
                that.showAppointmentsModel = true
            }
        }).catch(err => {
            console.log(err)
        })
    }
  },
  mounted() {
    let that = this
    let date = that.$router.history.current.params.date
    that.date = date
    that.showContent = true
    that.getSingleDate({ date })
  }
}
</script>

<style scoped>
.appointmentList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1vh 2vw;
}
.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 6px rgba(42, 9, 1, 0.08);
  border-radius: 16px;
  padding: 1vh 4vw;
  text-align: left;
}
</style>