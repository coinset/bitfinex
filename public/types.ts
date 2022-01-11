import type {
  BCH,
  BTC,
  ETH,
  JPY,
  LTC,
  MONA,
  Pair,
  StrictExtract,
  XEM,
  XLM,
  XRP,
  XYM,
} from "../deps.ts";

export type GMOCoinSymbol =
  | BTC
  | ETH
  | BCH
  | LTC
  | XRP
  | XEM
  | XLM
  | XYM
  | MONA;
export type GMOCoinSpotPair = GMOCoinSymbol;
export type GMOCoinMarginPair = Pair<
  StrictExtract<GMOCoinSymbol, BTC | ETH | BCH | LTC | XRP>,
  JPY
>;
export type GMOCoinPair = GMOCoinSpotPair | GMOCoinMarginPair;

export type SuccessResponse<T> = {
  status: 0;
  responsetime: Date;
  data: T;
};
