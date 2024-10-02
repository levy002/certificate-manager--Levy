import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AddCertificate from '../components/certificates/AddCertificate';
import EditCertificate from '../components/certificates/EditCertificate';
import Example1View from '../pages/example1/Example1View';
import Example2View from '../pages/example2/Example2View';
import Example3View from '../pages/example3/Example3View';
import Home from '../pages/home/Home';
import NotFound from '../pages/notFound/NotFound';
import StartScreen from '../pages/startScreen/Start';

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
        path: 'machineLearning/certificates',
        element: <Example1View />,
      },
      {
        path: 'machineLearning/certificates/new',
        element: <AddCertificate />,
      },
      {
        path: 'machineLearning/certificates/:id',
        element: <EditCertificate />,
      },
      {
        path: 'machineLearning/example2',
        element: <Example2View />,
      },
      {
        path: 'machineLearning/example3',
        element: <Example3View />,
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
