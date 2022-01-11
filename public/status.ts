import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type StatusResponse = 0 | 1;

export async function fetchStatus(): Promise<StatusResponse> {
  const url = new URL("platform/status", BASE_URL);
  const [status] = await jsonFetch<[StatusResponse]>(url);
  return status;
}
