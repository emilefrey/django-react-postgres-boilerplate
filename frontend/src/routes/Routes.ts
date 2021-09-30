import HomeIcon from '@material-ui/icons/Home';
import Home from '../components/Home';
import Placeholder from './Placeholder'
export interface appInterface {
  buttonTitle?: string,
  pageTitle?: string,
  baseRoute: string,
  exact: boolean,
  Icon?: React.FC,
  headerContent?: any,
  routes?: Route[],

};


type Route = { path: string, component: React.ElementType, exact: boolean }

export const HOME: appInterface = {
  buttonTitle: 'Home',
  pageTitle: 'Home',
  baseRoute: "/home",
  exact: true,
  Icon: HomeIcon,
  headerContent: null,
  routes: [
    { path: "/home", component: Home, exact: true },
    { path: "/home/nestedsubroute/:userinput?/", component: Placeholder, exact: false }
  ]
}

export const appArray = [HOME]