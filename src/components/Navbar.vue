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
        <div v-if="user">
          <router-link :to="{ name: 'AddWork' }" class="btn"
            >İş Ekle</router-link
          >
          <button class="btn" @click="handleClick">Çıkış Yap</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Login' }"
            >Giriş Yap</router-link
          >
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Kayıt Ol</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";

export default {
  setup() {
    const { logout } = useLogout();
    const router = useRouter();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      router.push({ name: "Login" });
    };
    return { handleClick, user };
  },
};
</script>

<style></style>
