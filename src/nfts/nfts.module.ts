import { Module } from '@nestjs/common';
import { NftsController } from './nfts.controller';

@Module({
  controllers: [NftsController]
})
export class NftsModule {}
