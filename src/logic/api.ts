import { v1 } from "moos-api";
import { setCSRFToken } from "../redux/sessionSlice";
import { store } from "../redux/store";

export async function fetchProfile(): Promise<
  v1.components["schemas"]["UserProfile"] | null
> {
  return _csrfFetch("/profile", undefined, { method: "POST" }).then(
    (response) => response.json()
  );
}

export async function requestSessionCookie(idToken: string): Promise<boolean> {
  const body: v1.operations["request-session"]["requestBody"]["content"]["application/json"] =
    {
      token: idToken
    };
  return _csrfFetch("/session", body, { method: "POST" }).then(
    (response) => response.ok
  );
}

export async function revokeSessionCookie(): Promise<boolean> {
  return _csrfFetch("/session", undefined, { method: "DELETE" }).then(
    (response) => response.ok
  );
}

export async function requestCSRFToken(): Promise<Response> {
  return _fetch("/csrf-token", undefined, { method: "GET" });
}

export async function testCSRFToken(): Promise<Response> {
  return _csrfFetch("/csrf-token", undefined, { method: "POST" });
}

async function _csrfFetch(
  endpoint: keyof v1.paths,
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
  const response = await _fetch(endpoint, body, {
    headers: {
      "CSRF-Token": token ?? ""
    },
    ...init
  });
  if (response.status === 403 && retry) {
    return _csrfFetch(endpoint, body, init, false);
  }
  return response;
}

async function _fetch(
  endpoint: keyof v1.paths,
  body?: object,
  init?: RequestInit
): Promise<Response> {
  return fetch(
    `${
      process.env.REACT_APP_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
    }/api/v1${endpoint}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : undefined,
      ...init
    }
  );
}
