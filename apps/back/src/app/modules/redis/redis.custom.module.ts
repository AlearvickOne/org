import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.DOMAIN,
        port: 6379,
        ttl: 10 * 1000, // 10 cек
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCustomModule {}
