import { createDirectus, rest, authentication } from "@directus/sdk";

const directus = createDirectus(`${import.meta.env.VITE_API_ENDPOINT}`)
  .with(authentication("json", { credentials: "include", autoRefresh: true }))
  .with(rest());

export default directus;

const token = localStorage.getItem("access_token");
if (token) {
  directus.setToken(token);
}
