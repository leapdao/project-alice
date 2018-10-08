/// <reference path="../node_modules/types-bn/index.d.ts" />

import BN = require('bn.js');

const TEN = new BN(10, 10);

function toInt(n: number | string) {
  const decimals = Math.min(5, Number(String(n).split('.')[1]) || 0);
  return [Number(n) * 10 ** decimals, decimals];
}

export function toCents(n: number | string, decimals: number) {
  const [int, nDecimals] = toInt(n); // BN.js doesn't support decimals
  const decimalsBN = new BN(decimals - nDecimals, 10);
  return new BN(int, 10).mul(TEN.pow(decimalsBN)).toNumber();
}

export function fromCents(n: number | string, decimals: number) {
  return new BN(n, 10).div(new BN(10 ** (decimals - 2), 10)).toNumber() / 100;
}
