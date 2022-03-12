<template>
  <h3>Giriş Sayfası</h3>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email adresiniz</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <div id="emailHelp" class="form-text">Boş bırakmayınız</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Parolanız</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";

export default {
  setup() {
    const { error, login } = useLogin();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("giriş yapıldı");
      }
    };
    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
