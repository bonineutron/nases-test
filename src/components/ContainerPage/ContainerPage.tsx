interface ContainerPageProps {
   children: React.ReactNode;
   className?: string;
}

export function ContainerPage({ children, className }: ContainerPageProps): JSX.Element {
   return <div className={`h-fit w-full flex flex-col gap-6 ${className ?? ''}`}>{children}</div>;
}
