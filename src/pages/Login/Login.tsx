import { IResponseGetUserByEmail } from '@/services/routes/auth/auth.interface';
import { IUserApp } from '@/redux/features/user/user.interface';
import { updateUser } from '@/redux/features/user/user.slice';
import authService from '@/services/routes/auth/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useSetLocalStorage } from '@/hooks';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { Oval } from '@/components';
import axios from 'axios';

export function Login(): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   const navigate = useNavigate();

   // Redux states
   const { email } = useSelector((state: RootState) => state.user);

   // States
   const [loadingLoginApp, setLoadingLoginApp] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      if (email) {
         navigate('/home');
      }
   }, [email]);

   // Methods
   const loginGoogle = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
         const userInfoResponse = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
               headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            })
            .then((res) => res.data);

         await addPermissionsByMail({
            accessToken: tokenResponse.access_token ?? '',
            email: userInfoResponse.email ?? '',
            emailVerified: userInfoResponse.email_verified ?? null,
            familyName: userInfoResponse.family_name ?? '',
            givenName: userInfoResponse.given_name ?? '',
            hd: userInfoResponse.hd ?? '',
            name: userInfoResponse.name ?? '',
            picture: userInfoResponse.picture ?? '',
            sub: userInfoResponse.sub ?? '',
            permissions: null
         });
      },

      onError: (errorResponse) => {
         console.error('Error login google:', errorResponse);

         setLoadingLoginApp(false);
      },

      onNonOAuthError: (nonOAuthError) => {
         console.error('Error login google:', nonOAuthError);

         setLoadingLoginApp(false);
      }
   });

   const addPermissionsByMail = async (incompleteUser: IUserApp): Promise<void> => {
      const getUserByEmail: IResponseGetUserByEmail | null = await authService.getUserByEmail(incompleteUser.email);

      let fullUser = {
         ...incompleteUser
      };

      if (getUserByEmail && getUserByEmail.permisos) {
         fullUser = {
            ...fullUser,
            permissions: getUserByEmail.permisos
         };
      }

      const ttl: string = import.meta.env.VITE_TTL;

      useSetLocalStorage<IUserApp>('user', fullUser, ttl ? Number(ttl) : undefined);

      dispatch(updateUser(fullUser));

      setLoadingLoginApp(false);
   };

   const loginApp = (): void => {
      setLoadingLoginApp(true);

      loginGoogle();
   };

   return (
      <div className='relative h-full w-full'>
         <img src='/photographs/united-people.png' alt='united-people' className='h-full w-full object-cover' />

         <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
            <div className='p-6 bg-white rounded-md shadow-md mb-4 mx-4 flex flex-col gap-3 justify-between items-center text-primary-gray text-center'>
               <img
                  src='/global/chart-fundes-sinergy.svg'
                  alt='chart-fundes-sinergy'
                  className='h-auto w-[200px] md:w-[350px]'
               />

               <p className='font-semibold text-primary-color text-[18px]'>Sistema FUNDES Synergy</p>

               <p>Por favor inicie con Google para continuar</p>

               <button
                  onClick={loginApp}
                  className='relative h-[44px] w-fit px-3 border-[1px] border-primary-gray rounded-full flex items-center gap-1 font-semibold md:hover:bg-light-gray'>
                  <img src='/global/google-logo.webp' alt='google-logo' className='h-[24px] w-auto' />

                  <p>Iniciar sesión</p>

                  {loadingLoginApp && (
                     <div className='absolute top-0 left-0 h-full w-full rounded-full flex justify-center items-center bg-white'>
                        <Oval />
                     </div>
                  )}
               </button>
            </div>
         </div>

         <div className='absolute bottom-0 left-0 h-fit w-full bg-white px-6 py-2 text-primary-gray text-right rounded-t-md shadow-md'>
            © 2024, FUNDES Latinoamérica
         </div>
      </div>
   );
}
