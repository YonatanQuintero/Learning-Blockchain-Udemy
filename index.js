import PKG from "./package.json";
import Block from "./src/blockchain/block.js";
const { name, version } = PKG;

console.log(`${name} v${version}`);

const { genesis } = Block;
console.log(genesis.toString());
console.log("------------------");
const block1 = Block.mine(genesis, 'd4t4-1');
console.log(block1.toString());
console.log("------------------");
const block2 = Block.mine(block1, 'd4t4-2');
console.log(block2.toString());
console.log("------------------");