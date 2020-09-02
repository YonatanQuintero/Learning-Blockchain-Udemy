import Wallet, { INITIAL_BALANCE } from "./wallet";
import Blockchain from "../blockchain";
import Transaction from "./transaction";

describe('Wallet', () => {
    let blockchain;
    let wallet;

    beforeEach(() => {
        blockchain = new Blockchain();
        wallet = new Wallet(blockchain);
    });

    it('it is a healthy wallet', () => {
        expect(wallet.balance).toEqual(INITIAL_BALANCE);
        expect(typeof wallet.keyPair).toEqual('object');
        expect(typeof wallet.publicKey).toEqual('string');
        expect(wallet.publicKey.length).toEqual(130);
    });

    it("use sign()", () => {
        const signature = wallet.sign("h3ll0");
        expect(typeof signature).toEqual("object");
        expect(signature).toEqual(wallet.sign("h3ll0"));
    });

    describe("Creating a transaction", () => {

        let tx;
        let recipientAddress;
        let amount;

        beforeEach(() => {
            recipientAddress = "r4nd0m-4drr3ss";
            amount = 5;
            tx = wallet.createTransaction(recipientAddress, amount);
        });

        describe("And doing the same transaction", () => {
            beforeEach(() => {
                tx = wallet.createTransaction(recipientAddress, amount);
            });

            it("Double the amount substracted from the wallet balance", () => {
                const output = tx.outputs.find(({ address }) => address === wallet.publicKey);
                expect(output.amount).toEqual(wallet.balance - (amount * 2));
            });

            it("Clones the amount outputs for the recipient", () => {
                const amounts = tx.outputs
                    .filter(({ address }) => address == recipientAddress)
                    .map((output) => output.amount);

                expect(amounts).toEqual([amount, amount]);
            });
        });

    });
});