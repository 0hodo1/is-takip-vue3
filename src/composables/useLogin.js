import { ref } from "vue";
import { authRef } from "../firebase/config";

const error = ref(null);

const login = async (email, password) => {
  error.value = null;
  try {
    const res = await authRef.signInWithEmailAndPassword(email, password);
    error.value = null;
    return res;
  } catch (error) {
    error.value = error.message;
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
