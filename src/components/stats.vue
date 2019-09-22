<template>
  <section style="margin-top: 2vh">
    <h1>Welcome To Dashboard</h1>
    <Row :gutter="16" style="margin-top: 2vh;">
      <Col span="5" style="margin-top: 5px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.totalDates}}</h1>
            <h3>Total Date's</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 5px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.activeDates}}</h1>
            <h3>Active Date's</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 5px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.availableDates}}</h1>
            <h3>Availabe Date's</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 5px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.totalAdmin}}</h1>
            <h3>Total Admins</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.totalRequest}}</h1>
            <h3>Total Requests</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.newRequest}}</h1>
            <h3>New Requests</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.activeRequest}}</h1>
            <h3>Active Requests</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.completedRequest}}</h1>
            <h3>Completed Requests</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.totalAppointments}}</h1>
            <h3>Appointments</h3>
          </div>
        </Card>
      </Col>
      <Col span="5" style="margin-top: 10px" offset="1">
        <Card>
          <div style="text-align:center">
            <h1>{{DBStats.totalEvents}}</h1>
            <h3>Total Events</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isStatesPage: false
    }
  },
  computed: {},
  computed: {
    ...mapGetters({
      DBStats: 'getDBStates'
    })
  },
  methods: {
    ...mapActions({
      getDBStats: 'getDBStats'
    })
  },
  beforeMount() {
    let that = this
    that.isStatesPage = true
  },
  mounted() {
    let that = this
    //autocall db in 30 seconds
    setInterval(() => {
      if (that.isStatesPage) {
        that.getDBStats()
      }
    }, 1000)
  },
  beforeDestroy() {
    let that = this
    that.isStatesPage = false
  }
}
</script>

<style>
</style>