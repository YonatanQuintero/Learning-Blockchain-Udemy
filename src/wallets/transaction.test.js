import Transaction from './transaction';
import Wallet from './wallet';

describe('Transaction', () => {
    let wallet;
    let transaction;
    let amount;
    let recipientAddress;

    beforeEach(() => {
        wallet = new Wallet();
        recipientAddress = 'recipientAddress xxxx';
        amount = 5;
        transaction = Transaction.create(wallet, recipientAddress, amount);
    });

    it("Outputs the amount substracted from the wallet balance", () => {
        const output = transaction.outputs.find(({ address }) => address == wallet.publicKey);
        expect(output.amount).toEqual(wallet.balance - amount);
    });

    it("Outputs the amount added to the recipient", () => {
        const output = transaction.outputs.find(({ address }) => address == recipientAddress);
        expect(output.amount).toEqual(amount);
    });

    describe('Transaction with an amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 500;
            transaction = undefined;
        });

        it("Does not create the transaction", () => {
            expect(() => {
                transaction = Transaction.create(wallet, recipientAddress, amount);
            }).toThrowError(`Amount: ${amount} exceeds balance.`);
        });
    });

    it("inputs the balance of the wallet", () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it("inputs the sender address of the wallet", () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
    });

    it("inputs has a signature using the wallet", () => {
        expect(typeof transaction.input.signature).toEqual('object');
        expect(transaction.input.signature).toEqual(wallet.sign(transaction.outputs));
    });

    it("validates a valid transaction", () => {
        expect(Transaction.verify(transaction)).toBe(true);
    });

    it("Invalidate a corrupt transaction", () => {
        transaction.outputs[0].amount = 500;
        expect(Transaction.verify(transaction)).toBe(false);
    });

    describe("And updating a transaction", () => {
        let nextAmount;
        let nextRecipient;

        beforeEach(() => {
            nextAmount = 3;
            nextRecipient = "n3x7 4ddrr3ss";
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it("Subtracts the next amount from the sender wallet", () => {
            const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
            expect(output.amount).toEqual(wallet.balance - amount - nextAmount);
        });


        it("Outputs an amount for the next recipient", () => {
            const output = transaction.outputs.find(({ address }) => address === nextRecipient);
            expect(output.amount).toEqual(nextAmount);
        });

    });

});