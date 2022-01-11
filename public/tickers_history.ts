import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber } from "../deps.ts";

export type TickerHistoryOptions = {
  symbols: `${"f" | "t"}${string}`[] | "ALL";
  start?: number;
  end?: number;
  limit?: number;
};

export type TickersHistoryResponse = {
  symbol: string;
  bid: number;
  ask: number;
  mts: number;
}[];

export async function fetchTickersHistory(
  { symbols, start, end, limit }: TickerHistoryOptions,
): Promise<TickersHistoryResponse> {
  const url = new URL("tickers/hist", BASE_URL);

  const parameter = Array.isArray(symbols) ? symbols.join(",") : symbols;
  url.searchParams.set("symbols", parameter);

  if (isNumber(start)) {
    url.searchParams.set("start", String(start));
  }

  if (isNumber(end)) {
    url.searchParams.set("end", String(end));
  }

  if (isNumber(limit)) {
    url.searchParams.set("limit", String(limit));
  }

  const response = await jsonFetch<[
    string,
    number,
    null,
    number,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    number,
  ][]>(
    url,
  );

  return response.map(([symbol, bid, , ask, , , , , , , , , mts]) => {
    return {
      symbol,
      bid,
      ask,
      mts,
    };
  });
}
