<template>
  <form @submit.prevent="handleSubmit">
    <div class="my-5">
      <label for="exampleInputEmail1" class="form-label fs-3">Başlık:</label>
      <input
        type="text"
        class="form-control"
        placeholder="İş Başlığı"
        v-model="title"
      />
      <div id="emailHelp" class="form-text">
        İş tanımını bu bölümde yapınız.
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label fs-3">
        Detaylar
      </label>

      <textarea
        placeholder="İş açıklama"
        v-model="description"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label fs-3">Resim seçiniz</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        @change="handleChange"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label fs-3">Tarih:</label>
      <input type="datetime-local" class="form-control" v-model="startDate" />
    </div>

    <button type="submit" class="btn btn-primary btn-lg">İş oluştur</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { date } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
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
        const res = await addDocument({
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
          router.push({ name: "WorkDetail", params: { id: res.id } });
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
