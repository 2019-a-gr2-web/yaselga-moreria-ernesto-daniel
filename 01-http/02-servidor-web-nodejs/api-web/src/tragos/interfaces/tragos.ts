export interface Trago{
    id?: number;
    nombre: string;
    gradosalcohol: number;
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';
    fecha_caducidad: Date;
    precio:number;
}