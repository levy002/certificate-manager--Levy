import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Example from '../components/Example/Example';
import machineLearningExamples from '../data/Example';
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
      ...machineLearningExamples.map((example) => ({
        path: `/machineLearning/${example.name}`,
        element: <Example name={example.name} certificates={example.certificates}/>,
      })),
    ]
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
