import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dtos/projects.dto';
import { StatusDto } from 'src/status/dtos/status.dto';
import { CardsService } from 'src/cards/cards.service';
import {
  CardDto,
  CardUpdateDto,
  CardDeleteDto,
} from 'src/cards/dtos/cards.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService,
    private cardService: CardsService,
  ) {}

  @Get()
  getProjects(@Req() request) {
    return this.projectService.getAllProjects(request.email);
  }

  @Post()
  createProject(@Req() request, @Body() newProject: ProjectDto) {
    return this.projectService.addProject(newProject.name, request.email);
  }

  @Get('/:id/cards')
  getCards(@Req() request, @Param('id') id: number) {
    return this.cardService.getAllCardsFromProject(id, request.email);
  }

  @Post('/:id/cards')
  addCards(@Req() request, @Param('id') id: number, @Body() newCard: CardDto) {
    return this.cardService.addCardToProject(
      id,
      newCard.statusId,
      newCard.title,
      newCard.description,
      request.email,
    );
  }

  @Patch('/:id/cards')
  modifyCards(
    @Req() request,
    @Param('id') id: number,
    @Body() updateCard: CardUpdateDto,
  ) {
    return this.cardService.updateCard(
      id,
      updateCard.cardId,
      updateCard.statusId,
      updateCard.title,
      updateCard.description,
      request.email,
    );
  }

  @Delete('/:id/cards')
  deleteCards(
    @Req() request,
    @Param('id') id: number,
    @Body() deleteCard: CardDeleteDto,
  ) {
    this.cardService.removeCard(id, deleteCard.cardId, request.email);
  }

  @Get('/:id/status')
  getStatuses(@Req() request, @Param('id') id: number) {
    return this.projectService.getAllStatusFromProject(id, request.email);
  }

  @Post('/:id/status')
  addStatus(
    @Req() request,
    @Param('id') id: number,
    @Body() newStatus: StatusDto,
  ) {
    return this.projectService.addStatus(newStatus.name, id, request.email);
  }
}
