<template>
  <h2>Add users</h2>
  <div v-show="loading">
    <app-loader></app-loader>
  </div>
  <div>
    <div v-show="!loading">
      <div class="form-group mb-3">
        <label>Name</label>
        <input class="form-control" type="text" v-model="user.name" />
      </div>

      <div class="form-group mb-3">
        <label>Lastname</label>
        <input class="form-control" type="text" v-model="user.lastname" />
      </div>

      <button class="btn btn-primary" @click.prevent="submitForm">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const loading = ref(false);

const user = reactive({
  name: "",
  lastname: "",
});

const submitForm = () => {
  loading.value = true;
  axios({
    method: "POST",
    url: "http://localhost:3004/users",
    data: user,
  })
    .then(() => {
      $toast.success("User Added");
    })
    .catch((error) => {
      $toast.error("Sorry, Something went wrong");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
