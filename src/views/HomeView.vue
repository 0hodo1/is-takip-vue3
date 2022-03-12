<template>
  <div class="home">
    <div v-if="errorCollection" class="error">{{ errorCollection }}</div>
    <div v-if="documents">
      <WorksList :works="documents" />
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
