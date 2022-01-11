import { anyOf, expect, test } from "../dev_deps.ts";
import { fetchStatus } from "./status.ts";

test("fetchStatus", async () => {
  await expect(fetchStatus()).resolves.toEqual(anyOf([0, 1]));
});
