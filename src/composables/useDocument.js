import { ref } from "vue";
import { firestoreRef } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);

  let documentRef = firestoreRef.collection(collection).doc(id);

  const deleteDocument = async () => {
    error.value = null;

    try {
      const res = await documentRef.delete();
      return res;
    } catch (error) {
      error.value = "Belge silinemedi";
    }
  };

  const updateDocument = async (workStep) => {
    error.value = null;

    try {
      const res = await documentRef.update(workStep);
      return res;
    } catch (error) {
      error.value = "Belge güncellenemedi";
    }
  };

  return { error, deleteDocument, updateDocument };
};

export default useDocument;
