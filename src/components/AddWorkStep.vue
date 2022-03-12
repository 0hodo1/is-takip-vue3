<template>
  <div class="add-work">
    <button v-if="!formGoster" @click="formGoster = true">İş Adımı Ekle</button>
    <form v-if="formGoster" @sumbmit.prevent="handleSubmit">
      <h4>Yeni İş Adımı</h4>
      <input type="text" placeholder="İş Adımı" required v-model="stepWork" />
      <button>Ekle</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "@/composables/useDocument";

export default {
  setup(props) {
    const workStep = ref("");
    const formGoster = ref(false);

    const { updateDocument } = useDocument("works", props.work.id);

    const handleSubmit = async () => {
      const newWorkStep = {
        workStep: workStep.value,
        id: Math.floor(Math.random() * 1000000),
      };

      console.log([...props.work.workStep, newWorkStep]);

      const res = await updateDocument({
        workSteps: [...props.work.workStep, newWorkStep],
      });

      workStep.value = null;
      formGoster.value = false;
    };
    return {
      workStep,
      formGoster,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.add-work {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
