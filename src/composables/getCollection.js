import { ref } from "vue";
import { firestoreRef } from "../firebase/config";

const getCollection = (collection) => {
  const documents = ref(null);
  const errorCollection = ref(null);

  let collectionRef = firestoreRef
    .collection(collection)
    .orderBy("createdAt", "desc");

  collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      errorCollection.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      errorCollection.value = "Verilere erişilemedi";
    }
  );

  return { documents, errorCollection };
};

export default getCollection;
