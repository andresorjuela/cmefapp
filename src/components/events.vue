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
          <div class="rowFE">
            <div v-if="event.type == 'Orantech'">
              <img src="@/assets/images/Orantech.jpg" class="eventType--logo" />
            </div>
            <div v-if="event.type == 'Medten'">
              <img src="@/assets/images/Medten.jpg" class="eventType--logo" />
            </div>
            <h3 class="eventType">{{event.type}} Event</h3>
          </div>
          <div>
            <Icon type="md-trash" size="24" color="red" @click="deleteCurrentEvent(event)" />
            <Icon type="md-more" size="24" color="light-blue" @click="editCurrentEvent(event)" />
          </div>
        </div>
        <div style="padding: 2vh 1vw">
          <h3>{{event.title}}</h3>
          <p>{{event.content}}</p>
        </div>
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
        <!-- <div class="mt-2">
          <Select v-model="date" placeholder="Select Date">
            <Option v-for="item in dateList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Select v-model="time" placeholder="Select Time">
            <Option v-for="item in timeList" :value="item.time" :key="item.time">{{ item.time }}</Option>
          </Select>
        </div>-->
        <div class="mt-2">
          <Input v-model="content" type="textarea" placeholder="Enter Event Description..." />
        </div>
        <div class="mt-2">
          <Select v-model="evtType">
            <Option
              v-for="item in eventTypes"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Button type="success" long @click="createEvent">Create Event</Button>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="showEditEvent"
      title="Update Event"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="showEditEvent = false"
      @on-cancel="showEditEvent = false"
    >
      <div style="text-align:center">
        <Input size="large" v-model="currentEvent.title" placeholder="Event Tittle" />
        <div class="mt-2">
          <Input
            v-model="currentEvent.content"
            type="textarea"
            placeholder="Enter Event Description..."
          />
        </div>
        <div class="mt-2">
          <Select v-model="currentEvent.type">
            <Option
              v-for="item in eventTypes"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Button type="success" long @click="updateEvent">Update Event</Button>
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
      currentEvent: {},
      showEditEvent: false,
      title: '',
      content: '',
      evtType: 'Orantech',
      eventTypes: [
        {
          value: 'Orantech',
          label: 'Orantech'
        },
        {
          value: 'Medten',
          label: 'Medten'
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
      deleteEvent: 'deleteEvent',
      updateEventData: 'updateEventData'
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
          type: that.evtType
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
    },
    editCurrentEvent(event) {
      if (!event.type || event.type == '') {
        event.type = 'Orantech'
      }
      this.currentEvent = event
      this.showEditEvent = true
    },
    updateEvent() {
      let that = this
      let data = {
        id: that.currentEvent._id,
        title: that.currentEvent.title,
        content: that.currentEvent.content,
        type: that.currentEvent.type
      }
      that
        .updateEventData(data)
        .then(res => {
          this.$Message.success('Event Updated')
          that.showEditEvent = false
          that.getALLEvents()
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  },
  mounted() {
    let that = this
    that.getALLEvents()
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
.rowFE {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.eventType {
  margin-left: 2vw;
}
.eventType--logo {
  width: 24px;
  height: 24px;
}
</style>
