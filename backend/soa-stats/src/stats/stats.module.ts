import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'STATS_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      }
    }]),
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
