import {
  AuthProvider,
  EmailAuthProvider,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithRedirect,
  Persistence,
  signInWithRedirect,
  User,
  UserCredential
} from "firebase/auth";
import { auth } from "./firebase";

auth.setPersistence("NONE" as unknown as Persistence);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export function _signIn(provider: AuthProvider): Promise<boolean> {
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

getRedirectResult(auth)
  .then((result: UserCredential | null) => {
    console.log(result);

    if (!result) {
      return; // Error
    }
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      // Accounts successfully linked.
      const user = result.user;
      // ...
    }
  })
  .catch((error) => {
    // Handle Errors here.
    // ...
  });
