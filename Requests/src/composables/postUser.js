import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const postUser = (user) => {
  const $toast = useToast();
  const loading = ref(false);

  const addUser = () => {
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
  return { loading, addUser };
};

export default postUser;
