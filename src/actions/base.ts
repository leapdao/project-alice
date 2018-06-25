import getWeb3 from "../getWeb3";

export const BASE_LOAD_BALANCE = "BASE_LOAD_BALANCE";
export const BASE_LOAD_BALANCE_SUCCESS = "BASE_LOAD_BALANCE_SUCCESS";
export const BASE_LOAD_BALANCE_FAILED = "BASE_LOAD_BALANCE_FAILED";

export const BASE_INIT_ACCOUNT = "BASE_INIT_ACCOUNT";

export const loadBalance = (address: string) => (dispatch) => {
    const web3 = getWeb3();
    web3.eth.getBalance(address, (error, result) => {
        if (error) {
            dispatch({
                type: BASE_LOAD_BALANCE_FAILED,
                payload: {
                    error
                }
            });
            console.error(error.message);
        } else {
            dispatch({
                type: BASE_LOAD_BALANCE_SUCCESS,
                payload: {
                    data: result
                }
            });
        }
    });
};

export const initAccount = (address) => ({
    type: BASE_INIT_ACCOUNT,
    payload: {
        data: address
    }
});
