import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/auth.service';
import VerificationModal from '../components/Auth/VerificationModal';
import { useVerification } from '../hooks/useVerification';
import { AuthLayout } from '../components/Auth/AuthLayout';
import AuthInput from '../components/Auth/AuthInput';
import { AuthButton } from '../components/Auth/AuthButton';

const Register = () => {
  const navigate = useNavigate();
  const {
    verificationModal,
    pendingEmail,
    registerError,
    setRegisterError,
    verificationSuccess,
    setVerificationModal,
    startVerification,
    verifyCode,
    resendCode
  } = useVerification();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre es requerido'),
    lastName: Yup.string().required('Apellido es requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email es requerido')
      .test(
        'email-exists',
        'Este email ya está registrado',
        async (value) => {
          try {
            return !(await authService.checkEmailExists(value));
          } catch (error) {
            return false;
          }
        }
      ),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Debes confirmar tu contraseña'),
    terms: Yup.boolean()
      .oneOf([true], 'Debes aceptar los términos y condiciones')
  });

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    birthdate?: string;
    terms: boolean;
  }) => {
    setLoading(true);
    try {
      // Crear nombre de usuario combinando nombre y apellido si no se proporciona
      const username = values.username || `${values.firstName}${values.lastName}`.toLowerCase();
      
      const { success, message } = await authService.registerUser({
        name: username,
        email: values.email,
        password: values.password
      });
      
      if (success) {
        startVerification(values.email);
      } else {
        setRegisterError(message || 'Error en el registro');
      }
    } catch (error: any) {
      setRegisterError(error.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si la verificación fue exitosa
  useEffect(() => {
    if (verificationSuccess) {
      navigate('/login', { state: { verified: true } });
    }
  }, [verificationSuccess, navigate]);
  return (
    <AuthLayout title="Crear Cuenta">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          birthdate: '',
          terms: false
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="auth-form">
            {registerError && (
              <div className="alert alert-danger mb-3">
                {registerError}
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-3">
                <AuthInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="Nombre"
                  placeholder="Ej: Juan"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName && touched.firstName ? errors.firstName : ''}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <AuthInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Apellido"
                  placeholder="Ej: Pérez"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName && touched.lastName ? errors.lastName : ''}
                  required
                />
              </div>
            </div>

            <AuthInput
              type="text"
              id="username"
              name="username"
              label="Nombre de Usuario"
              placeholder="Ej: juanplayer (opcional)"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username ? errors.username : ''}
            />

            <AuthInput
              type="email"
              id="email"
              name="email"
              label="Correo Electrónico"
              placeholder="tucorreo@ejemplo.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? errors.email : ''}
              required
            />

            <AuthInput
              type="password"
              id="password"
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? errors.password : ''}
              required
            />

            <AuthInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
              required
            />

            <AuthInput
              type="date"
              id="birthdate"
              name="birthdate"
              label="Fecha de Nacimiento (opcional)"
              value={values.birthdate}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="auth-terms mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label className="form-check-label" htmlFor="terms">
                Acepto los <a href="#" className="terms-link">Términos y Condiciones</a>
              </label>
              {errors.terms && touched.terms && (
                <div className="error-message">{errors.terms}</div>
              )}
            </div>

            <AuthButton type="submit" variant="primary" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </AuthButton>

            <div className="auth-login-link text-center links">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                className="btn-link auth-link"
                onClick={() => navigate('/login')}
              >
                Inicia Sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <VerificationModal
        show={verificationModal}
        onHide={() => setVerificationModal(false)}
        email={pendingEmail}
        onVerify={verifyCode}
        onResend={resendCode}
        error={registerError}
      />
    </AuthLayout>
  );
};

export default Register;