import { Contract } from "web3/types";

// export * from "./react-ripples";
export * from "./window";

export type Token = {
  symbol: string;
  decimals: number;
  balances: number[];
  token: Contract;
};
