<template>
  <div v-for="work in works" :key="work.id">
    <router-link :to="{ name: 'WorkDetail', params: { id: work.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="work.imageUrl" />
        </div>
        <div class="info">
          <h3>{{ work.title }}</h3>
          <p>Oluşturan: {{ work.username }}</p>
        </div>
        <div class="work-number">
          <p>{{ work.workSteps.length }} tane yapılacak iş var.</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["works"],
};
</script>

<style></style>
