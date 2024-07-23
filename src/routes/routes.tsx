import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Example1View from '../pages/Example1/Example1View';
import Example2 from '../pages/Example2/Example2View';
import Example3 from '../pages/Example3/Example3View';
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
