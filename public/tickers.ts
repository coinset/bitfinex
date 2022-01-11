import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type TickersOptions = {
  symbols: "ALL"[];
};

type TSymbolResponse = [
  `t${string}`,

  /** BID */
  number,

  /** BID_SIZE */
  number,

  /** ASK */
  number,

  /** ASK_SIZE */
  number,

  /** DAILY_CHANGE */
  number,

  /** DAILY_CHANGE_RELATIVE */
  number,

  /** LAST_PRICE */
  number,

  /** VOLUME */
  number,

  /** HIGH */
  number,

  /** LOW */
  number,
];

type FSymbolResponse = [
  /** SYMBOL */
  `f${string}`,

  /** FRR */
  number,

  /** BID */
  number,

  /** BID_PERIOD */
  number,

  /** BID_SIZE */
  number,

  /** ASK */
  number,

  /** ASK_PERIOD */
  number,

  /** ASK_SIZE */
  number,

  /** DAILY_CHANGE */
  number,

  /** DAILY_CHANGE_PERC */
  number,

  /** LAST_PRICE */
  number,

  /** VOLUME */
  number,

  /** HIGH */
  number,

  /** LOW */
  number,

  /** _PLACEHOLDER */
  null,

  /** _PLACEHOLDER */
  null,

  /** FRR_AMOUNT_AVAILABLE */
  number,
];

type BaseResponse = {
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  dailyChange: number;
  last: number;
  volume: number;
  high: number;
  low: number;
};

export type TickersResponse = (
  | ({
    symbol: `t${string}`;
    type: "t";
    dailyChangeRelative: number;
  } & BaseResponse)
  | ({
    symbol: `f${string}`;
    type: "f";
    frr: number;
    bidPeriod: number;
    askPeriod: number;
    frrAmountAvailable: number;
    dailyChangePerc: number;
  } & BaseResponse)
)[];

export async function fetchTickers(
  { symbols }: TickersOptions,
): Promise<TickersResponse> {
  const url = new URL("tickers", BASE_URL);

  url.searchParams.set("symbols", symbols.join(","));

  const response = await jsonFetch<(TSymbolResponse | FSymbolResponse)[]>(
    url,
  );

  const result = response.map((res) => {
    if (res[0].startsWith("t")) {
      const [
        symbol,
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        last,
        volume,
        high,
        low,
      ] = res as TSymbolResponse;

      return {
        symbol,
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        last,
        volume,
        high,
        low,
        type: "t",
      };
    }

    const [
      symbol,
      frr,
      bid,
      bidPeriod,
      bidSize,
      ask,
      askPeriod,
      askSize,
      dailyChange,
      dailyChangePerc,
      last,
      volume,
      high,
      low,
      _,
      __,
      frrAmountAvailable,
    ] = res as FSymbolResponse;

    return {
      symbol,
      frr,
      bid,
      bidPeriod,
      bidSize,
      ask,
      askPeriod,
      askSize,
      dailyChange,
      dailyChangePerc,
      last,
      volume,
      high,
      low,
      frrAmountAvailable,
      type: "f",
    };
  });

  return result as TickersResponse;
}
