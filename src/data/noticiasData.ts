// src/data/noticiasData.ts
import type { Noticia } from '../types/noticia';

export const noticiasData: Noticia[] = [
  {
    id: '1',
    titulo: 'Lanzamiento del nuevo juego exclusivo',
    contenido: 'Estamos emocionados de anunciar el lanzamiento de nuestro nuevo juego exclusivo que revolucionará la industria de los videojuegos con gráficos de última generación y una jugabilidad innovadora.',
    fecha: '15 Junio 2023',
    imagen: 'https://via.placeholder.com/600x400?text=Nuevo+Juego',
    autor: 'Equipo Editorial'
  },
  {
    id: '2',
    titulo: 'Actualización importante del servidor',
    contenido: 'El próximo martes realizaremos una actualización importante del servidor que mejorará el rendimiento y añadirá nuevas características solicitadas por la comunidad.',
    fecha: '10 Junio 2023',
    autor: 'Administrador del Sistema'
  },
  {
    id: '3',
    titulo: 'Evento especial de verano',
    contenido: 'Participa en nuestro evento especial de verano con premios exclusivos, descuentos en juegos seleccionados y torneos emocionantes. ¡No te lo pierdas!',
    fecha: '1 Junio 2023',
    imagen: 'https://via.placeholder.com/600x400?text=Evento+Verano',
    autor: 'Equipo de Eventos'
  }
];