import { ref } from "vue";
import { firestoreRef } from "../firebase/config";

const useDocument = (koleksiyon, id) => {
  const error = ref(null);

  let documentRef = firestoreRef.collection(koleksiyon).doc(id);

  const deleteDocument = async () => {
    error.value = null;

    try {
      const res = await documentRef.delete();
      return res;
    } catch (error) {
      error.value = "Belge silinemedi";
    }
  };

  const updateDocument = async (workStepi) => {
    error.value = null;

    try {
      const res = await documentRef.update(workStepi);
      return res;
    } catch (error) {
      error.value = "Belge güncellenemedi";
    }
  };

  return { error, deleteDocument, updateDocument };
};

export default useDocument;
