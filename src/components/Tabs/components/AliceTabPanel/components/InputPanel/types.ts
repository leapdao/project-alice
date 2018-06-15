export interface InputPanelProps {
    balance: number;
}

export interface InputPanelState {
    amount: number;    
}

export interface SelectAddressOption {
    onSelect: Function;
    option: {
        name: string;
        account: string;
    };
}