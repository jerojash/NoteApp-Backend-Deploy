import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req } from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { createnoteService } from 'src/note/application/createNoteService';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteAggregate } from '../domain/noteAggregate';
import { INotes } from '../domain/repository/INotes';
import { Either } from 'src/generics/Either';
//import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly repo: createnoteService) {}


  @Post()
  async create(@Body() body, @Req() request): Promise<string> {
    let text = body.text;
    let img = body.img;
    let etiquet = body.etiquet;
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let dto = new CreateNoteDto(text, img, etiquet, titulo, fechaC, est);

    if ((await this.repo.execute(dto) ).isLeft()) {
      return "No se pudo crear la nota";
    }else{
      return "Nota creada";
    }
  }
  /*
  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }*/

  
}
