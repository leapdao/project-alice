import Store from "../../../../store";
import { Contract } from "web3/types";
import BigNumber from "bignumber.js";

export type Token = {
    symbol: string,
    token: Contract,
    balances?: Array<BigNumber>
    balance?: BigNumber
    decimals: number
};

export interface WalletTabPanelProps {
    store: Store;
    stores: { [key: string]: Store };
}