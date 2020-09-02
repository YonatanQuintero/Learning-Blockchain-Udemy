import MemoryPool from './memoryPool';
import Wallet, { Transaction } from "../wallets";

describe("MemoryPool", () => {
    let memoryPool;
    let wallet;
    let transaction;

    beforeEach(() => {
        memoryPool = new MemoryPool();
        wallet = new Wallet();
        transaction = new Transaction.create(wallet, "r4nd0m-4ddr3ss", 5);
        memoryPool.addOrUpdated(transaction);
    });

    it("Has one transaction", () => {
        expect(memoryPool.transactions.length).toEqual(1);
    });

    it("Find a transaction to the memoryPool", () => {
        const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
        expect(found).toEqual(transaction);
    });

    it("upadtes a transaction in the memoryPool", () => {
        const txOld = JSON.stringify(transaction);
        const txNew = transaction.update(wallet, '0th3r-4ddr3ss', 10);

        memoryPool.addOrUpdated(txNew);

        expect(memoryPool.transactions.length).toEqual(1);

        const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
        expect(JSON.stringify(found)).not.toEqual(txOld);
        expect(txNew).toEqual(found);

    });
});