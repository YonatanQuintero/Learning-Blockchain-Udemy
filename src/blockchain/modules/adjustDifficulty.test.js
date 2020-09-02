import adjustDifficulty from './adjustDifficulty';

describe('adjustDifficulty()', () => {
    let block;

    beforeEach(() => {
        block = { timestamp: Date.now(), difficulty: 3 };
    });

    it('Lowers the difficulty for slowy mined blocks', () => {
        expect(adjustDifficulty(block, block.timestamp + 60000)).toEqual(block.difficulty - 1);
    });


    it('Increased the difficulty for quick mined blocks', () => {
        expect(adjustDifficulty(block, block.timestamp + 600)).toEqual(block.difficulty + 1);
    });
});