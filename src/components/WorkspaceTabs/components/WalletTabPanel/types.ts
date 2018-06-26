import Store from "../../../../store";

export interface WalletTabPanelProps {
    store: Store;
    stores: { [key: string]: Store };
}