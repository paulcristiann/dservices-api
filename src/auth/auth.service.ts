import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    // KEYS
    private apiKeys: string[] = [ '1fa544cc-39d8-402c-8459-746f994c5400', ];

    validateApiKey(apiKey: string) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }

}