// NoticiasPage.tsx
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import Navbar from '../components/UI/Navbar';
import { Card } from 'react-bootstrap';
import type { Noticia } from '../types/noticia';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const NoticiasPage = () => {
  const [ noticias, setLista ] = useState<Noticia[]>([])
    
    const httpObtenerNoticias = async () => {
          const data = await apiClient('/api/news/', {
                method: 'GET',
              });
          setLista(data)
      }
    useEffect(() => {
      httpObtenerNoticias();
    }, []);
  
    // Verifica los juegos recibidos
    console.log('Noticias recibidas en setLista:', noticias);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <div className="noticias-page py-4">
        <div className="container">
          <h1 className="page-title">Últimas Noticias</h1>
          
          <div className="news-grid">
            {noticias.length === 0 ? (
              <div className="col-12">
                <p className="text-center">No hay noticias disponibles en este momento.</p>
              </div>
            ) : (
              noticias.map(noticia => (
                <div key={noticia.id} className="news-card">
                  {noticia.image && (
                    <Card.Img 
                      variant="top" 
                      src={noticia.image} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="p-3">
                    <h2>{noticia.title}</h2>
                    <div className="news-date">
                      Por {noticia.author} - {noticia.date}
                    </div>
                    <p className="mt-2" style={{ color: '#ccc' }}>
                      {noticia.content.length > 150 
                        ? `${noticia.content.substring(0, 150)}...` 
                        : noticia.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <CarritoSidebar />
    </div>
  );
};

export default NoticiasPage;