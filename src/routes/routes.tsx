import StartScreen from '../pages/StartScreen/Start';
import Home from '../pages/Home/Home';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import machineLearningExamples from '../data/Example';
import Example from '../components/Example/Example';
import NotFound from '../pages/NotFound/NotFound';

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
        element: <Example name={example.name} />,
      })),
    ]
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
