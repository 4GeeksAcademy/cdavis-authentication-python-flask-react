import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Private = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aquí podrías realizar una solicitud al backend para verificar la autenticación del usuario
        // Por simplicidad, asumiré que ya tienes la información del usuario en sesión en sessionStorage
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
    if (!user && !loading) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container">
            <h2>Private</h2>
            <p>Bienvenido, {user && user.email}!</p>
            <p>Este contenido solo está disponible para usuarios autenticados.</p>
        </div>
    );
};

export default Private;
