import { ref } from "vue";
import { firestoreRef } from "../firebase/config";

const getDocument = (collection, id) => {
  let document = ref(null);
  let errorDocument = ref(null);

  let documentRef = firestoreRef.collection(collection).doc(id);

  documentRef.onSnapshot(
    (doc) => {
      if (doc.data) {
        document.value = { ...doc.data(), id: doc.id };
        errorDocument.value = null;
      } else {
        errorDocument.value = "Bu kayıt bulunamadı";
      }
    },
    (err) => {
      errorDocument.value = "Kayıt getirilirken hata oluştu";
    }
  );
  return { document, errorDocument };
};

export default getDocument;
