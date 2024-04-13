import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectsController } from './projects.controller';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { User } from 'src/users/user.entity';
import { Status } from 'src/status/status.entity';
import { CardsService } from 'src/cards/cards.service';
import { Card } from 'src/cards/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Card, Status])],
  providers: [
    ProjectsService,
    CardsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
