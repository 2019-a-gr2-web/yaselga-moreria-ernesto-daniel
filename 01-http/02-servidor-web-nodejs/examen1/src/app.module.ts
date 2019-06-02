import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiantes/estudiantes.module';
import { MateriassModule } from './materias/materias.module';

@Module({
  imports: [EstudianteModule,MateriassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
