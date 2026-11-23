import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function ArticleDetail() {
  const { id } = useParams(); // 1. Lit le segment :id dans l'URL (/articles/2 -> "2")
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOne() {
      try {
        const res = await api.get(`/articles/${id}`); // 2. Requete GET ciblee
        setArticle(res.data);
      } finally {
        setLoading(false);
      }
    }
    fetchOne();
  }, [id]);

  // Defi 1 : Supprimer l'article (DELETE) puis revenir a la liste
  const handleDelete = async () => {
    await api.delete(`/articles/${id}`);
    navigate('/articles');
  };

  if (loading) return <p>Chargement...</p>;

  if (!article) {
    return (
      <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '8px', color: '#b91c1c' }}>
        <h3>Article #{id} introuvable.</h3>
        <Link to="/articles" style={{ color: '#2563eb', display: 'inline-block', marginTop: '10px' }}>&larr; Retour au catalogue</Link>
      </div>
    );
  }

  return (
    <article style={{ background: 'white', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <span className="badge">{article.categorie}</span>
      <h1 style={{ fontSize: '1.8rem', margin: '12px 0 8px' }}>{article.titre}</h1>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Par <strong>{article.auteur}</strong> &bull; ID #{article.id}</p>
      <p style={{ lineHeight: 1.7, color: '#1e293b' }}>{article.contenu}</p>
      <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/articles" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>&larr; Retour a la liste</Link>
        <button onClick={handleDelete} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          Supprimer
        </button>
      </div>
    </article>
  );
}
