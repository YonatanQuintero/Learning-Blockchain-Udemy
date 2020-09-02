import Elliptic from "elliptic";
import HashGen from "./hash";

const ec = new Elliptic.ec('secp256k1');

export default {
    createKeyPair: () => ec.genKeyPair(),

    verifySignature: (publicKey, signature, data) => {
        return ec.keyFromPublic(publicKey, "hex").verify(HashGen(data), signature);
    }
}