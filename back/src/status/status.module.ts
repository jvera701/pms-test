import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusService } from './status.service';
import { Status } from './status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
