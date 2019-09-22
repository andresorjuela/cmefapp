<template>
  <section>
    <Row justify="space-around" style="padding: 1vh 1vw;">
      <Col span="6">
        <h1>Active Events</h1>
      </Col>
      <Col span="2" offset="14" v-if="showAddEvent">
        <Button type="info" @click="newEventModel = true">Add New Event</Button>
      </Col>
    </Row>
    <div class="eventList mt-2" v-for="(event , index) in eventList" :key="index">
      <div class="card">
        <div class="row">
          <h3>{{event.title}}</h3>
          <Icon type="md-trash" size="24" color="red" @click="deleteCurrentEvent(event)" />
        </div>
        <h4>{{event.date}} {{event.time}}</h4>
        <p>{{event.content}}</p>
      </div>
    </div>
    <div class="eventList mt-2" v-if="eventList.length  == 0">
      <Alert type="warning">No Active Event</Alert>
    </div>
    <!-- Add new Event -->
    <Modal
      v-model="newEventModel"
      title="Add New Event"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="newAdminModel = false"
      @on-cancel="newAdminModel = false"
    >
      <div style="text-align:center">
        <Input size="large" v-model="title" placeholder="Event Tittle" />
        <div class="mt-2">
          <Select v-model="date" placeholder="Select Date">
            <Option v-for="item in dateList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Select v-model="time" placeholder="Select Time">
            <Option v-for="item in timeList" :value="item.time" :key="item.time">{{ item.time }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Input v-model="content" type="textarea" placeholder="Enter Event Description..." />
        </div>
        <div class="mt-2">
          <Button type="success" long @click="createEvent">Create Event</Button>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showAddEvent: true,
      newEventModel: false,
      title: '',
      content: '',
      date: '',
      time: '11:00 AM',
      dateList: [],
      timeList: [
        {
          time: '11:00 AM'
        },
        {
          time: '11:30 AM'
        },
        {
          time: '12:00 PM'
        },
        {
          time: '12:30 PM'
        },
        {
          time: '01:30 PM'
        },
        {
          time: '02:00 PM'
        },
        {
          time: '02:30 PM'
        },
        {
          time: '03:00 PM'
        },
        {
          time: '03:30 PM'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      eventList: 'getEventList'
    })
  },
  methods: {
    ...mapActions({
      getActiveDates: 'getActiveDates',
      getALLEvents: 'getALLEvents',
      addNewEvent: 'addNewEvent',
      deleteEvent: 'deleteEvent'
    }),
    createEvent() {
      let that = this
      if (!that.title || that.title == '') {
        this.$Message.error('Title required')
      } else if (!that.content || that.content == '') {
        this.$Message.error('Content required')
      } else {
        let data = {
          content: that.content,
          title: that.title,
          date: that.date,
          time: that.time
        }
        that
          .addNewEvent(data)
          .then(res => {
            this.$Message.success('Event Added')
            that.newEventModel = false
            that.getALLEvents()
          })
          .catch(err => {
            this.$Message.error(err.message)
          })
      }
    },
    deleteCurrentEvent(event) {
      let that = this
      let data = {
        id: event._id
      }
      this.$Modal.confirm({
        title: 'Delete Event',
        content: 'Are you sure to delete this Event?',
        okText: 'Delete',
        cancelText: 'Cancel',
        onOk: () => {
          that
            .deleteEvent(data)
            .then(res => {
              that.$Message.success('Event Deleted')
              that.getALLEvents()
            })
            .catch(err => {
              his.$Message.error(err.message)
            })
        },
        onCancel: () => {}
      })
    }
  },
  mounted() {
    let that = this
    that.getALLEvents()
    that
      .getActiveDates()
      .then(res => {
        if (res.length > 0) {
          let dateList = []
          res.forEach(item => {
            dateList.push({
              value: item.date,
              label: item.date
            })
          })
          that.dateList = dateList
          that.date = dateList[0].value
        } else {
          that.$Message.error('No date availabe to add Event')
          that.showAddEvent = false
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}
</script>

<style>
.mt-2 {
  margin-top: 2vh;
}
.eventList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1vh 2vw;
}
.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 6px rgba(42, 9, 1, 0.08);
  border-radius: 8px;
  padding: 2vh 2vw;
  text-align: left;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
