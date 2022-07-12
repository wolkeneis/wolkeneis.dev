import { setFiles } from "../redux/sessionSlice";
import { store } from "../redux/store";
import { fetchFiles } from "./api";

export async function updateFileList() {
  try {
    store.dispatch(setFiles(await fetchFiles()));
  } catch (error) {
    if (!store.getState().session.files) {
      store.dispatch(setFiles(null));
    }
  }
}
