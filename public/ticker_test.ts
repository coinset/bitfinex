import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";

const baseEquality = {
  bid: anyNumber(),
  bidSize: anyNumber(),
  ask: anyNumber(),
  askSize: anyNumber(),
  dailyChange: anyNumber(),
  last: anyNumber(),
  volume: anyNumber(),
  high: anyNumber(),
  low: anyNumber(),
};

test("fetchTicker", async () => {
  await expect(fetchTicker({ symbol: "tBTCJPY" })).resolves.toEqual(
    {
      type: "t",
      dailyChangeRelative: anyNumber(),
      ...baseEquality,
    },
  );

  await expect(fetchTicker({ symbol: "fUSD" })).resolves.toEqual({
    type: "f",
    frr: anyNumber(),
    bidPeriod: anyNumber(),
    askPeriod: anyNumber(),
    frrAmountAvailable: anyNumber(),
    dailyChangePerc: anyNumber(),
    ...baseEquality,
  });
});
