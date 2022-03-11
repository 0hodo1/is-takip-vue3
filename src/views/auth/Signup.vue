<template>
  <form @submit.prevent="handleSubmit">
    <h3>Hodo İş Takip Kayıt Sayfası</h3>
    <input
      type="username"
      placeholder="Kullanıcı adı giriniz..."
      v-model="username"
    />
    <input type="email" placeholder="Email giriniz..." v-model="email" />
    <input type="password" placeholder="Parola giriniz..." v-model="password" />
    <button>Kayıt Ol</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";

export default {
  setup() {
    const { error, signup } = useSignup();
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, username.value);
      if (!error.value) {
        console.log("Üye olma işlemi başarılı");
      }
    };
    return { email, password, username, handleSubmit, error };
  },
};
</script>

<style></style>
