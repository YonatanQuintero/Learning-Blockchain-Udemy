import express from 'express';
import bodyParser from 'body-parser';
import Blockchain from '../blockchain/blockchain';
import P2PService, { MESSAGE } from './p2p';
import Wallet from '../wallets/wallet';
import e from 'express';

const { HTTP_PORT = 3000 } = process.env;
const app = express();
const blockchain = new Blockchain();
const p2pService = new P2PService(blockchain);
const wallet = new Wallet(blockchain);

app.use(bodyParser.json());

app.listen(HTTP_PORT, () => {
    console.log(`Service HTTP:${HTTP_PORT} listening...`);
    p2pService.listen();
});

app.get('/blocks', (req, res) => {
    res.json(blockchain.blocks);
});

app.post("/mine", (req, res) => {
    const { body: { data } } = req;
    const block = blockchain.addBlock(data);
    p2pService.sync();
    res.json({
        blocks: blockchain.blocks.length,
        block,
    });
});

app.get("/transactions", (req, res) => {
    const { memoryPool: { transactions } } = blockchain;
    res.json(transactions);
});

app.post("/transaction", (req, res) => {
    const { body: { recipient, amount } } = req;
    try {
        const tx = wallet.createTransaction(recipient, amount);
        p2pService.broadcast(MESSAGE.TX, tx);
        res.json(tx);
    } catch (error) {
        res.json({ "error": error.message });
        throw Error(error);
    }
});