import { ref } from "vue";
import { authRef } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, username) => {
  error.value = null;
  try {
    const res = await authRef.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Üye olma işleminde sorun oluştu!");
    }
    await res.user.updateProfile({
      displayName: username,
    });
    error.value = null;
    return res;
  } catch (error) {
    error.value = error.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
