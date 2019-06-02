import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Estudiante} from "./estudiantes/interfaces/estudiantes";
import {isEmpty} from "@nestjs/common/utils/shared.utils";



@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {
  }
}
