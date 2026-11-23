import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ArticleList() {
  // 1. Declarer le triptyque d'etat (toujours initialiser articles avec [])
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Defi 2 : Categorie selectionnee pour le filtrage local
  const [categorieActive, setCategorieActive] = useState('Tous');

  // 2. Declencher la requete HTTP GET au montage du composant ([] = 1 seule fois)
  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const res = await api.get('/articles');
        setArticles(res.data); // Axios place le JSON recu dans res.data
      } catch (err) {
        setError('Impossible de contacter le serveur Express (port 5000).');
      } finally {
        setLoading(false); // Arrete le chargement dans tous les cas
      }
    }
    fetchArticles();
  }, []);

  // 3. Gardes d'affichage avant de parcourir articles.map()
  if (loading) return <p>Chargement des articles depuis Express...</p>;
  if (error) return <div style={{ color: 'red' }}>Erreur : {error}</div>;

  // Defi 2 : Filtrer le tableau deja recu (aucune nouvelle requete vers Express)
  const articlesFiltres = categorieActive === 'Tous'
    ? articles
    : articles.filter((a) => a.categorie === categorieActive);

  // 4. Affichage nominal une fois les donnees recues
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Catalogue des Articles ({articlesFiltres.length})</h2>
        <Link to="/nouveau" className="btn-primary">+ Nouvel Article</Link>
      </div>

      {/* Defi 2 : Les 4 boutons de filtrage par categorie */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['Tous', 'Architecture', 'Front-End', 'Back-End'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategorieActive(cat)}
            className={categorieActive === cat ? 'filter-btn active' : 'filter-btn'}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {articlesFiltres.map((article) => (
          <div key={article.id} className="card">
            <div>
              <span className="badge">{article.categorie}</span>
              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 6px' }}>{article.titre}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Auteur : {article.auteur}</p>
              <p style={{ marginTop: '10px', color: '#334155' }}>{article.contenu}</p>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              {/* Lien dynamique vers la route /articles/:id */}
              <Link to={`/articles/${article.id}`} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                Lire le detail &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
