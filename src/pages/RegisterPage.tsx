
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-bold">NetUp</h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Créez votre compte</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Et connectez-vous avec d'autres professionnels
        </p>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
