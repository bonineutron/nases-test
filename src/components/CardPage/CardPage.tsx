interface CardPageProps {
   children: React.ReactNode;
   className?: string;
}

export function CardPage({ children, className }: CardPageProps): JSX.Element {
   return <div className={`h-fit w-full p-3 rounded-md shadow-md bg-white ${className ?? ''}`}>{children}</div>;
}
