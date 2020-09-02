import Block, { DIFFICULTY } from './block';

describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;


    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        previousBlock = Block.genesis;
        data = 'xxxxxxxxxxxxxx';
        hash = 'Hashhhhhhhhhhhhh';
    });

    it('Create an instance with parameters', () => {
        const block = new Block(timestamp, previousBlock.hash, hash, data);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
    });


    it('use static mine()', () => {
        const block = Block.mine(previousBlock, data);
        const { difficulty } = block;
        expect(block.hash.length).toEqual(64);
        expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(data).toEqual(data);
    });

    it('use static hash()', () => {
        hash = Block.hash(timestamp, previousBlock.hash, data);
        const hasOutput = 'a89ba8350e64cc8c56d0d85b25148ae4d161738875577b00d13b525d4ab6f76d';
        expect(hash).toEqual(hasOutput);
    });
});