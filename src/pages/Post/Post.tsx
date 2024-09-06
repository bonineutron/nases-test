import { ContainerPage, FormPost, TitlePage } from '@/components';

export function Post(): JSX.Element {
   return (
      <ContainerPage>
         <TitlePage
            title='Publicar imágenes'
            subtitle='Cargar y compartir imágenes fácilmente a través de la plataforma.'
         />

         <FormPost />
      </ContainerPage>
   );
}
