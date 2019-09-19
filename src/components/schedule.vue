<template>
  <section>
    <Row justify="space-around" style="padding: 1vh 2vw;">
      <Col span="6">
        <h1>Active Date's</h1>
      </Col>
      <Col span="2" offset="14">
        <Button type="info" @click="newDateModel = true">Add New</Button>
      </Col>
    </Row>
    <Table border :columns="setting" :data="datetList"></Table>
    <Modal
      v-model="newDateModel"
      title="Add New Admin"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="newDateModel = false"
      @on-cancel="newDateModel = false"
    >
      <div style="text-align:center">
        <DatePicker
          type="date"
          v-model="newDate"
          placeholder="Select date"
          style="width: 100%"
          format="yyyy/MM/dd"
        ></DatePicker>
        <div class="mt-2">
          <Button type="success" long @click="createNewDate">Create Date</Button>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="updateDateModel"
      title="Update Date"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="updateDateModel = false"
      @on-cancel="updateDateModel = false"
    >
          <Input
            prefix="ios-calendar-outline"
            size="large"
            v-model="currentDate.date"
            readonly
          />
        <div class="mt-2">
        <h5>Status</h5><Checkbox v-model="currentDate.isActive">Active</Checkbox>
        </div>
      <div style="text-align: right">
        
        <div class="mt-2">
          <Row>
          <Button type="error"  @click="deleteCurrentDate">Delete Date</Button>
          <span style="margin-left: 2vw;">

          <Button type="success"  @click="updateCurrentDate">Update Date</Button>
          </span></Row>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      newDateModel: false,
      updateDateModel: false,
      newDate: "",
      dateStr: '',
      currentDate: {},
      setting: [
        {
          title: "Date",
          key: "date"
        },
        {
          title: "Active Appointments",
          key: "bookingCount"
        },
        {
          title: "Status",
          key: "status"
        },
        {
          title: "Detail",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.update(params.index);
                    }
                  }
                },
                "View Info"
              )
            ]);
          }
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.update(params.index);
                    }
                  }
                },
                "Update"
              )
            ]);
          }
        }
      ],
      statusList: [
        {
          value: "recived",
          label: "Recived"
        },
        {
          value: "inprogress",
          label: "In Progress"
        },
        {
          value: "completed",
          label: "Completed"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      datetList: "getDatetList"
    })
  },
  methods: {
    ...mapActions({
      getAllDates: "getAllDates",
      addNewDate: 'addNewDate',
      deleteDate: 'deleteDate',
      updateDate: "updateDate"
    }),
    update(index) {
      let that = this;
      that.currentDate = that.datetList[index];
      that.updateDateModel = true;
    },
    updateCurrentDate() {
      let that = this;
      let data = {
        id: that.currentDate._id,
        status: that.currentDate.isActive
      };
      that
        .updateDate(data)
        .then(res => {
          this.$Message.success(res.message);
          that.updateDateModel = false;
        })
        .catch(err => {
          this.$Message.error(res.message);
        });
    },
    createNewDate() {
      let that = this
      if(!that.dateStr){
          this.$Message.error('Please Select a date');
      }else{
        let data = {
          date: that.dateStr
        }
        that.addNewDate(data).then(res => {
          that.dateStr = ''
          that.newDate = ''
          that.newDateModel = false
          this.$Message.success('Date added');
        }).catch((err) => {
          this.$Message.error(err.message);
        })
      }
    },
    deleteCurrentDate(){
      let that = this
      let data = {
        id: that.currentDate._id
      }
      that.deleteDate(data).then((res) => {
          that.updateDateModel = false
          this.$Message.success('Date Deleted');
      }).catch((err) => {
          this.$Message.error(err.message);
      })
    }
  },
  watch: {
    newDate(newVal) {
      let that = this
      if (newVal) {
        let d = newVal;
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var dateStr = date + "-" + month + "-" + year;
        that.dateStr = dateStr
      }
    }
  },
  mounted() {
    this.getAllDates();
  }
};
</script>

<style>
.mt-2 {
  margin-top: 2vh;
}
</style>
