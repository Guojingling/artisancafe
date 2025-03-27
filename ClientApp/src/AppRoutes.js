import { Home } from "./components/Home";
import { Info } from "./components/Info";
import { Order } from "./components/Order";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/info',
    element: <Info />
  },
  {
    path: '/order',
    element: <Order />
  }
];

export default AppRoutes;
