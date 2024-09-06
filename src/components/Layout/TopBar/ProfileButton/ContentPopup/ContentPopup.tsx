import { removeUser } from '@/redux/features/user/user.slice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components';

interface ContentPopupProps {
   email: string;
}

export function ContentPopup({ email }: ContentPopupProps): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Methods
   const logoutApp = () => {
      localStorage.removeItem('user');

      dispatch(removeUser());
   };

   return (
      <div>
         <div className='h-fit w-fit max-w-[300px] flex flex-col gap-1 border-b-[1px] border-medium-gray pb-2 text-right'>
            <p className='font-semibold'>{email}</p>
         </div>

         <div className='mt-3 flex justify-end'>
            <Button onClick={logoutApp}>Cerrar sesión</Button>
         </div>
      </div>
   );
}
