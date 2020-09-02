import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
    let blockchain;
    let blockchainB;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchainB = new Blockchain();
    });

    it('Every Blockchain has a genesis block', () => {
        const [genesisBlock] = blockchain.blocks;
        expect(Block.genesis).toEqual(genesisBlock);
        expect(blockchain.blocks.length).toEqual(1);
    });

    it('Use addBlock()', () => {
        const data = 'data';
        blockchain.addBlock(data);

        const [, lastBlock] = blockchain.blocks;
        expect(lastBlock.data).toEqual(data);
        expect(blockchain.blocks.length).toEqual(2);
    });

    it('replace the chain with a valid chain', () => {
        blockchainB.addBlock('Data b');
        blockchain.replace(blockchainB.blocks);
        expect(blockchainB.blocks).toEqual(blockchainB.blocks);
    });

    it('does not replace the chain with one less blocks', () => {
        blockchain.addBlock('Data #1');
        try {
            blockchain.replace(blockchainB.blocks);
        } catch (e) {
            return;
        }
        fail('it should not reach here');
    });

    it('not replace the chain with one is not valid', () => {
        blockchainB.addBlock('Data #1');
        blockchainB.blocks[1].data = 'hack';
        try {
            blockchain.replace(blockchainB.blocks);
        } catch (e) {
            return;
        }
        fail('it should not reach here');
    });

});