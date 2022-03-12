<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="https://e7.pngegg.com/pngimages/985/67/png-clipart-blue-logo-circle-logo-symbol-font-templates-blue-angle.png"
          alt=""
          width="30"
          height="24"
        />
      </a>
      <a class="navbar-brand" href="#"
        ><router-link :to="{ name: 'home' }">Hodo İş Takip</router-link></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="form-control" />
        <form class="d-flex me-2">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                İşlemler
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-if="user">
                  <router-link :to="{ name: 'AddWork' }" class="btn"
                    >İş Ekle</router-link
                  >
                  <button class="btn" @click="handleClick">Çıkış Yap</button>
                </li>
                <li v-else>
                  <router-link class="btn" :to="{ name: 'Login' }"
                    >Giriş Yap</router-link
                  >
                  <router-link class="btn" :to="{ name: 'Signup' }"
                    >Kayıt Ol</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </nav>
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
