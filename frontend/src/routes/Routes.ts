import HomeIcon from '@material-ui/icons/Home';
import Home from '../components/Home';

export interface routeInterface {
  buttonTitle: string,
  pageTitle?: string,
  pathname: string,
  component: any,
  Icon?: React.FC,
  headerContent?: any,
  privateRoute: boolean
};

export const privateRoutes: routeInterface[] = [
  {
    buttonTitle: 'Home',
    pageTitle: 'Home',
    pathname: '/',
    component: Home,
    Icon: HomeIcon,
    headerContent: null,
    privateRoute: true
  },
];
