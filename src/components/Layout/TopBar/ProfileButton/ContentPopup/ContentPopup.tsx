import { removeUser } from '@/redux/features/user/user.slice';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { Button } from '@/components';

interface ContentPopupProps {
   name: string;
   email: string;
}

export function ContentPopup({ name, email }: ContentPopupProps): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Methods
   const logoutApp = () => {
      googleLogout();

      localStorage.removeItem('user');

      dispatch(removeUser());
   };

   return (
      <div>
         <div className='h-fit w-fit max-w-[300px] flex flex-col gap-1 border-b-[1px] border-medium-gray pb-2 text-right'>
            <p className='font-semibold'>{name}</p>

            <p className='text-[14px] text-primary-gray'>{email}</p>
         </div>

         <div className='mt-3 flex justify-end'>
            <Button onClick={logoutApp}>Cerrar sesión</Button>
         </div>
      </div>
   );
}
