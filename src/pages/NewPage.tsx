// pages/NewsPage.tsx
import { useEffect, useState } from 'react';
import { getNews } from '../api/analyticsApii';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <h1 className="page-title">Últimas Noticias</h1>
      <div className="news-grid">
        {news.map(item => (
          <div key={item.id} className="news-card">
            <h2>{item.title}</h2>
            <p className="news-date">{new Date(item.date).toLocaleDateString()}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;