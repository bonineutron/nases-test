import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
   links: {
      label: string;
      icon: JSX.Element;
      to?: string;
   }[];
}

export function Breadcrumbs({ links }: BreadcrumbsProps): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   return (
      <div className='h-fit w-full flex gap-3 text-nowrap overflow-y-auto'>
         {links &&
            links.map((link, index) => (
               <Link
                  key={index}
                  to={link.to ?? ''}
                  className={`flex gap-1 items-center text-primary-gray hover:text-primary-color ${
                     pathname === link.to ? 'font-semibold' : ''
                  }`}>
                  <span>/</span>

                  <p className='min-w-[16px] text-[16px]'>{link.icon}</p>

                  <p className='text-[14px]'>{link.label}</p>
               </Link>
            ))}
      </div>
   );
}
