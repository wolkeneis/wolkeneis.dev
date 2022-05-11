import {
  inMemoryPersistence,
  setPersistence,
  signInWithCustomToken
} from "firebase/auth";
import { auth } from "./firebase";

setPersistence(auth, inMemoryPersistence);

export async function customTokenSignIn(token: string): Promise<void> {
  await signInWithCustomToken(auth, token);
}

export async function idToken(): Promise<string | undefined> {
  return await auth.currentUser?.getIdToken();
}
