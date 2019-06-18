import {createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';

import HomeItemDetails from './HomeItemDetails';
import Login from './Login';
import Welcome from './Welcome';
import Home from './Home';

/*
const AuthNavigator = createStackNavigator(
    {
        Login: {screen: Login},
        Home: {screen: Home},
        Welcome: {screen: Welcome},
        Register: {screen: Register}
    },
    {
        initialRouteName: 'Welcome',
    }
);
*/

const AppNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            title: 'Home'
        },
        contracts: {
            screen: HomeItemDetails,
            navigationOptions: () => ({
                title: 'Generar Contrato',
            }),
        },
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






