import Block from '../blockchain';
import validate from './validate';
import Blockchain from '../blockchain';

describe('validate', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('validates a valid chain', () => {
        blockchain.addBlock('block #1');
        blockchain.addBlock('block #2');
        expect(validate(blockchain.blocks)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        blockchain.blocks[0].data = 'Bad data';

        try {
            validate(blockchain.blocks);
        } catch (e) {
            return;
        }
        fail('it should not reach here');
    });

    it('invalidats a chain with a corrupt previous hash within a block', () => {
        blockchain.addBlock('block-1');
        blockchain.blocks[1].previousHash = 'Hack';
        try {
            validate(blockchain.blocks);
        } catch (e) {
            return;
        }
        fail('it should not reach here');
    });


    it('invalidate a chain with a corrupt  hash within a block', () => {
        blockchain.addBlock('block-1');
        blockchain.blocks[1].hash = 'Hack';
        try {
            validate(blockchain.blocks);
        } catch (e) {
            return;
        }
        fail('it should not reach here');
    });

});