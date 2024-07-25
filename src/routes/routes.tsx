import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NewCertificateForm from '../components/certificates/NewCertificateForm';
import Example1View from '../pages/Example1/Example1View';
import Example2View from '../pages/Example2/Example2View';
import Example3View from '../pages/Example3/Example3View';
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
        element: <Example1View />,
      },
      {
        path: '/machineLearning/example1/certificates/new',
        element: <NewCertificateForm />,
      },
      {
        path: '/machineLearning/example2',
        element: <Example2View />,
      },
      {
        path: '/machineLearning/example3',
        element: <Example3View />,
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
