import { useState, useEffect } from 'react';
import { getNews, addNews, updateNews, deleteNews } from '../api/analyticsApii';
import NewsForm from '../components/admin/NewsForm';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await getNews();
    setNews(data);
  };

  const handleSubmit = async (newsData) => {
    if (editingNews) {
      await updateNews(editingNews.id, newsData);
    } else {
      await addNews(newsData);
    }
    fetchNews();
    setEditingNews(null);
  };

  const handleDelete = async (id) => {
    await deleteNews(id);
    fetchNews();
  };

  return (
    <div className="news-management">
      <h2>Administrar Noticias</h2>
      <button onClick={() => setEditingNews({})} className="btn-add">
        Agregar Nueva Noticia
      </button>
      
      {editingNews && (
        <NewsForm 
          news={editingNews} 
          onSubmit={handleSubmit} 
          onCancel={() => setEditingNews(null)}
        />
      )}

      <div className="news-list">
        {news.map(item => (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="news-actions">
              <button onClick={() => setEditingNews(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsManagement;