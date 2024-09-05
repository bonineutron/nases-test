import CardPage from '../CardPage/CardPage';

export function MessageModuleInProgress() {
   return (
      <CardPage className='flex flex-col items-center py-6 gap-3'>
         <p>Esta sección aún no está disponible. Estamos trabajando en ella para lanzarla pronto.</p>

         <img src='/global/developer.png' alt='developer' className='h-auto w-[200px]' />
      </CardPage>
   );
}
