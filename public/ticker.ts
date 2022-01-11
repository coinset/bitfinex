import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type TickerOptions = {
  symbol: `${"f" | "t"}${string}`;
};

type TSymbolResponse = [
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

export type TickerResponse = (
  & BaseResponse
  & (
    | ({
      type: "t";
      dailyChangeRelative: number;
    })
    | ({
      type: "f";
      frr: number;
      bidPeriod: number;
      askPeriod: number;
      frrAmountAvailable: number;
      dailyChangePerc: number;
    })
  )
);

export async function fetchTicker(
  { symbol }: TickerOptions,
): Promise<TickerResponse> {
  const url = new URL(`ticker/${symbol}`, BASE_URL);

  const response = await jsonFetch<TSymbolResponse | FSymbolResponse>(
    url,
  );

  if (symbol.startsWith("t")) {
    const [
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
    ] = response as TSymbolResponse;

    return {
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
  } else {
    const [
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
    ] = response as FSymbolResponse;

    return {
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
  }
}
