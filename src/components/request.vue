<template>
  <section>
    <h1>Active Request's</h1>
    <Table border :columns="setting" :data="requestList"></Table>

    <Modal
      v-model="updateRequestModel"
      title="Update Request Status"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="newAdminModel = false"
      @on-cancel="newAdminModel = false"
    >
      <div style="text-align:center">
        <span v-if="currentRequest.isPhone">
          <Input prefix="ios-call" size="large" v-model="currentRequest.contact" readonly />
        </span>
        <span v-if="!currentRequest.isPhone">
          <Input prefix="ios-mail" size="large" v-model="currentRequest.contact" readonly />
        </span>
        <div class="mt-2">
          <Select v-model="currentRequest.status">
            <Option
              v-for="item in statusList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt-2">
          <Button type="success" long @click="updateStatus">Update Status</Button>
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
      updateRequestModel: false,
      currentRequest: {},
      setting: [
        {
          title: "Contact",
          key: "contact"
        },
        {
          title: "Request Time",
          key: "reqTime"
        },
        {
          title: "Status",
          key: "status"
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
              ),
               h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delete(params.index);
                    }
                  }
                },
                "Delete"
              ),
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
      requestList: "getrequestList"
    })
  },
  methods: {
    ...mapActions({
      getAllrequestList: "getAllrequestList",
      updateRequestStatus: "updateRequestStatus",
      deleteRequest: 'deleteRequest'
    }),
    update(index) {
      let that = this;
      let currentRequest = that.requestList[index];
      if(currentRequest.status !== 'completed'){
      that.currentRequest = currentRequest
      that.updateRequestModel = true;
      }else{
          this.$Message.info('Cannot update completed request');
      }
    },
    delete(index){
      let that = this;
      let currentRequest = that.requestList[index];
      if(currentRequest.status !== 'completed'){
          this.$Message.info(`Cannot delete ${currentRequest.status} request`);
      }else{
        let data = {
          id: currentRequest._id
        }
        console.log(data)
        that.deleteRequest(data).then((res) => {
          this.$Message.success(res.message);
          this.getAllrequestList();
        }).catch(err => {
          this.$Message.error(err.message);
        })
      }
    },
    updateStatus() {
      let that = this;
      let data = {
        id: that.currentRequest._id,
        status: that.currentRequest.status
      };
      that
        .updateRequestStatus(data)
        .then(res => {
          this.$Message.success(res.message);
          that.updateRequestModel = false;
          this.getAllrequestList();
        })
        .catch(err => {
          this.$Message.error(res.message);
        });
    }
  },
  mounted() {
    this.getAllrequestList();
  }
};
</script>

<style>
.mt-2 {
  margin-top: 2vh;
}
</style>
