// NoticiasPage.tsx
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import Navbar from '../components/UI/Navbar';
import { useAdmin } from '../context/AdminContext';
import { Card } from 'react-bootstrap';

const NoticiasPage = () => {
  const { noticias } = useAdmin();

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
                  {noticia.imagen && (
                    <Card.Img 
                      variant="top" 
                      src={noticia.imagen} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="p-3">
                    <h2>{noticia.titulo}</h2>
                    <div className="news-date">
                      Por {noticia.autor} - {noticia.fecha}
                    </div>
                    <p className="mt-2" style={{ color: '#ccc' }}>
                      {noticia.contenido.length > 150 
                        ? `${noticia.contenido.substring(0, 150)}...` 
                        : noticia.contenido}
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