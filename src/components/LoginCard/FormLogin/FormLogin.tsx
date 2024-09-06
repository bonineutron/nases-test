import { signInWithEmailAndPassword, UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { InputPassword } from '@/components/InputPassword/InputPassword';
import { inputChange, inputError } from '@/utilities/global.utility';
import { IUserApp } from '@/redux/features/user/user.interface';
import { updateUser } from '@/redux/features/user/user.slice';
import { IFormLogin } from '../LoginCard.interface';
import { Button } from '@/components/Button/Button';
import { FirebaseAuth } from '@/firebase/config';
import { Input } from '@/components/Input/Input';
import { useSetLocalStorage } from '@/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

export function FormLogin(): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // States
   const [formLogin, setFormLogin] = useState<IFormLogin>({
      email: { value: '' },
      password: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      try {
         const responseCreateUserByEmail: UserCredential = await signInWithEmailAndPassword(
            FirebaseAuth,
            formLogin.email.value,
            formLogin.password.value
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
         }
      } catch (error: any) {
         if (error.code === 'auth/invalid-credential') {
            dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Credenciales incorrectas' }));
         }

         if (error.code !== 'auth/invalid-credential') {
            dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Ha ocurrido un error' }));
         }
      }

      setLoadingSubmit(false);
   };

   const handleLoginGoogle = async (): Promise<void> => {
      const provider = new GoogleAuthProvider();

      try {
         const responseLoginGoogle = await signInWithPopup(FirebaseAuth, provider);

         if (responseLoginGoogle.user) {
            const userCredentials = responseLoginGoogle.user;

            const accessToken = await userCredentials.getIdToken();

            const user = {
               accessToken: accessToken,
               email: userCredentials.email ?? '',
               picture: userCredentials.photoURL ?? ''
            };

            useSetLocalStorage<IUserApp>('user', user);

            dispatch(updateUser(user));
         }
      } catch (error) {
         console.error(error);
      }
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formLogin.email.value) {
         inputError<IFormLogin>(setFormLogin, 'email');

         failed = true;
      }

      if (!formLogin.password.value) {
         inputError<IFormLogin>(setFormLogin, 'password');

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
            value={formLogin.email.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'email', event.target.value);
            }}
            error={formLogin.email.error}
            errorMessage={formLogin.email.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formLogin.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'password', event.target.value);
            }}
            error={formLogin.password.error}
            errorMessage={formLogin.password.errorMessage}
         />

         <div className='w-full flex justify-end mt-2'>
            <Button submit={true} loading={loadingSubmit} fullWidth>
               Ingresar
            </Button>
         </div>

         <div className='w-full flex items-center justify-end gap-2 pt-4'>
            <p className='text-[14px] pb-1'>Ingresar con:</p>

            <button
               type='button'
               onClick={handleLoginGoogle}
               className='border-gray-400 border-[1px] rounded-full px-3 py-1 flex items-center justify-center hover:bg-gray-200 transition-all'>
               <img src='/global/google.webp' alt='google' className='h-[24px] w-auto mt-1' />
            </button>
         </div>
      </form>
   );
}
