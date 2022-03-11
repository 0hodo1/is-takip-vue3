import { ref } from "vue";
import { authRef } from "../firebase/config";

const error = ref(null);

const logout = async () => {
  error.value = null;
  try {
    await authRef.signOut();
  } catch (error) {
    error.value = error.message;
  }
};

const useLogout = () => {
  return {
    error,
    logout,
  };
};

export default useLogout;
