import { useAuth } from '../components/Auth/AuthContext';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, updateProfile, logout } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword && newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        updateProfile({
            name,
            email,
            password: newPassword || undefined
        });

        setSuccess('Perfil actualizado correctamente');
    };

    return (
        <div className="profile-page" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <Button variant="primary" onClick={() => navigate('/')}>
                        Volver
                </Button>
            </div>
            <div className="container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img 
                                src="/default-avatar.png" 
                                alt="Avatar" 
                                className="profile-avatar"
                            />
                            <h2 className="profile-name">{user?.name}</h2>
                            <p className="profile-email">{user?.email}</p>
                        </div>
                    </div>
                    
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Contraseña Actual (para cambios)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Dejar vacío si no quieres cambiar"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Dejar vacío si no quieres cambiar"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Dejar vacío si no quieres cambiar"
                                />
                            </div>
                            
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">
                                    Guardar Cambios
                                </button>
                                
                                <button 
                                    type="button" 
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                                            logout();
                                            navigate('/');
                                        }
                                    }}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;