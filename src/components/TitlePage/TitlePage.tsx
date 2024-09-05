interface TitlePageProps {
   title: string;
   subtitle?: string;
}

export function TitlePage({ title, subtitle }: TitlePageProps): JSX.Element {
   return (
      <div className='text-primary-gray'>
         <p className='text-[20px] font-semibold text-black'>{title}</p>

         <p>{subtitle}</p>
      </div>
   );
}
