import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchTickersHistory } from "./tickers_history.ts";

test("fetchTickersHistory", async () => {
  await expect(fetchTickersHistory({ symbols: "ALL" })).resolves.toEqual(
    anyArray({
      symbol: anyString(),
      bid: anyNumber(),
      ask: anyNumber(),
      mts: anyNumber(),
    }),
  );
});
