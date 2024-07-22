import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CertificatesTable from '../components/certificates/CertificateTable';
import Example2 from '../components/Example2/Example2';
import Example3 from '../components/Example3/Example3';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import StartScreen from '../pages/StartScreen/Start';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <StartScreen />,
      },
      {
        path: '/machineLearning/example1',
        element: <CertificatesTable />,
      },
      {
        path: '/machineLearning/example2',
        element: <Example2 />,
      },
      {
        path: '/machineLearning/example3',
        element: <Example3 />,
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
