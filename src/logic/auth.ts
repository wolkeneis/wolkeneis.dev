import {
  AuthProvider,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  inMemoryPersistence,
  linkWithCredential,
  linkWithRedirect,
  setPersistence,
  signInWithCustomToken,
  signInWithRedirect,
  User
} from "firebase/auth";
import { auth } from "./firebase";

setPersistence(auth, inMemoryPersistence);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export async function customTokenSignIn(token: string): Promise<void> {
  await signInWithCustomToken(auth, token);
}

function _signIn(provider: AuthProvider): Promise<boolean> {
  return signInWithRedirect(auth, provider)
    .then(() => true)
    .catch(() => false);
}

export function linkEmail(email: string, password: string): void {
  if (!auth.currentUser) {
    throw new Error("You must be logged in to link your accounts.");
  }
  const credential = EmailAuthProvider.credential(email, password);
  linkWithCredential(auth.currentUser, credential)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Account linking success", user);
    })
    .catch((error) => {
      console.log("Account linking error", error);
    });
}

export function linkGoogle(): Promise<boolean> {
  if (!auth.currentUser) {
    throw new Error("You must be logged in to link your accounts.");
  }
  return _linkWithRedirect(auth.currentUser, googleProvider);
}

export function linkGithub(): Promise<boolean> {
  if (!auth.currentUser) {
    throw new Error("You must be logged in to link your accounts.");
  }
  return _linkWithRedirect(auth.currentUser, githubProvider);
}

function _linkWithRedirect(
  user: User,
  provider: AuthProvider
): Promise<boolean> {
  return linkWithRedirect(user, provider)
    .then(() => true)
    .catch(() => false);
}

export async function idToken(): Promise<string | undefined> {
  return await auth.currentUser?.getIdToken();
}
