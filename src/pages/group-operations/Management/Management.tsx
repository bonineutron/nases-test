import {
   Accordion,
   Breadcrumbs,
   Button,
   ContainerPage,
   Oval,
   RadioButtonsGroup,
   Select,
   TitlePage
} from '@/components';
import { IDataDetail, IFormManagement, IIncomeCost, IValuesIncomesToBeExecuted } from './Management.interface';
import { ICeco, ICecosByExecutor } from '@/services/routes/operations/operations.interface';
import operationsService from '@/services/routes/operations/operations.service';
import { ProjectIndicators } from './ProjectIndicators/ProjectIndicators';
import { TableIncomeCosts } from './TableIncomeCosts/TableIncomeCosts';
import { inputChange, inputError } from '@/utilities/global.utility';
import { TableAddIncomes } from './TableAddIncomes/TableAddIncomes';
import { CardDataDetail } from './CardDataDetail/CardDataDetail';
import { TableAddCosts } from './TableAddCosts/TableAddCosts';
import { GrDocumentPerformance } from 'react-icons/gr';
import CardPage from '@/components/CardPage/CardPage';
import { EOptionFilter } from './Management.enum';
import { TfiBarChart } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';

export function Management(): JSX.Element {
   // Configuration
   const filterOptions = [
      {
         value: EOptionFilter.Executor,
         label: 'Ejecutor'
      },
      {
         value: EOptionFilter.Ceco,
         label: 'Centro de costos'
      }
   ];

   const formVoid: IFormManagement = {
      executor: { value: '' },
      ceco: { value: '' }
   };

   // States
   const [filterActivated, setFilterActivated] = useState<number>(EOptionFilter.Executor);

   const [formManagement, setFormManagement] = useState<IFormManagement>(formVoid);

   const [loadingPage, setLoadingPage] = useState<boolean>(false);

   const [executors, setExecutors] = useState<string[]>([]);

   const [cecos, setCecos] = useState<ICeco[]>([]);

   const [responseGetCecos, setresponseGetCecos] = useState<ICecosByExecutor[]>([]);

   const [dataDetail, setDataDetail] = useState<IDataDetail | null>(null);

   const [rowsIncomes, setRowsIncomes] = useState<IIncomeCost[]>([]);

   const [rowsCosts, setRowsCosts] = useState<IIncomeCost[]>([]);

   const [valuesIncomesToBeExecuted, setValuesIncomesToBeExecuted] = useState<IValuesIncomesToBeExecuted | null>(null);

   const [reloadAccordion, setReloadAccordion] = useState<boolean>(false);

   const [reRenderSelect, setReRenderSelect] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      getCecos();
   }, []);

   useEffect(() => {
      setFormManagement(formVoid);

      if (filterActivated === EOptionFilter.Ceco && responseGetCecos.length > 0) {
         const cecos: ICeco[] = [];

         responseGetCecos.forEach((item) => {
            cecos.push(...item.cecos);
         });

         cecos.sort((a, b) => {
            const numA = parseInt(a.centroCostos.replace(/-/g, ''), 10);
            const numB = parseInt(b.centroCostos.replace(/-/g, ''), 10);
            return numA - numB;
         });

         setCecos(cecos);
      }
   }, [filterActivated]);

   useEffect(() => {
      setReRenderSelect(true);

      if (filterActivated === EOptionFilter.Executor && responseGetCecos.length > 0 && formManagement.executor.value) {
         setFormManagement({
            ...formManagement,
            ceco: { value: '' }
         });

         const filteredCeco = responseGetCecos.filter((ceco) => formManagement.executor.value === ceco.ejecutor)[0];

         setCecos(filteredCeco.cecos);
      }

      setTimeout(() => {
         setReRenderSelect(false);
      }, 50);
   }, [formManagement.executor.value]);

   useEffect(() => {
      if (responseGetCecos.length > 0) {
         const executors: string[] = [];

         const cecos: ICeco[] = [];

         responseGetCecos.forEach((item) => {
            executors.push(item.ejecutor);

            cecos.push(...item.cecos);
         });

         setExecutors(executors);

         setCecos(cecos);
      }
   }, [responseGetCecos]);

   useEffect(() => {
      if (reloadAccordion) {
         setReloadAccordion(false);
      }
   }, [reloadAccordion]);

   // Methods
   const validateForm = (): boolean => {
      let failed: boolean = false;

      if (filterActivated === EOptionFilter.Executor && !formManagement.executor.value) {
         inputError<IFormManagement>(setFormManagement, 'executor');

         failed = true;
      }

      if (!formManagement.ceco.value) {
         inputError<IFormManagement>(setFormManagement, 'ceco');

         failed = true;
      }

      return failed;
   };

   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (validateForm()) return;

      setLoadingPage(true);

      setDataDetail(null);

      const responseInfoCeco = await operationsService.getInfoCeco(formManagement.ceco.value);

      if (responseInfoCeco) {
         setDataDetail({
            dataName: {
               title: responseInfoCeco.descripcion ?? ''
            },
            dataId: {
               ceco: responseInfoCeco.centroCostos ?? ''
            },
            dataInfo: {
               hub: responseInfoCeco.hub ?? '',
               type: responseInfoCeco.fuenteIngresos ?? ''
            },
            dataLocation: {
               country: responseInfoCeco.pais ?? '',
               currency: responseInfoCeco.moneda ?? ''
            }
         });

         setValuesIncomesToBeExecuted({
            totalProjectAmount: responseInfoCeco.montoProyectoMonedaLocal ?? 0,
            projectedClosingMargin: responseInfoCeco.margenDeCierre ?? 0,
            hub: responseInfoCeco.hub ?? '',
            sourceIncome: responseInfoCeco.fuenteIngresos ?? ''
         });
      }

      const responseIncomesCosts = await operationsService.getIncomesCostsCeco(formManagement.ceco.value);

      if (responseIncomesCosts) {
         setRowsIncomes(
            responseIncomesCosts.incomes.map((income) => ({
               year: income.anno,
               description: income.descripcion,
               january: income.enero,
               february: income.febrero,
               march: income.marzo,
               april: income.abril,
               may: income.mayo,
               june: income.junio,
               july: income.julio,
               august: income.agosto,
               september: income.septiembre,
               october: income.octubre,
               november: income.noviembre,
               december: income.diciembre,
               total: income.total
            }))
         );

         setRowsCosts(
            responseIncomesCosts.costs.map((cost) => ({
               year: cost.anno,
               description: cost.descripcion,
               january: cost.enero,
               february: cost.febrero,
               march: cost.marzo,
               april: cost.abril,
               may: cost.mayo,
               june: cost.junio,
               july: cost.julio,
               august: cost.agosto,
               september: cost.septiembre,
               october: cost.octubre,
               november: cost.noviembre,
               december: cost.diciembre,
               total: cost.total
            }))
         );
      }

      setLoadingPage(false);
   };

   const getCecos = async (): Promise<void> => {
      const response = await operationsService.getAllCecos();

      if (response) {
         setresponseGetCecos(response);
      }
   };

   return (
      <ContainerPage>
         <Breadcrumbs
            links={[
               {
                  label: 'Operaciones',
                  icon: <TfiBarChart />,
                  to: ''
               },
               {
                  label: 'Gestión de ingresos y costos',
                  icon: <GrDocumentPerformance />,
                  to: '/operations/management'
               }
            ]}
         />

         <TitlePage
            title='Gestión de ingresos y costos'
            subtitle='Este panel te proporciona una visión clara y concisa de las ventajas generadas durante el año del curso.'
         />

         <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
            <div className='w-full flex flex-wrap gap-3 items-center justify-between'>
               <RadioButtonsGroup
                  label='Fitrar por:'
                  value={filterActivated}
                  setValue={setFilterActivated}
                  options={filterOptions}
               />

               {filterActivated !== EOptionFilter.Ceco && (
                  <Select
                     label='Ejecutor'
                     options={executors.map((executor) => ({
                        label: executor,
                        value: executor
                     }))}
                     value={formManagement.executor.value}
                     onChange={(event) => {
                        inputChange<IFormManagement, string>(setFormManagement, 'executor', event.value);
                     }}
                     error={formManagement.executor.error}
                     customWidth='320px'
                     newSelect
                  />
               )}

               {!reRenderSelect && (
                  <Select
                     label='Centro de costos'
                     options={cecos.map((ceco) => ({
                        label: `${ceco.centroCostos} : ${ceco.descripcion}`,
                        value: ceco.centroCostos
                     }))}
                     value={formManagement.ceco.value}
                     onChange={(event) => {
                        inputChange<IFormManagement, string>(setFormManagement, 'ceco', event.value);
                     }}
                     error={formManagement.ceco.error}
                     disabled={
                        filterActivated === EOptionFilter.Executor
                           ? formManagement.executor.value
                              ? false
                              : true
                           : false
                     }
                     customWidth='320px'
                     newSelect
                  />
               )}
            </div>

            <Button icon={<HiSearch />} submit>
               Buscar
            </Button>
         </form>

         {dataDetail && (
            <>
               {dataDetail && <CardDataDetail data={dataDetail} />}

               <Accordion title='Ingresos Ejecutados'>
                  <TableIncomeCosts rows={rowsIncomes} />
               </Accordion>

               <Accordion title='Costos Ejecutados'>
                  <TableIncomeCosts rows={rowsCosts} />
               </Accordion>

               <Accordion title='Ingresos por Ejecutar'>
                  <TableAddIncomes
                     ceco={formManagement.ceco.value}
                     values={valuesIncomesToBeExecuted}
                     setReloadAccordion={setReloadAccordion}
                  />
               </Accordion>

               <Accordion title='Costos por Ejecutar'>
                  <TableAddCosts
                     ceco={formManagement.ceco.value}
                     setReloadAccordion={setReloadAccordion}
                     showAdditionalRows={dataDetail.dataLocation.currency.toLowerCase() === 'usd' ? true : false}
                  />
               </Accordion>

               <Accordion title='Resumen Indicadores del Proyecto'>
                  {!reloadAccordion ? (
                     <ProjectIndicators ceco={formManagement.ceco.value} />
                  ) : (
                     <div className='h-[1000px]'></div>
                  )}
               </Accordion>
            </>
         )}

         {!dataDetail && (
            <CardPage className='h-fit min-h-[300px] md:px-[200px] flex flex-col justify-center items-center gap-6 text-center text-primary-gray'>
               {!loadingPage && (
                  <>
                     <p className='text-[18px]'>
                        Por favor, elige un Centro de Costos para comenzar, y navega a través de nuestras opciones
                        utilizando el menú desplegable o los filtros disponibles.
                     </p>

                     <p className='text-primary-color'>
                        Si necesitas ayuda o tienes alguna pregunta, no dudes en escribirnos al correo
                        soporte@fundes.org. Estamos aquí para ayudarte en cualquier momento.
                     </p>
                  </>
               )}

               {loadingPage && <Oval size={60} />}
            </CardPage>
         )}
      </ContainerPage>
   );
}
