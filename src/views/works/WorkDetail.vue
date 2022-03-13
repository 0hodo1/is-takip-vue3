<template>
  <div v-if="errorDocument" class="error">
    {{ errorDocument }}
  </div>
  <div class="row mt-4">
    <div v-if="work" class="work-details col-9">
      <div class="card text-center">
        <div class="card-header">{{ work.username }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ work.title }}</h5>
          <p class="card-text">
            {{ work.description }}
          </p>
          <button
            class="btn btn-danger btn-lg"
            v-if="userWork"
            @click="handleDelete"
          >
            İşi sil
          </button>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>

    <div v-if="work" class="work-details col-3">
      <div class="card" style="width: 18rem">
        <div class="card-header">
          <div class="row">
            <div class="col-5 fs-5">İş Adımları</div>
            <div class="col-7"></div>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <div v-for="workStep in work.workSteps" :key="workStep.id">
            <li class="list-group-item">
              {{ workStep }}
              <button
                v-if="userWork"
                @click="handleClick(workStep.id)"
                class="btn btn-sm btn-danger float-end"
              >
                Adımı Sil
              </button>
            </li>
          </div>
          <AddWorkStep v-if="userWork" :work="work" />
          <li class="list-group-item" v-if="!work.workSteps.length">
            Henüz iş eklenmedi
          </li>
        </ul>
      </div>
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
