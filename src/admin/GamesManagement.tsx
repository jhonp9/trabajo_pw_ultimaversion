import { useState, useEffect } from 'react';
import { getGames, addGame, updateGame, deleteGame } from '../api/analyticsApii';
import GameForm from '../components/admin/GameForm';

const GamesManagement = () => {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const data = await getGames();
    setGames(data);
  };

  const handleSubmit = async (gameData) => {
    if (editingGame) {
      await updateGame(editingGame.id, gameData);
    } else {
      await addGame(gameData);
    }
    fetchGames();
    setEditingGame(null);
  };

  const handleDelete = async (id) => {
    await deleteGame(id);
    fetchGames();
  };

  return (
    <div className="games-management">
      <h2>Administrar Juegos</h2>
      <button onClick={() => setEditingGame({})} className="btn-add">
        Agregar Nuevo Juego
      </button>
      
      {editingGame && (
        <GameForm 
          game={editingGame} 
          onSubmit={handleSubmit} 
          onCancel={() => setEditingGame(null)}
        />
      )}

      <div className="games-list">
        {games.map(game => (
          <div key={game.id} className="game-item">
            <img src={game.images[0]} alt={game.title} />
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>${game.price} {game.oferta && <span className="discount">-{game.oferta}</span>}</p>
            </div>
            <div className="game-actions">
              <button onClick={() => setEditingGame(game)}>Editar</button>
              <button onClick={() => handleDelete(game.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesManagement;