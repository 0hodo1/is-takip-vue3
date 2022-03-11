<template>
  <div class="navbar">
    <nav>
      <img
        src="https://e7.pngegg.com/pngimages/985/67/png-clipart-blue-logo-circle-logo-symbol-font-templates-blue-angle.png"
        alt="logo"
      />
      <h1>
        <router-link :to="{ name: 'home' }">Hodo İş Takip</router-link>
      </h1>
      <div class="links">
        <button class="btn" @click="handleClick">Çıkış Yap</button>
        <router-link class="btn" :to="{ name: 'Login' }">Giriş Yap</router-link>
        <router-link class="btn" :to="{ name: 'Signup' }">Kayıt Ol</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { logout } = useLogout();
    const router = useRouter();
    const handleClick = async () => {
      await logout();
      router.push({ name: "Login" });
    };
    return { handleClick };
  },
};
</script>

<style></style>
