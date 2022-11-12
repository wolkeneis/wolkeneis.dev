import { type moos_api_v1 as v1 } from "moos-api";
import { setCSRFToken } from "../redux/sessionSlice";
import { store } from "../redux/store";

export async function fetchProfile(): Promise<v1.UserProfile | null> {
  return (
    ((await _csrfFetch("/profile", undefined, undefined, {
      method: "POST"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function patchProfile(
  body: v1.paths["/profile"]["patch"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile", undefined, body, { method: "PATCH" }).then(
      (response) => response.ok
    )) ?? false
  );
}

export async function fetchApplications(): Promise<v1.Application[] | null> {
  return (
    ((await _csrfFetch("/profile/applications", undefined, undefined, {
      method: "POST"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile/applications"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function fetchFriends(): Promise<v1.Friend[] | null> {
  return (
    ((await _csrfFetch("/profile/friends", undefined, undefined, {
      method: "POST"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile/friends"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function addFriend(
  parameters: v1.paths["/profile/friend/{friendId}"]["parameters"]["path"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/friend/{friendId}", parameters, undefined, {
      method: "PUT"
    }).then((response) => response.ok)) ?? false
  );
}

export async function removeFriend(
  parameters: v1.paths["/profile/friend/{friendId}"]["parameters"]["path"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/friend/{friendId}", parameters, undefined, {
      method: "DELETE"
    }).then((response) => response.ok)) ?? false
  );
}

export async function fetchFriendApplications(
  parameters: v1.paths["/profile/friend/{friendId}/applications"]["parameters"]["path"]
): Promise<v1.Application[] | null> {
  return (
    ((await _csrfFetch(
      "/profile/friend/{friendId}/applications",
      parameters,
      undefined,
      { method: "POST" }
    ).then((response) =>
      response.json()
    )) as v1.paths["/profile/friend/{friendId}/applications"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function fetchFriendFiles(
  parameters: v1.paths["/profile/friend/{friendId}/files"]["parameters"]["path"]
): Promise<v1.File[] | null> {
  return (
    ((await _csrfFetch(
      "/profile/friend/{friendId}/files",
      parameters,
      undefined,
      { method: "POST" }
    ).then((response) =>
      response.json()
    )) as v1.paths["/profile/friend/{friendId}/files"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function fetchFriendFriends(
  parameters: v1.paths["/profile/friend/{friendId}/friends"]["parameters"]["path"]
): Promise<v1.Friend[] | null> {
  return (
    ((await _csrfFetch(
      "/profile/friend/{friendId}/friends",
      parameters,
      undefined,
      { method: "POST" }
    ).then((response) =>
      response.json()
    )) as v1.paths["/profile/friend/{friendId}/friends"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function fetchFiles(): Promise<v1.File[] | null> {
  return (
    ((await _csrfFetch("/profile/files", undefined, undefined, {
      method: "POST"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile/files"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function fetchFile(
  body: v1.paths["/profile/file"]["post"]["requestBody"]["content"]["application/json"]
): Promise<
  | v1.paths["/profile/file"]["post"]["responses"]["200"]["content"]["application/json"]
  | null
> {
  return (
    ((await _csrfFetch("/profile/file", undefined, body, {
      method: "POST"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile/file"]["post"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function createFile(
  body: v1.paths["/profile/file"]["put"]["requestBody"]["content"]["application/json"]
): Promise<
  | v1.paths["/profile/file"]["put"]["responses"]["200"]["content"]["application/json"]
  | null
> {
  return (
    ((await _csrfFetch("/profile/file", undefined, body, {
      method: "PUT"
    }).then((response) =>
      response.json()
    )) as v1.paths["/profile/file"]["put"]["responses"]["200"]["content"]["application/json"]) ??
    null
  );
}

export async function updateFile(
  body: v1.paths["/profile/file"]["patch"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/file", undefined, body, {
      method: "PATCH"
    }).then((response) => response.ok)) ?? false
  );
}

export async function deleteFile(
  body: v1.paths["/profile/file"]["delete"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/file", undefined, body, {
      method: "DELETE"
    }).then((response) => response.ok)) ?? false
  );
}

export async function requestSessionCookie(idToken: string): Promise<boolean> {
  const body: v1.paths["/session"]["post"]["requestBody"]["content"]["application/json"] =
    {
      token: idToken
    };
  return (
    (await _csrfFetch("/session", undefined, body, { method: "POST" }).then(
      (response) => response.ok
    )) ?? false
  );
}

export async function revokeSessionCookie(): Promise<boolean> {
  return (
    (await _csrfFetch("/session", undefined, undefined, {
      method: "DELETE"
    }).then((response) => response.ok)) ?? false
  );
}

export async function requestCSRFToken(): Promise<Response> {
  return _fetch("/csrf-token", undefined, undefined, { method: "GET" });
}

export async function testCSRFToken(): Promise<Response> {
  return _csrfFetch("/csrf-token", undefined, undefined, { method: "POST" });
}

async function _csrfFetch(
  endpoint: keyof v1.paths,
  parameters?: {
    [key: string]: string;
  },
  body?: object,
  init?: RequestInit,
  retry = true
): Promise<Response> {
  const state = store.getState();
  let token = state.session.csrfToken;
  if (!token) {
    token = (await (await requestCSRFToken()).json())._csrf;
    store.dispatch(setCSRFToken(token));
  }
  const response = await _fetch(endpoint, parameters, body, {
    ...init,
    headers: {
      "csrf-token": token ?? "",
      ...init?.headers
    }
  });
  if (response.status === 403 && retry) {
    store.dispatch(
      setCSRFToken((await (await requestCSRFToken()).json())._csrf)
    );
    return _csrfFetch(endpoint, parameters, body, init, false);
  }
  return response;
}

async function _fetch(
  endpoint: keyof v1.paths,
  parameters?: {
    [key: string]: string;
  },
  body?: object,
  init?: RequestInit
): Promise<Response> {
  let finalEndpoint: string = endpoint;
  for (const [key, value] of Object.entries(parameters ?? {})) {
    finalEndpoint = finalEndpoint.replace(`{${key}}`, value);
  }
  return fetch(
    `${
      import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
    }/api/v1${finalEndpoint}`,
    {
      method: "POST",
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers
      }
    }
  );
}
