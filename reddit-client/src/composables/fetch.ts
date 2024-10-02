// import { ref } from "vue";

// export function useFetch(url: string) {
//   const data = ref(null);
//   const error = ref<Error | null>(null);
//   const loading = ref(true);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
//       data.value = await response.json();
//     } catch (err) {
//       error.value = err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return { data, error };
// }
