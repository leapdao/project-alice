export interface InputPanelProps {
    balance: number;
    onSend: Function;
}

export interface InputPanelState {
    amount: number | "";    
}

export interface SelectAddressOption {
    onSelect: Function;
    option: {
        name: string;
        account: string;
    };
}