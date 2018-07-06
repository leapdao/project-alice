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
    sent: boolean;
    hiddenNotification?: boolean;
    notificationText?: string;
}

export interface SelectAddressOption {
    onSelect: Function;
    option: {
        name: string;
        account: string;
    };
}