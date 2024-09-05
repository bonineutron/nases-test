import {
   IFormReportConsultProjects,
   IFormReportCostsProjectedMonthly,
   IFormReportIncomesCosts,
   ISelectedReportType
} from './Report.interface';
import {
   IResponseGetCecosByState,
   IResponseGetReportConsultProjects,
   IResponseGetReportCostsProjectedMontly,
   IResponseGetReportIncomesCosts
} from '@/services/routes/reports/reports.interface';
import { Breadcrumbs, Button, ContainerPage, Input, Oval, RadioButtonsGroup, Select, TitlePage } from '@/components';
import { ReportCostsProjectedMonthly } from './ReportCostsProjectedMonthly/ReportCostsProjectedMonthly';
import { EAreasReportIncomesCosts, EReportConsultProjects, EReportType } from './Report.enum';
import { generateCustomYearList, inputChange, inputError } from '@/utilities/global.utility';
import { ReportConsultProjects } from './ReportConsultProjects/ReportConsultProjects';
import { ReportIncomesCosts } from './ReportIncomesCosts/ReportIncomesCosts';
import reportsService from '@/services/routes/reports/reports.service';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import CardPage from '@/components/CardPage/CardPage';
import { TfiBarChart } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';

export function Report(): JSX.Element {
   // Configuration
   const optionsReportTypes = [
      { value: EReportType.CurrentIncomesCosts, label: 'Reporte ingresos/costos año actual' },
      { value: EReportType.ConsultProjects, label: 'Reporte consulta proyectos' },
      { value: EReportType.CostsProjectedMonthly, label: 'Reporte costos proyectados por mes' }
   ];

   const optionsAreasReportIncomesCosts = [
      {
         value: EAreasReportIncomesCosts.Consultancy,
         label: 'Consultoría'
      },
      { value: EAreasReportIncomesCosts.Catalyst, label: 'Catalyst' }
   ];

   const optionsAreasReportCostsProjectedMonthly = [
      {
         value: EAreasReportIncomesCosts.Consultancy,
         label: 'Consultoría'
      },
      { value: EAreasReportIncomesCosts.Catalyst, label: 'Catalyst' }
   ];

   const optionsStateCECO = [
      { value: 'ABIERTO', label: 'Abierto' },
      { value: 'CERRADO', label: 'Cerrado' }
   ];

   const optionsTypesReportConsultProjects = [
      { value: 'INGRESO', label: 'Ingreso' },
      { value: 'COSTO', label: 'Costo' },
      { value: 'AMBOS', label: 'Ingreso y Costo' }
   ];

   const filterOptions = [
      {
         value: EReportConsultProjects.Consolidated,
         label: 'Consolidado'
      },
      {
         value: EReportConsultProjects.Detailed,
         label: 'Detallado'
      }
   ];

   // States
   const [selectedReportType, setSelectedReportType] = useState<ISelectedReportType>({
      type: { value: null }
   });

   const [formReportIncomesCosts, setFormReportIncomesCosts] = useState<IFormReportIncomesCosts>({
      area: { value: null },
      year: { value: null }
   });

   const [formReportConsultProjects, setFormReportConsultProjects] = useState<IFormReportConsultProjects>({
      period: { value: '' },
      cecos: { value: null },
      report: '',
      state: { value: null },
      type: { value: null }
   });

   const [formReportCostsProjectedMonthly, setFormReportCostsProjectedMonthly] =
      useState<IFormReportCostsProjectedMonthly>({
         area: { value: null }
      });

   const [filterActivated, setFilterActivated] = useState<number>(EReportConsultProjects.Consolidated);

   const [loadingPage, setLoadingPage] = useState<boolean>(false);

   const [responseReportIncomesCosts, setResponseReportIncomesCosts] = useState<
      IResponseGetReportIncomesCosts[] | null
   >(null);

   const [responseReportConsultProjects, setResponseReportConsultProjects] = useState<
      IResponseGetReportConsultProjects[] | null
   >(null);

   const [responseReportCostsProjectedMonthly, setResponseReportCostsProjectedMonthly] = useState<
      IResponseGetReportCostsProjectedMontly[] | null
   >(null);

   const [responseCecosByState, setResponseCecosByState] = useState<IResponseGetCecosByState[]>([]);

   const [reportStateToTable, setReportStateToTable] = useState<string>('C');

   // Effects
   useEffect(() => {
      if (formReportConsultProjects.state.value) {
         getCecosByState(formReportConsultProjects.state.value);
      }
   }, [formReportConsultProjects.state.value]);

   useEffect(() => {
      setFormReportConsultProjects({
         ...formReportConsultProjects,
         report: filterActivated === 1 ? 'C' : 'D'
      });
   }, [filterActivated]);

   useEffect(() => {
      setFormReportIncomesCosts({
         area: { value: null },
         year: { value: null }
      });

      setFormReportConsultProjects({
         period: { value: '' },
         cecos: { value: null },
         report: 'C',
         state: { value: null },
         type: { value: null }
      });

      setFormReportCostsProjectedMonthly({
         area: { value: null }
      });

      clearRows();
   }, [selectedReportType]);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (!selectedReportType.type.value) {
         inputError<ISelectedReportType>(setSelectedReportType, 'type');

         return;
      }

      if (selectedReportType.type.value === EReportType.CurrentIncomesCosts) {
         if (validateFormReportIncomesCosts()) return;

         if (formReportIncomesCosts.area.value && formReportIncomesCosts.year.value) {
            setLoadingPage(true);

            clearRows();

            const responseReportIncomesCosts = await reportsService.getReportIncomesCosts({
               anno: formReportIncomesCosts.year.value,
               areaDeNegocio: formReportIncomesCosts.area.value
            });

            setResponseReportIncomesCosts(responseReportIncomesCosts);

            setLoadingPage(false);
         }
      }

      if (selectedReportType.type.value === EReportType.ConsultProjects) {
         if (validateFormConsultProjects()) return;

         if (
            formReportConsultProjects.period.value &&
            formReportConsultProjects.state.value &&
            formReportConsultProjects.cecos.value &&
            formReportConsultProjects.type.value
         ) {
            setLoadingPage(true);

            clearRows();

            const responseReportIncomesCosts = await reportsService.getReportConsultProjects({
               consolidadoDetallado: formReportConsultProjects.report,
               periodo: formReportConsultProjects.period.value,
               centroCostos: formReportConsultProjects.cecos.value,
               tipoIngresoCosto: formReportConsultProjects.type.value
            });

            setReportStateToTable(formReportConsultProjects.report);

            setResponseReportConsultProjects(responseReportIncomesCosts);

            setLoadingPage(false);
         }
      }

      if (selectedReportType.type.value === EReportType.CostsProjectedMonthly) {
         if (validateFormReportCostsProjectedMonthly()) return;

         if (formReportCostsProjectedMonthly.area.value) {
            setLoadingPage(true);

            clearRows();

            const response = await reportsService.getReportCostsProjectedMonthly(
               formReportCostsProjectedMonthly.area.value
            );

            setResponseReportCostsProjectedMonthly(response);

            setLoadingPage(false);
         }
      }
   };

   const clearRows = () => {
      setResponseReportIncomesCosts(null);
      setResponseReportConsultProjects(null);
      setResponseReportCostsProjectedMonthly(null);
   };

   const validateFormReportIncomesCosts = (): boolean => {
      let failed: boolean = false;

      if (!formReportIncomesCosts.area.value) {
         inputError<IFormReportIncomesCosts>(setFormReportIncomesCosts, 'area');

         failed = true;
      }

      if (!formReportIncomesCosts.year.value) {
         inputError<IFormReportIncomesCosts>(setFormReportIncomesCosts, 'year');

         failed = true;
      }

      return failed;
   };

   const validateFormConsultProjects = (): boolean => {
      let failed: boolean = false;

      if (!formReportConsultProjects.period.value) {
         inputError<IFormReportConsultProjects>(setFormReportConsultProjects, 'period');

         failed = true;
      }

      if (!formReportConsultProjects.state.value) {
         inputError<IFormReportConsultProjects>(setFormReportConsultProjects, 'state');

         failed = true;
      }

      if (!formReportConsultProjects.cecos.value) {
         inputError<IFormReportConsultProjects>(setFormReportConsultProjects, 'cecos');

         failed = true;
      }

      if (!formReportConsultProjects.type.value) {
         inputError<IFormReportConsultProjects>(setFormReportConsultProjects, 'type');

         failed = true;
      }

      return failed;
   };

   const validateFormReportCostsProjectedMonthly = (): boolean => {
      let failed: boolean = false;

      if (!formReportCostsProjectedMonthly.area.value) {
         inputError<IFormReportCostsProjectedMonthly>(setFormReportCostsProjectedMonthly, 'area');

         failed = true;
      }

      return failed;
   };

   const getCecosByState = async (state: string): Promise<void> => {
      setResponseCecosByState([]);

      setFormReportConsultProjects({
         ...formReportConsultProjects,
         cecos: { value: null }
      });

      const response = await reportsService.getCecosByState(state);

      if (response && response.length > 0) {
         setResponseCecosByState(response);
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
                  icon: <HiOutlineClipboardDocumentList />,
                  to: '/operations/report'
               }
            ]}
         />

         <TitlePage
            title='Reporte Operaciones'
            subtitle='Este panel te proporciona una visión clara y concisa de las ventas generadas durante el año en curso.'
         />

         <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3 z-[2]'>
            <div className='w-full flex flex-wrap gap-x-3 items-center justify-between'>
               <Select
                  label='Reportes Disponibles'
                  options={optionsReportTypes}
                  value={selectedReportType.type.value ?? ''}
                  onChange={(event) => {
                     inputChange<ISelectedReportType, string>(setSelectedReportType, 'type', event.value);
                  }}
                  error={selectedReportType.type.error}
                  customWidth='340px'
                  newSelect
               />

               {selectedReportType.type.value === EReportType.CurrentIncomesCosts && (
                  <>
                     <Select
                        label='Área de Negocio'
                        options={optionsAreasReportIncomesCosts}
                        value={formReportIncomesCosts.area.value ?? ''}
                        onChange={(event) => {
                           inputChange<IFormReportIncomesCosts, string>(setFormReportIncomesCosts, 'area', event.value);
                        }}
                        error={formReportIncomesCosts.area.error}
                        customWidth='340px'
                        newSelect
                     />

                     <Select
                        label='Año'
                        options={generateCustomYearList(2021, 2027).map((year) => ({
                           value: String(year),
                           label: String(year)
                        }))}
                        value={formReportIncomesCosts.year.value ? String(formReportIncomesCosts.year.value) : ''}
                        onChange={(event) => {
                           inputChange<IFormReportIncomesCosts, number>(
                              setFormReportIncomesCosts,
                              'year',
                              Number(event.value)
                           );
                        }}
                        error={formReportIncomesCosts.year.error}
                        customWidth='340px'
                        newSelect
                     />
                  </>
               )}

               {selectedReportType.type.value === EReportType.ConsultProjects && (
                  <>
                     <Select
                        label='Estado CECO'
                        options={optionsStateCECO}
                        value={formReportConsultProjects.state.value ?? ''}
                        onChange={(event) => {
                           inputChange<IFormReportConsultProjects, string>(
                              setFormReportConsultProjects,
                              'state',
                              event.value
                           );
                        }}
                        error={formReportConsultProjects.state.error}
                        customWidth='340px'
                        newSelect
                     />

                     <Input
                        type='date'
                        label='Periodo'
                        value={formReportConsultProjects.period.value}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           inputChange<IFormReportConsultProjects, string>(
                              setFormReportConsultProjects,
                              'period',
                              event.target.value
                           );
                        }}
                        error={formReportConsultProjects.period.error}
                        errorMessage={formReportConsultProjects.period.errorMessage}
                        customWidth='340px'
                        outlined
                     />

                     {formReportConsultProjects.state.value && (
                        <>
                           <Select
                              label='Centro de costos'
                              value={
                                 formReportConsultProjects.cecos.value
                                    ? formReportConsultProjects.cecos.value.map((item) => item)
                                    : []
                              }
                              options={responseCecosByState.map((ceco) => ({
                                 value: ceco.centroCostos,
                                 label: `${ceco.centroCostos} : ${ceco.descripcion}`
                              }))}
                              onChange={(event) => {
                                 if (event.length === 0) {
                                    inputChange<IFormReportConsultProjects, null>(
                                       setFormReportConsultProjects,
                                       'cecos',
                                       null
                                    );
                                    return;
                                 }
                                 inputChange<IFormReportConsultProjects, string[]>(
                                    setFormReportConsultProjects,
                                    'cecos',
                                    event.map((item: any) => item.value)
                                 );
                              }}
                              error={formReportConsultProjects.cecos.error}
                              customWidth='340px'
                              newSelect
                              multiple
                           />

                           <Select
                              label='Tipo (ingreso/costo)'
                              options={optionsTypesReportConsultProjects}
                              value={formReportConsultProjects.type.value ?? ''}
                              onChange={(event) => {
                                 inputChange<IFormReportConsultProjects, string>(
                                    setFormReportConsultProjects,
                                    'type',
                                    event.value
                                 );
                              }}
                              error={formReportConsultProjects.type.error}
                              customWidth='340px'
                              newSelect
                           />

                           <div className='w-[340px]'>
                              <RadioButtonsGroup
                                 label='Ver reporte:'
                                 value={filterActivated}
                                 setValue={setFilterActivated}
                                 options={filterOptions}
                              />
                           </div>
                        </>
                     )}
                  </>
               )}

               {selectedReportType.type.value === EReportType.CostsProjectedMonthly && (
                  <>
                     <Select
                        label='Área de Negocio'
                        options={optionsAreasReportCostsProjectedMonthly}
                        value={formReportCostsProjectedMonthly.area.value ?? ''}
                        onChange={(event) => {
                           inputChange<IFormReportCostsProjectedMonthly, string>(
                              setFormReportCostsProjectedMonthly,
                              'area',
                              event.value
                           );
                        }}
                        error={formReportCostsProjectedMonthly.area.error}
                        customWidth='340px'
                        newSelect
                     />
                  </>
               )}
            </div>

            <Button icon={<HiSearch />} submit>
               Buscar
            </Button>
         </form>

         {responseReportIncomesCosts && <ReportIncomesCosts rows={responseReportIncomesCosts} />}

         {responseReportConsultProjects && (
            <ReportConsultProjects rows={responseReportConsultProjects} report={reportStateToTable} />
         )}

         {responseReportCostsProjectedMonthly && (
            <ReportCostsProjectedMonthly
               rows={responseReportCostsProjectedMonthly.map((row) => ({
                  ...row,
                  enero: row.meses.enero,
                  febrero: row.meses.febrero,
                  marzo: row.meses.marzo,
                  abril: row.meses.abril,
                  mayo: row.meses.mayo,
                  junio: row.meses.junio,
                  julio: row.meses.julio,
                  agosto: row.meses.agosto,
                  septiembre: row.meses.septiembre,
                  octubre: row.meses.octubre,
                  noviembre: row.meses.noviembre,
                  diciembre: row.meses.diciembre
               }))}
            />
         )}

         {!responseReportIncomesCosts && !responseReportConsultProjects && !responseReportCostsProjectedMonthly && (
            <CardPage className='h-fit min-h-[340px] md:px-[200px] flex flex-col justify-center items-center gap-6 text-center text-primary-gray'>
               {!loadingPage && (
                  <>
                     <p className='text-[18px]'>
                        Por favor, elige un reporte para comenzar y navega a través de nuestras opciones utilizando el
                        menú desplegable o los filtros disponibles.
                     </p>

                     <p className='text-primary-color'>
                        Si necesitas ayuda o tienes alguna pregunta, no dudes en escribirnos al correo
                        soporte@fundes.org. Estamos aquí para ayudarte en cualquier momento.
                     </p>
                  </>
               )}

               {loadingPage && (
                  <div className='flex flex-col items-center gap-3'>
                     <p>Por favor espera, estamos preparando todo...</p>

                     <Oval size={60} />
                  </div>
               )}
            </CardPage>
         )}
      </ContainerPage>
   );
}
