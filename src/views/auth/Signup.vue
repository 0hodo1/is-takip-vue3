<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >Kullanıcı adınız</label
      >
      <input
        type="text"
        class="form-control"
        aria-describedby="emailHelp"
        v-model="username"
      />
      <div id="emailHelp" class="form-text">Boş bırakmayınız</div>
    </div>
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
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { error, signup } = useSignup();
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, username.value);
      if (!error.value) {
        console.log("Üye olma işlemi başarılı");
        router.push({ name: "home" });
      }
    };
    return { email, password, username, handleSubmit, error };
  },
};
</script>

<style></style>
