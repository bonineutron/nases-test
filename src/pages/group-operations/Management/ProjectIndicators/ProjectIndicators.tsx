import { IResponseGetDataIndicators } from '@/services/routes/operations/operations.interface';
import operationsService from '@/services/routes/operations/operations.service';
import { formatNumberWithCommas } from '@/utilities/global.utility';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { TbPercentage } from 'react-icons/tb';
import { useEffect, useState } from 'react';

interface ProjectIndicatorsProps {
   ceco: string;
}

export function ProjectIndicators({ ceco }: ProjectIndicatorsProps): JSX.Element {
   // Configuration
   enum EModeCard {
      Money = 'money',
      Percentage = 'percentaje'
   }

   // States
   const [loading, setLoading] = useState<boolean>(false);

   const [data, setData] = useState<IResponseGetDataIndicators>({
      centroCosto: ceco,
      montoDelProyectoUSD: 0,
      montoDelProyectoMonedaLocal: 0,
      ingresosAcumulados: 0,
      ingresosAnnoActual: 0,
      ingresosProyectadosAnnoActual: 0,
      ingresosProyectadosAnnoPosterior: 0,
      ingresosProyectadosTotal: 0,
      costosAcumulados: 0,
      costosAnnoActual: 0,
      costosProyectadosAnnoActual: 0,
      costosProyectadosAnnoPosterior: 0,
      costosProyectadosTotal: 0,
      margenDeAperturaPorcentual: 0,
      margenAcumuladoPorcentual: 0,
      margenAnnoActualPorcentual: 0,
      margenProyectadoAnnoActualPorcentual: 0,
      margenProyectadoAnnoPosteriorPorcentual: 0,
      margenProyectadoDeCierrePorcentual: 0,
      margenDeAperturaMonetario: 0,
      margenAcumuladoMonetario: 0,
      margenAnnoActualMonetario: 0,
      margenProyectadoAnnoActualMonetario: 0,
      margenProyectadoAnnoPosteriorMonetario: 0,
      margenProyectadoDeCierreMonetario: 0
   });

   // Effects
   useEffect(() => {
      getDataIndicators();
   }, []);

   // Methods
   const getDataIndicators = async (): Promise<void> => {
      setLoading(true);

      const response: IResponseGetDataIndicators | null = await operationsService.getDataIndicators(ceco);

      if (response) {
         setData(response);
      }

      setLoading(false);
   };

   const cardIndicator = (
      mode: EModeCard,
      background: string,
      title: string,
      content: number,
      loading: boolean,
      subtitle?: string
   ) => {
      return (
         <div className='relative h-[140px] w-full max-w-[180px] shadow-md p-3 rounded-md flex flex-col justify-start gap-1 bg-white overflow-hidden text-primary-gray'>
            {!loading && (
               <>
                  <div className='flex items-center gap-2 min-h-[50px]'>
                     <div className={`p-1 rounded-full text-white ${background}`}>
                        {mode === EModeCard.Money && <RiMoneyDollarCircleLine className='text-[24px]' />}

                        {mode === EModeCard.Percentage && <TbPercentage className='text-[24px]' />}
                     </div>

                     <p className='w-full line-clamp-3 text-[14px] min-h-[63px] flex items-center'>{title}</p>
                  </div>

                  <div className='w-full text-center'>
                     <div className='w-full text-[24px] font-semibold flex items-center justify-center gap-1'>
                        {mode === EModeCard.Money && <p>$</p>}

                        <p>{mode === EModeCard.Money ? formatNumberWithCommas(content) : content}</p>

                        {mode === EModeCard.Percentage && <p>%</p>}
                     </div>

                     <p className='text-[14px]'>{subtitle}</p>
                  </div>
               </>
            )}

            {loading && <div className='absolute top-0 left-0 h-full w-full bg-medium-gray animate-pulse'></div>}
         </div>
      );
   };

   return (
      <div className='h-fit w-full flex flex-col gap-3'>
         <div className='h-fit w-full flex gap-3 justify-center flex-wrap border-[#015F93] border-[2px] rounded-md p-3'>
            {cardIndicator(
               EModeCard.Money,
               'bg-[#015F93]',
               'Monto del proyecto',
               data.montoDelProyectoUSD,
               loading,
               'USD'
            )}

            {cardIndicator(
               EModeCard.Money,
               'bg-[#015F93]',
               'Monto del proyecto',
               data.montoDelProyectoMonedaLocal,
               loading,
               'Moneda Local'
            )}
         </div>

         <div className='border-primary-color border-[2px] rounded-md py-3 px-3'>
            <div className='h-fit w-full max-w-[800px] flex gap-3 justify-center flex-wrap mx-auto'>
               {cardIndicator(
                  EModeCard.Money,
                  'bg-primary-color',
                  'Ingresos acumulados',
                  data.ingresosAcumulados,
                  loading
               )}

               {cardIndicator(EModeCard.Money, 'bg-primary-color', 'Costos acumulados', data.costosAcumulados, loading)}

               {cardIndicator(
                  EModeCard.Percentage,
                  'bg-primary-color',
                  'Margen Acumulado',
                  data.margenAcumuladoPorcentual,
                  loading
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-primary-color',
                  'Margen Acumulado',
                  data.margenAcumuladoMonetario,
                  loading
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-primary-color',
                  'Ingresos año actual',
                  data.ingresosAnnoActual,
                  loading,
                  'Real'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-primary-color',
                  'Costos año actual',
                  data.costosAnnoActual,
                  loading,
                  'Real'
               )}

               {cardIndicator(
                  EModeCard.Percentage,
                  'bg-primary-color',
                  'Margen Año Actual',
                  data.margenAnnoActualPorcentual,
                  loading,
                  'Real'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-primary-color',
                  'Margen Año Actual',
                  data.margenAnnoActualMonetario,
                  loading,
                  'Real'
               )}
            </div>
         </div>

         <div className='border-green-500 border-[2px] rounded-md py-3 px-3'>
            <div className='h-fit w-full max-w-[800px] flex gap-3 justify-center flex-wrap mx-auto'>
               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Proyección de ingresos',
                  data.ingresosProyectadosAnnoActual,
                  loading,
                  'Año actual'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Proyección de costos',
                  data.costosProyectadosAnnoActual,
                  loading,
                  'Año actual'
               )}

               {cardIndicator(
                  EModeCard.Percentage,
                  'bg-green-500',
                  'Margen Año Actual',
                  data.margenAnnoActualPorcentual,
                  loading,
                  'Real'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Margen Año Actual',
                  data.margenAnnoActualMonetario,
                  loading,
                  'Real'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Proyección de ingresos',
                  data.ingresosProyectadosAnnoPosterior,
                  loading,
                  'Años posteriores'
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Proyección de costos',
                  data.costosProyectadosAnnoPosterior,
                  loading,
                  'Años posteriores'
               )}

               {cardIndicator(
                  EModeCard.Percentage,
                  'bg-green-500',
                  'Margen proyectado de Cierre',
                  data.margenProyectadoDeCierrePorcentual,
                  loading
               )}

               {cardIndicator(
                  EModeCard.Money,
                  'bg-green-500',
                  'Margen proyectado de Cierre',
                  data.margenProyectadoDeCierreMonetario,
                  loading,
                  'Bruto'
               )}
            </div>
         </div>

         <div className='relative h-fit w-full flex gap-3 justify-center flex-wrap border-green-500 border-[2px] rounded-md p-3 pt-10'>
            <p className='absolute w-full top-2 left-3 text-green-500 font-semibold'>Cash Flow</p>

            {cardIndicator(EModeCard.Money, 'bg-green-500', 'Ingreso Real', 0, loading, 'Flujo')}

            {cardIndicator(EModeCard.Money, 'bg-green-500', 'Costo Real', 0, loading, 'Flujo')}

            {cardIndicator(EModeCard.Money, 'bg-green-500', 'Utilidad Real', 0, loading, 'Flujo')}

            {cardIndicator(EModeCard.Percentage, 'bg-green-500', 'Utilidad Real', 0, loading, 'Real')}
         </div>
      </div>
   );
}
