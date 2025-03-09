import { authentication, createDirectus, rest } from "@directus/sdk";

const directus = createDirectus(`${import.meta.env.VITE_API_ENDPOINT}`)
  .with(authentication("json", { credentials: "include", autoRefresh: true }))
  .with(rest());

export default directus;
