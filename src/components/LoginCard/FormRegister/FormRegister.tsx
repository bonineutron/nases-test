import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { InputPassword } from '@/components/InputPassword/InputPassword';
import { inputChange, inputError } from '@/utilities/global.utility';
import { IUserApp } from '@/redux/features/user/user.interface';
import { updateUser } from '@/redux/features/user/user.slice';
import { IFormRegister } from '../LoginCard.interface';
import { Button } from '@/components/Button/Button';
import { FirebaseAuth } from '@/firebase/config';
import { Input } from '@/components/Input/Input';
import { useSetLocalStorage } from '@/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

export function FormRegister(): JSX.Element {
   // States
   const [formRegister, setFormRegister] = useState<IFormRegister>({
      email: { value: '' },
      password: { value: '' },
      confirmPassword: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
   // Configuration
   const dispatch = useDispatch();

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      try {
         const responseCreateUserByEmail: UserCredential = await createUserWithEmailAndPassword(
            FirebaseAuth,
            formRegister.email.value,
            formRegister.password.value
         );

         if (responseCreateUserByEmail.user) {
            const userCredentials = responseCreateUserByEmail.user;

            const accessToken = await userCredentials.getIdToken();

            const user = {
               accessToken: accessToken,
               email: userCredentials.email ?? '',
               picture: userCredentials.photoURL ?? ''
            };

            useSetLocalStorage<IUserApp>('user', user);

            dispatch(updateUser(user));

            dispatch(openAlert({ type: ETypeAlertDialog.Success, description: 'Usuario creado exitosamente' }));
         }
      } catch (error: any) {
         if (error.code === 'auth/email-already-in-use') {
            dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'La dirección de correo ya esta en uso' }));
         }

         if (error.code === 'auth/invalid-email') {
            dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Dirección de correo no valida' }));
         }

         if (error.code === 'auth/weak-password') {
            dispatch(
               openAlert({ type: ETypeAlertDialog.Error, description: 'Contraseña insegura, agrega más caracteres' })
            );
         }

         if (
            error.code !== 'auth/invalid-email' &&
            error.code !== 'auth/weak-password' &&
            error.code !== 'auth/email-already-in-use'
         ) {
            dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Ha ocurrido un error' }));
         }
      }

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formRegister.email.value) {
         inputError<IFormRegister>(setFormRegister, 'email');

         failed = true;
      }

      if (!formRegister.password.value) {
         inputError<IFormRegister>(setFormRegister, 'password');

         failed = true;
      }

      if (!formRegister.confirmPassword.value) {
         inputError<IFormRegister>(setFormRegister, 'confirmPassword');

         failed = true;
      }

      if (
         formRegister.password.value &&
         formRegister.confirmPassword.value &&
         formRegister.password.value !== formRegister.confirmPassword.value
      ) {
         dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'No coinciden las contraseñas' }));

         failed = true;
      }

      return failed;
   };

   return (
      <form onSubmit={handleSubmit} className='w-full'>
         <Input
            id='email-galeria'
            name='email-galeria'
            type='email'
            label='Email'
            value={formRegister.email.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'email', event.target.value);
            }}
            error={formRegister.email.error}
            errorMessage={formRegister.email.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formRegister.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'password', event.target.value);
            }}
            error={formRegister.password.error}
            errorMessage={formRegister.password.errorMessage}
         />

         <InputPassword
            id='confirm-galeria-password'
            label='Confirmar constraseña'
            value={formRegister.confirmPassword.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'confirmPassword', event.target.value);
            }}
            error={formRegister.confirmPassword.error}
            errorMessage={formRegister.confirmPassword.errorMessage}
         />

         <div className='w-full flex justify-end mt-2'>
            <Button submit={true} loading={loadingSubmit} fullWidth>
               Registrarse
            </Button>
         </div>
      </form>
   );
}
