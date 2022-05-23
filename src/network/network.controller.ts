import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { Account, Address } from '@elrondnetwork/erdjs/out';
import { ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';

@ApiTags('Elrond Network')
@Controller('network')
export class NetworkController {

    private networkProvider = new ApiNetworkProvider("https://devnet-api.elrond.com");

    @ApiOperation({ summary: 'Fetches the current Elrond network parameters.' })
    @Get('')
    async fetchNetworkData() {
        return await this.networkProvider.getNetworkConfig();
    }

    @ApiOperation({ summary: 'Fetches the account details for an address.' })
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
