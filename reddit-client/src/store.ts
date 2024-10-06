import { reactive } from "vue";
import { type Store } from "./types/store";

export const store = reactive<Store>({
  data: [],
  error: null,
  loading: false,
});
