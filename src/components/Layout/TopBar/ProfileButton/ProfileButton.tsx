import { EPlacement } from '@/components/Popup/Popup.enum';
import { ContentPopup } from './ContentPopup/ContentPopup';
import { Popup } from '@/components/Popup/Popup';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function ProfileButton(): JSX.Element {
   // Redux states
   const { name, email, picture } = useSelector((state: RootState) => state.user);

   return (
      <Popup content={<ContentPopup name={name} email={email} />} placement={EPlacement.BottomEnd}>
         <img src={picture} alt='picture-profile' className='h-[40px] w-[40px] rounded-full shadow-md' />
      </Popup>
   );
}
