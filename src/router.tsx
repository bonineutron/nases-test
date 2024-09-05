import { validatePermissions } from './utilities/global.utility';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Management, Home, Report } from './pages';
import { MessageModuleInProgress } from './components';
import { EPermission } from './enums/global.enum';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

export function Router(): JSX.Element {
   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         <Route path='/' element={<Home />} />

         <Route path='/login' element={<Login />} />

         <Route path='/alliances' element={<MessageModuleInProgress />} />

         <Route path='/operations/*' element={<OperationsRoutes />} />

         <Route path='/finances' element={<MessageModuleInProgress />} />

         <Route path='/accountancy' element={<MessageModuleInProgress />} />

         <Route path='/documents' element={<MessageModuleInProgress />} />

         <Route path='/corporate' element={<MessageModuleInProgress />} />

         <Route path='/talent' element={<MessageModuleInProgress />} />

         <Route path='/configuration' element={<MessageModuleInProgress />} />
      </Routes>
   );
}

const OperationsRoutes = (): JSX.Element => {
   // Redux states
   const { permissions } = useSelector((state: RootState) => state.user);

   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         {!validatePermissions(permissions, EPermission.OperationDashboards) && (
            <Route
               path='/dashboard'
               element={
                  <div className='bg-white'>
                     <iframe
                        src='https://app.powerbi.com/reportEmbed?reportId=0f5a5e1c-7f64-4167-a91b-1b01c760a56d&autoAuth=true&ctid=8d701211-b1bd-4e81-b1f4-ddee216ea7ff'
                        title='Example Iframe'
                        className='w-full h-auto min-h-[500px] border-0 rounded-lg shadow-md'
                        allowFullScreen
                     />
                  </div>
               }
            />
         )}

         {!validatePermissions(permissions, EPermission.OperationReports) && (
            <Route path='/report' element={<Report />} />
         )}

         {!validatePermissions(permissions, EPermission.ManageIncomesCosts) && (
            <Route path='/management' element={<Management />} />
         )}
      </Routes>
   );
};
