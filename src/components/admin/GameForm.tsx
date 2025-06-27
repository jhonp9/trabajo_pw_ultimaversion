import { useState } from 'react';

const GameForm = ({ game, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: game.title || '',
    description: game.description || '',
    price: game.price || 0,
    oferta: game.oferta || '',
    // ...otros campos
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div className="form-group">
        <label>Título:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Descripción:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Descuento (%):</label>
          <input 
            type="text" 
            name="oferta" 
            value={formData.oferta} 
            onChange={handleChange} 
            placeholder="Ej: 10%"
          />
        </div>
      </div>
      
      {/* Más campos según necesidad */}
      
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default GameForm;