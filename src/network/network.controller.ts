import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { Account, Address } from '@elrondnetwork/erdjs/out';

@Controller('network')
export class NetworkController {

    private networkProvider = new ApiNetworkProvider("https://devnet-api.elrond.com");

    @Get('')
    async fetchNetworkData() {
        return await this.networkProvider.getNetworkConfig();
    }

    @Get(':wallet_address')
    async fetchAccountDetails(@Param('wallet_address') wallet_address: string) {
        try {
            let address = new Address(wallet_address);
            return await this.networkProvider.getAccount(address);
        } catch(e) {
            console.log(e);
            throw new HttpException('Invalid address', HttpStatus.NOT_FOUND);
        }
    }
}
