<template>
  <div class="add-work">
    <button v-if="!formGoster" @click="formGoster = true">İş Adımı Ekle</button>
    <form v-if="formGoster" @sumbmit.prevent="handleSubmit">
      <h4>Yeni İş Adımı</h4>
      <input type="text" placeholder="İş Adımı" required v-model="workStepi" />
      <button>Ekle</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "@/composables/useDocument";

export default {
  props: ["work"],
  setup(props) {
    const workStepi = ref(null);
    const formGoster = ref(false);

    const { updateDocument } = useDocument("works", props.work.id);

    const handleSubmit = async () => {
      const newWorkStepi = {
        workStepi: workStepi.value,
        id: Math.floor(Math.random() * 1000000),
      };

      // console.log([...props.work.workStep, newWorkStepi]);

      const res = await updateDocument({
        workSteps: [...props.work.workSteps, newWorkStepi],
      });

      workStepi.value = null;
      formGoster.value = false;
    };
    return {
      workStepi,
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
