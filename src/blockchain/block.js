import HashGen from "../modules/hash";
import adjustDifficulty from './modules/adjustDifficulty';

const DIFFICULTY = 3;

class Block {

    constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static get genesis() {
        const timestamp = (new Date(2000, 0, 1)).getTime();
        return new this(timestamp, undefined, 'g3n3s1s-h4ash', 'Yonatan A Quintero R', 1, DIFFICULTY);
    }

    static mine(previousBlock, data) {
        const { hash: previousHash } = previousBlock;
        let timestamp = Date.now();
        let hash;
        let nonce = 0;
        let { difficulty } = previousBlock;

        do {
            timestamp = Date.now();
            nonce += 1;
            difficulty = adjustDifficulty(previousBlock, timestamp);
            hash = Block.hash(timestamp, previousHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

        return new this(timestamp, previousHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, previousHash, data, nonce, difficulty) {
        return HashGen(`${timestamp}${previousHash}${data}${nonce}${difficulty}`);
    }

    toString() {
        return `timestamp: ${this.timestamp } \n previousHash: ${this.previousHash} \n hash: ${this.hash} \n data: ${this.data} \n nonce: ${this.nonce} \n Difficulty: ${this.difficulty}`;
    }
}
export { DIFFICULTY }
export default Block