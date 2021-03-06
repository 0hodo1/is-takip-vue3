import { ref } from "vue";
import { storageRef } from "../firebase/config";

import getUser from "./getUser";
const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadFile = async (file) => {
    filePath.value = `works/${user.value.uid}/${file.name}`; //user.uid erişilemediği için user.value kullanıldı
    const storage = storageRef.ref(filePath.value);

    try {
      const res = await storage.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (error) {
      error.value = "Resim yüklemede hata oluştu";
    }
  };

  const deleteImage = async (path) => {
    const storage = storageRef.ref(path);
    try {
      await storage.delete();
    } catch (error) {
      error.value = error;
    }
  };

  return { uploadFile, url, filePath, error, deleteImage };
};

export default useStorage;
