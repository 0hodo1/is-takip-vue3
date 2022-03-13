<template>
  <div class="home mt-4">
    <div v-if="errorCollection" class="error">{{ errorCollection }}</div>
    <div v-if="documents">
      <WorksList :works="documents" />
      <div v-if="documents.length == 0" class="fs-3">
        Henüz yapılacak iş eklenmedi
      </div>
      <router-link
        :to="{ name: 'AddWork' }"
        class="btn btn-lg btn-primary float-end"
      >
        İş ekle
      </router-link>
    </div>
    <div v-else>Yükleniyor</div>
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from "@/composables/getCollection";
import WorksList from "@/components/WorksList";

export default {
  name: "HomeView",
  components: { WorksList },
  setup() {
    const { errorCollection, documents } = getCollection("works");

    return {
      errorCollection,
      documents,
    };
  },
};
</script>
