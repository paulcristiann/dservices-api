import { Controller, Get } from '@nestjs/common';

@Controller('nfts')
export class NftsController {

    @Get('')
    sendTransaction() {
        const fs = require("fs");
        const core = require("@elrondnetwork/elrond-core-js");

        let keyFileJson = fs.readFileSync("/Users/paul/NestJS/dservices-api/src/nfts/wallet.json", { encoding: "utf8" }).trim();
        let keyFileObject = JSON.parse(keyFileJson);

        let account = new core.account();
        account.loadFromKeyFile(keyFileObject, "1234$zasX");

        let transaction = new core.transaction(
            42,                // nonce
            "erd1az5ra373n3cqz6qk8cd8p568jumamf8366xhfhapenusln0czqasasvs2l",         // sender
            "erd1az5ra373n3cqz6qk8cd8p568jumamf8366xhfhapenusln0czqasasvs2l",         // receiver
            "100000000000000000", // value
            1000000000,           // gas price
            70000,                // gas limit
            "food for cats",      // data (not encoded)
            "D",                  // chain ID
            1                     // tx version
        );

        let serializedTransaction = transaction.prepareForSigning();
        transaction.signature = account.sign(serializedTransaction);
        let signedTransaction = transaction.prepareForNode();
        let signedTransactionJson = JSON.stringify(signedTransaction, null, 4);
        return signedTransactionJson;
    }
}
