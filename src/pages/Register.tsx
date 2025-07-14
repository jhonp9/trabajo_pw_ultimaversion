import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/auth.service.front';
import VerificationModal from '../components/Auth/VerificationModal';
import { AuthLayout } from '../components/Auth/AuthLayout';
import AuthInput from '../components/Auth/AuthInput';
import { AuthButton } from '../components/Auth/AuthButton';

const Register = () => {
  const navigate = useNavigate();
  const [verificationModal, setVerificationModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

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
    terms: boolean;
  }) => {
    setRegisterError('');
    
    try {
      const username = values.username || `${values.firstName}${values.lastName}`.toLowerCase();
      
      const { success, message, requiresVerification } = await authService.registerUser({
        name: username,
        email: values.email,
        password: values.password
      });
      
      if (success && requiresVerification) {
        setPendingEmail(values.email);
        setVerificationModal(true);
      } else if (success) {
        navigate('/login', { state: { registered: true } });
      } else {
        setRegisterError(message || 'Error en el registro');
      }
    } catch (error: any) {
      setRegisterError(error.message || 'Error en el registro');
    }
  };

  useEffect(() => {
    if (verificationSuccess) {
      navigate('/login', { state: { verified: true } });
    }
  }, [verificationSuccess, navigate]);

   const handleVerification = async (code: string): Promise<boolean> => {
    try {
      const { success, message } = await authService.verifyRegistrationCode(
        pendingEmail, 
        code
      );
      
      if (success) {
        setVerificationModal(false);
        setVerificationSuccess(true);
        navigate('/login', { state: { verified: true } });
        return true;
      } else {
        setRegisterError(message || 'Código de verificación incorrecto');
        return false;
      }
    } catch (error: any) {
      setRegisterError(error.message || 'Error al verificar el código');
      return false;
    }
  };

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
        {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
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
                  name="firstName"
                  label="Nombre"
                  placeholder="Ej: Juan"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <AuthInput
                  type="text"
                  name="lastName"
                  label="Apellido"
                  placeholder="Ej: Pérez"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                  required
                />
              </div>
            </div>

            <AuthInput
              type="text"
              name="username"
              label="Nombre de Usuario"
              placeholder="Ej: juanplayer (opcional)"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
            />

            <AuthInput
              type="email"
              name="email"
              label="Correo Electrónico"
              placeholder="tucorreo@ejemplo.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              required
            />

            <AuthInput
              type="password"
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              required
            />

            <AuthInput
              type="password"
              name="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
              required
            />

            <AuthInput
              type="date"
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

            <AuthButton 
              type="submit"
              variant="primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
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
        onHide={() => {
          setVerificationModal(false);
          setRegisterError('');
        }}
        email={pendingEmail}
        onVerify={handleVerification}
        error={registerError}
      />
    </AuthLayout>
  );
};

export default Register;