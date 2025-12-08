import { useState, useEffect } from 'react';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://dev.to/api/articles?tag=react&per_page=${articlesPerPage}&page=${currentPage}`
      );
      
      if (!response.ok) {
        throw new Error(`Ошибка при получении ответа: ${response.status}`);
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const truncateContent = (html, maxLength = 200) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading && articles.length === 0) {
    return (
      <div className="app">
        <div className="loading">Загрузка новостей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>Ошибка: {error}</p>
          <button onClick={fetchArticles} className="retry-btn">
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <h1>Новости программирования (React)</h1>
      </header>

      <main className="articles-container">
        {articles.length === 0 ? (
          <div className="no-articles">Статей не найдено</div>
        ) : (
          <>
            <div className="articles-list">
              {articles.map((article) => (
                <article key={article.id} className="article-card">
                  <div className="article-header">
                    <h2 className="article-title">{article.title}</h2>
                    <time className="article-date">
                      {formatDate(article.published_at)}
                    </time>
                  </div>
                  
                  <div className="article-content">
                    {truncateContent(article.description)}
                  </div>
                  
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Читать полностью
                  </a>
                </article>
              ))}
            </div>

            <div className="pagination">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1 || loading}
                className="pagination-btn"
              >
                Назад
              </button>
              
              <span className="page-info">
                Страница {currentPage}
              </span>
              
              <button 
                onClick={handleNextPage} 
                disabled={articles.length < articlesPerPage || loading}
                className="pagination-btn"
              >
                Вперед
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Articles;