import BigNumber from "bignumber.js";

export const ALICE_PUBLIC_ADDRESS = "0x4436373705394267350Db2C06613990D34621d69";
export const ALICE_PRIVATE_KEY = "0xad8e31c8862f5f86459e7cca97ac9302c5e1817077902540779eef66e21f394a";

export const BOB_PUBLIC_ADDRESS = "0x2a4f3b49cb0608eef1ca7022afc1fdfb4418e445";
export const BOB_PRIVATE_KEY = "0x526c6c4178eded0d921ae46e7f0fb561ed87683a3f5570c6aa08039c51eeb182";

export const CHARLIE_PUBLIC_ADDRESS = "0xd44287c1f66b20b4bab49d6d4546b4bf0d990123";
export const CHARLIE_PRIVATE_KEY = "0x22f9b4ac8ced2b5938857decef2d546f7690ea91bbf52a66d8b5d82f4902e41b";
export const GENESIS_BLOCK = 0;
export const WEB3_PROVIDER_BASE = "http://ec2-34-254-176-118.eu-west-1.compute.amazonaws.com:8545";
// if websocket is not supported, WEB3_PROVIDER_BASE_WS should be equal to WEB3_PROVIDER_BASE
export const WEB3_PROVIDER_BASE_WS = WEB3_PROVIDER_BASE;
export const PROVIDER_ETHERSCAN_BASE = "http://rinkeby.etherscan.io" as string;
export const TRANSACTIONS_PAGE_SIZE = 15;
export const symbol = "PSC";
export const decimals = new BigNumber(10).pow(9);
