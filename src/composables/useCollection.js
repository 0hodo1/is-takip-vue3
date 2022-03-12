import { ref } from "vue";
import { firestoreRef } from "../firebase/config";

const useCollection = (collection) => {
  const errorCollection = ref(null);

  const addDocument = async (document) => {
    errorCollection.value = null;
    try {
      await firestoreRef.collection(collection).add(document);
    } catch (error) {
      errorCollection.value = "Ekleme işlemi sırasında hata oluştu";
    }
  };

  return { addDocument, errorCollection };
};

export default useCollection;
