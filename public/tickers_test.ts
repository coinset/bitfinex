import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTickers } from "./tickers.ts";

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

test("fetchTickers", async () => {
  await expect(fetchTickers({ symbols: ["ALL"] })).resolves.toEqual(
    anyArray(anyOf([{
      symbol: anyString((v) => v.startsWith("t")),
      type: "t",
      dailyChangeRelative: anyNumber(),

      ...baseEquality,
    }, {
      symbol: anyString((v) => v.startsWith("f")),
      type: "f",
      frr: anyNumber(),
      bidPeriod: anyNumber(),
      askPeriod: anyNumber(),
      frrAmountAvailable: anyNumber(),
      dailyChangePerc: anyNumber(),
      ...baseEquality,
    }])),
  );
});
