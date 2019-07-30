import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './Login/login.module';
import { TiendaModule } from './Padre/padre.module';
import { ProductosModule } from './Hijo/hijo.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { PedidoModule } from './Pedido/pedido.module';
import { DespachoModule } from './Despacho/despacho.module';
import { ProductoEntity } from './Hijo/hijo.entity';
import { TiendaEntity } from './Padre/padre.entity';
import { DetalleEntity } from './Detalle/detalle.entity';
import { PedidoEntity } from './Pedido/pedido.entity';
import { UsuarioEntity } from './Usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    LoginModule,
    TiendaModule,
    ProductosModule,
    UsuarioModule,
    PedidoModule,
    DespachoModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre cadena conex por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 32771,
      username: 'root',
      password: 'root',
      database: 'examen',
      entities: [
          ProductoEntity,
          TiendaEntity,
          DetalleEntity,
          PedidoEntity,
          UsuarioEntity
      ],
      synchronize: true,
      insecureAuth : true,
      dropSchema: false
    })
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
