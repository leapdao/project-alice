import { Output, Outpoint, OutputJSON, Input, Tx, Type } from "parsec-lib";

type Unspent = {
 outpoint: Outpoint; // raw outpoint
 output: OutputJSON; //
};

export function makeTransfer(
  unspent: Array<Unspent>,
  from: string,
  to: string,
  amount: number,
  privKey: string,
  height: number = 0
): Tx<Type.TRANSFER> {
  let fromAddr = from.toLowerCase(); // eslint-disable-line
  to = to.toLowerCase(); // eslint-disable-line

  if (unspent.length === 0) {
    throw new Error("Unspent is empty");
  }

  const inputs = [];
  const outputs = [new Output(amount, to)];
  let sum = 0;
  for (let i = 0; i < unspent.length; i += 1) {
    inputs.push(new Input(unspent[i].outpoint));
    sum += unspent[i].output.value;

    if (sum >= amount) {
      break;
    }
  }

  if (inputs.length === 0) {
    throw new Error("No inputs");
  }

  if (sum > amount) {
    outputs.push(new Output(sum - amount, fromAddr));
  }

  const tx = Tx.transfer(height, inputs, outputs);

  if (privKey) {
    return tx.sign(tx.inputs.map(() => privKey));
  }

  return tx;
}
