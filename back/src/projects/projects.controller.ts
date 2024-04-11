import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dtos/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  getProjects(@Req() request) {
    return this.projectService.getAllProjects(request.email);
  }

  @Post()
  createProject(@Req() request, @Body() newProject: ProjectDto) {
    return this.projectService.addProject(newProject.name, request.email);
  }
}
