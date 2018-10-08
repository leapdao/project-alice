export interface InputPanelProps {
    balance: number;
    onSend: Function;
}

export interface Receiver {
    name: String;
    account: String;
}

export interface InputPanelState {
    amount?: string | number | "";
    receiver: null | Receiver;
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