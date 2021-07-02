import HomeIcon from '@material-ui/icons/Home';
import Home from '../components/Home';
import Placeholder from './Placeholder'
import { AppRouter } from './AppRouter'
export interface routeInterface {
  buttonTitle?: string,
  pageTitle?: string,
  pathname: string,
  component: any,
  Icon?: React.FC,
  headerContent?: any,
  privateRoute?: boolean,
  subRoutes?: routeInterface[]
};

export const privateRoutes: routeInterface[] = [
  {
    buttonTitle: 'Home',
    pageTitle: 'Home',
    pathname: '/home',
    component: AppRouter, //use AppRouter if you want to nest subroutes off the main left nav
    Icon: HomeIcon,
    headerContent: null,
    privateRoute: true,
    subRoutes: [
      {
        pathname: "", // use an empty string for the apps landing page
        component: Home,
      },
      {
        pathname: "/:userinput?", // you can take in a param after /home by doing this
        component: Placeholder,
      },
      {
        pathname: "/nestedsubroute/:userinput?/", // this page can be accessed at /home/nestedsubroute/<whateveryouwant>
        component: Placeholder,
      }
    ]
  },
];
