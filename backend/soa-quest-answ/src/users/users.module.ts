import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      }
    }]),
    // ClientsModule.register([{
    //   name: 'AUTH_CLIENT',
    //   transport: Transport.TCP,
    //   options: {
    //     host: '127.0.0.1',
    //     port: 4000,
    //   }
    // }])
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
