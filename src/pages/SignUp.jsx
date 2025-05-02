import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    birthday: '',
    user_Country: '',
    roles: []
  });
  
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar países al montar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://tu-backend/api/countries'); // Ajusta esta URL
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error('Error al cargar países:', err);
      } finally {
        setLoadingCountries(false);
      }
    };
    
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://tu-backend/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(formData.phone_number && { phone_number: formData.phone_number }),
          ...(formData.birthday && { birthday: formData.birthday }),
          ...(formData.user_Country && { user_Country: formData.user_Country }),
          roles: formData.roles
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      navigate('/login', { state: { success: '¡Registro exitoso! Por favor inicia sesión.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Campos obligatorios */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength="3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </Form.Group>

            {/* Campos opcionales */}
            <Form.Group className="mb-3">
              <Form.Label>País (opcional)</Form.Label>
              {loadingCountries ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Form.Select
                  name="user_Country"
                  value={formData.user_Country}
                  onChange={handleChange}
                >
                  <option value="">Selecciona tu país</option>
                  {countries.map(country => (
                    <option key={country.iso} value={country.iso}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono (opcional)</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Ej: +56912345678"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Selector de roles (opcional) */}
            <Form.Group className="mb-3">
              <Form.Label>Rol (opcional)</Form.Label>
              <Form.Select
                name="roles"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  roles: [e.target.value]
                }))}
                value={formData.roles[0] || ''}
              >
                <option value="">Selecciona un rol</option>
                <option value="COMPRADOR">Comprador</option>
                <option value="VENDEDOR">Vendedor</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading || loadingCountries}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </Button>
            </div>
          </Form>

          <div className="mt-3 text-center">
            <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;