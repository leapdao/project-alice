export interface WalletTabPanelProps {
    store: {
        balance: number,
        address: string,
        transactions: Array<any>,
        lastBlock: number
    };
}