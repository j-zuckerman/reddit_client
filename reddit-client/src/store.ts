import { reactive } from "vue";
import { type Store } from "./types/store";

export const store = reactive<Store>({
  data: null,
  error: null,
  loading: false,
});
