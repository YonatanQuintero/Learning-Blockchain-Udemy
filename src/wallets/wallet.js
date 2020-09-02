import Transaction from "./transaction";
import { Elliptic, HashGen } from "../modules"

export const INITIAL_BALANCE = 100;

export default class Wallet {

    constructor(blockchain) {
        this.balance = INITIAL_BALANCE;
        this.keyPair = Elliptic.createKeyPair();
        this.publicKey = this.keyPair.getPublic().encode("hex");
        this.blockchain = blockchain;
    }

    sign(data) {
        return this.keyPair.sign(HashGen(data));
    }

    createTransaction(recipientAddress, amount) {
        const { balance, blockchain: { memoryPool } } = this;

        if (amount > balance) throw Error(`Amount: ${amount} exceds current balance: ${balance}`);
        let tx = memoryPool.find(this.publicKey);
        if (tx) {
            tx.update(this, recipientAddress, amount);
        } else {
            tx = Transaction.create(this, recipientAddress, amount);
            memoryPool.addOrUpdated(tx);
        }

        return tx;
    }

    toString() {
        const { balance, publicKey } = this;
        return `Wallet  -
            publicKey:${publicKey.toString()}
            balance: ${ balance }`;
    }
}