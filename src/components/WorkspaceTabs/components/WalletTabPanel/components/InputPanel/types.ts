export interface InputPanelProps {
    balance: number;
    onSend: Function;
}

export interface InputPanelState {
    amount: string | "";
    receiver: null | {
        name: String;
        account: String;
    };
    sending: boolean;
}

export interface SelectAddressOption {
    onSelect: Function;
    option: {
        name: string;
        account: string;
    };
}