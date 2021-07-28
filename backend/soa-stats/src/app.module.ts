import { Module } from '@nestjs/common';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    StatsModule
  ],
})
export class AppModule {}
