<template>
  <div class="row">
    <div v-if="data.loading"><app-loader></app-loader></div>
    <div
      v-if="!data.loading"
      class="col-auto mb-4"
      v-for="user in data.users"
      :key="user.id"
    >
      <div class="card" style="width: 14rem">
        <img
          class="card-img-top"
          :src="'https://placebeard.it/300/300?' + user.id"
          alt="Card image cap"
        />
        <div class="card-body">
          <div class="card-text"><strong>Name:</strong> {{ user.name }}</div>
          <div class="card-text">
            <strong>Lastname:</strong> {{ user.lastname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const data = reactive({
  users: [],
  loading: true,
});

// const loadUsers = () => {
//   axios
//     .get(`http://localhost:3004/users`)
//     .then((response) => {
//       data.users = response.data;
//       data.loading = false;
//     })
//     .catch((error) => {
//       $toast.error("Sorry, Something went wrong");
//       data.loading = false;
//     });
// };

const loadUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3004/users`);
    data.users = response.data;
    data.loading = false;
  } catch (error) {
    $toast.error("Sorry, Something went wrong");
    data.loading = false;
  }
};

onMounted(() => {
  loadUsers();
});
</script>
