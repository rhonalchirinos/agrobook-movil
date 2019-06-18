import React from 'react';
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from 'react-native';
import Service from "./store/Service";

export default class Welcome extends React.Component {
    state = {animating: true};

    constructor(props) {
        super(props);
        this.loading().then();
    }

    async loading() {
        try {
            const user = await AsyncStorage.getItem('@book:user');
            await Service.configuration();
             setTimeout(() => {
                 this.setState({animating: false});
                 this.props.navigation.navigate(user ? 'Home' : 'Login');
             }, 1000);
        }catch (e) {
            console.log( e);
        }
    }


    render() {
        const animating = this.state.animating;
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size='large'
                    color='#bc2b78'
                    animating={animating}
                    style={styles.activityIndicator}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
