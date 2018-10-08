import Store from '../../../../store';
import { Contract } from 'web3/types';

export type Token = {
  symbol: string;
  token: Contract;
  balances?: Array<Number>;
  balance?: Number;
  decimals: number;
};

export interface WalletTabPanelProps {
  store: Store;
  stores: { [key: string]: Store };
}
