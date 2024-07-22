import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CertificatesTable from '../components/certificates/CertificateTable';
import certificatesExamples from '../data/certificates';
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
      ...certificatesExamples.map((example) => ({
        path: `/machineLearning/${example.name}/certificates`,
        element: (
          <CertificatesTable
            name={example.name}
            certificates={example.certificates}
          />
        ),
      })),
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
