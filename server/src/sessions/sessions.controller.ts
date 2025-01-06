import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return await this.sessionsService.create(createSessionDto);
  }

  @Get()
  async findAll() {
    const sessions = await this.sessionsService.findAll();
    return { sessions };
  }

  @Get(':id')
  async findOne(@Param('id') sessionId: string) {
    const session = await this.sessionsService.findOne(sessionId);
    return { session };
  }

  @Patch(':id')
  async update(
    @Param('id') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const updatedSession = await this.sessionsService.update(
      sessionId,
      updateSessionDto,
    );
    return { updatedSession };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedSession = await this.sessionsService.delete(id);
    return { deletedSession };
  }
}
