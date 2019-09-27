<template>
  <section class="home">
    <div class="row">
      <Icon type="md-arrow-round-back" size="24" @click="goBack()" />
      <div class="logos--row">
        <img src="@/assets/images/Orantech_Logo.gif" class="orantect--logo" />
        <img src="@/assets/images/CMEF_logo.jpg" class="cmef--logo" />
      </div>
    </div>
    <div class="content" v-if="eventList.length > 0">
      <Row v-for="(event , index) in eventList" :key="index">
        <Col span="24" style="margin-top: 1vh">
          <Card>
            <h2 slot="title">{{event.title}}</h2>
            <h5>{{event.date}} {{event.time}}</h5>
            <div style="margin-top: 1vh">
            <p>{{event.content}}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <div class="content" v-if="eventList.length  == 0">
      <Alert type="warning">无活动事件</Alert>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Events',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      eventList: 'getEventList'
    })
  },
  methods: {
    ...mapActions({
      getALLEvents: 'getALLEvents'
    }),
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.getALLEvents()
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
  width: 50%;
  height: 35px;
}

.cmef--logo {
  width: 45%;
  height: 46px;
}
.card {
  width: 95%;
  margin: auto;
}
</style>
