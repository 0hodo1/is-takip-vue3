<template>
  <div v-for="work in works" :key="work.id">
    <div class="card mb-4">
      <div class="card-header">Oluşturan: {{ work.username }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ work.title }}</h5>
        <p class="card-text">
          {{ work.workSteps.length }} tane iş adımı bulunuyor
        </p>
        <router-link
          class="btn btn-primary"
          :to="{ name: 'WorkDetail', params: { id: work.id } }"
        >
          Detayları göster...
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["works"],
};
</script>

<style></style>
