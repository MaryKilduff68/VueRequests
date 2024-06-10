import axios from "axios";
import { reactive } from "vue";
import { useToast } from "vue-toast-notification";

const getUsers = () => {
  const $toast = useToast();

  const data = reactive({
    users: [],
    loading: true,
  });

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
  return { data, loadUsers };
};

export default getUsers;
