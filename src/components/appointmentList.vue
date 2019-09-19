<template>
  <section>
    <h1>Active Appointments</h1>
    <div style="margin-top: 2vh">
    <Table border :columns="setting" :data="appointmentList"></Table>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      setting: [
        {
          title: "First Name",
          key: "fname"
        },
        {
          title: "Last Name",
          key: "lname"
        },
        {
          title: "Contact",
          key: "contact"
        },
        {
          title: "Date",
          key: "date"
        },
        {
          title: "Time",
          key: "time"
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      appointmentList: "getAppointmentList"
    })
  },
  methods: {
    ...mapActions({
      getAllAppointmentList: "getAllAppointmentList",
    }),
  },
  mounted() {
    this.getAllAppointmentList();
  }
};
</script>

<style>
.mt-2 {
  margin-top: 2vh;
}
</style>
