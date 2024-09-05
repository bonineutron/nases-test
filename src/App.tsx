import operationsService from './services/routes/operations/operations.service';
import reportsService from './services/routes/reports/reports.service';
import authService from './services/routes/auth/auth.service';
import apiService from './services/api.service';
import { useDispatch } from 'react-redux';
import { Layout } from '@/components';
import { Router } from './router';
import { useEffect } from 'react';

function App(): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // Effects
   useEffect(() => {
      apiService.setHooks(dispatch);
      authService.setHooks(dispatch);
      operationsService.setHooks(dispatch);
      reportsService.setHooks(dispatch);
   }, []);

   return (
      <Layout>
         <Router />
      </Layout>
   );
}

export default App;
