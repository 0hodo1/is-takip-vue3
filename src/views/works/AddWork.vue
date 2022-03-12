<template>
  <form @submit.prevent="handleSubmit">
    <h4>İş Oluştur</h4>
    <input type="text" placeholder="İş Başlığı" v-model="title" />
    <textarea placeholder="İş açıklama" v-model="description"></textarea>
    <label>İş tanıtıcı resim</label>
    <input type="file" @change="handleChange" />
    <input type="datetime-local" v-model="startDate" />
    <div class="error">{{ fileError }}</div>
    <button>İş Oluştur</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { date } from "@/firebase/config";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const startDate = ref("");

    const file = ref(null);
    const fileError = ref(null);

    const { uploadFile, url, filePath } = useStorage();
    const { addDocument, errorCollection } = useCollection("works");
    const { user } = getUser();

    const accessType = ["image/png", "image/jpeg", "image/jpg"];

    const handleSubmit = async () => {
      //   console.log(title.value, description.value, startDate.value);
      if (file.value) {
        await uploadFile(file.value);
        // console.log("url: ", url.value);
        await addDocument({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          imageUrl: url.value,
          filePath: filePath.value,
          workSteps: [],
          workDate: Date.parse(startDate.value.toString()),
          createdAt: date(),
        });
        if (!errorCollection.value) {
          console.log("İş eklendi");
        }
      }
    };

    const handleChange = (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile && accessType.includes(selectedFile.type)) {
        file.value = selectedFile;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Lütfen geçerli(png,jpeg,jpg) bir resim seçiniz";
      }
    };

    return {
      title,
      description,
      startDate,
      handleSubmit,
      handleChange,
      fileError,
    };
  },
};
</script>

<style></style>
