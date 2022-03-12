<template>
  <div v-if="errorDocument" class="error">
    {{ errorDocument }}
  </div>
  <div v-if="work" class="work-details">
    <div class="work-info">
      <div class="image">
        <img :src="work.imageUrl" />
      </div>
      <h2>{{ work.title }}</h2>
      <p class="username">{{ work.username }}</p>
      <p class="description">{{ work.description }}</p>
    </div>
    <div class="work-list">
      <h2>İş adımları</h2>
      <AddWorkStep v-if="userWork" :work="work" />
      <div class="work-list">
        <div v-if="!work.workSteps.length">Henüz iş eklenmedi</div>
        <div v-for="workStep in workSteps" :key="workStep.id">
          <div class="single-work">
            <div class="details">
              <h3>{{ workStep.workStep }}</h3>
              <button v-if="userWork" @click="handleClick(workStep.id)">
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
      <button v-if="userWork" @click="handleDelete">İşi sil</button>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRouter } from "vue-router";
import AddWorkStep from "@/components/AddWorkStep";

export default {
  components: {
    AddWorkStep,
  },
  props: ["id"],
  setup(props) {
    const { errorDocument, document: work } = getDocument("works", props.id);

    const { user } = getUser();
    const userWork = computed(() => {
      return work.value && user.value && user.value.uid === work.value.userId;
    });

    const { deleteDocument, updateDocument } = useDocument("works", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const handleDelete = async () => {
      await deleteImage(work.value.filePath);
      await deleteDocument();

      router.push({ name: "home" });
    };

    const handleClick = async (id) => {
      const workSteps = work.value.workSteps.filter((step) => step.id !== id);

      await updateDocument({
        workSteps,
      });
    };

    return {
      errorDocument,
      work,
      userWork,
      handleDelete,
      handleClick,
    };
  },
};
</script>

<style></style>
