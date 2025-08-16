//setPersistence(auth, inMemoryPersistence);

export async function customTokenSignIn(_token: string): Promise<void> {
  //await signInWithCustomToken(auth, token);
}

export async function idToken(): Promise<string | undefined> {
  return undefined;
  //return await auth.currentUser?.getIdToken();
}
