import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { Project } from 'src/projects/projects.entity';
import { CardsService } from './cards.service';
import { Status } from 'src/status/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Card, Status])],
  providers: [
    CardsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [CardsService],
})
export class CardsModule {}
