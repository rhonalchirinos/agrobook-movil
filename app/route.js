import {createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import HomeItemDetail from './HomeItemDetail';
import Login from './auth/Login';
import Welcome from './Welcome';
import Home from './Home';
import CreateItem from "./components/CreateItem";
import SelectFarmer from "./components/SelectFarmer";

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,
            },
        },
        HomeItemDetail: {
            screen: HomeItemDetail,
            navigationOptions: {
                header: null,
            },
        },
        SelectFarmer: {
            screen: SelectFarmer,
            navigationOptions: {
                header: null,
            },
        },
        CreateItem: {
            screen: CreateItem,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Home',
    }
);

const AppNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            title: 'Home'
        },
        /*
        contracts: {
            screen: HomeItemDetail,
            navigationOptions: () => ({
                title: 'Generar Contrato',
            }),
        },
        */
    },
    {
        initialRouteName: 'Home'
    }
);

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login,
        },
        Welcome: {
            screen: Welcome,
        },
        Home: {
            screen: AppNavigator,
        },
    },
    {
        initialRouteName: 'Welcome'
    }
);

export default createAppContainer(SwitchNavigator);






