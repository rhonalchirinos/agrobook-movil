import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default class HomeItemDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    onTest() {
        console.log(this.props);
    }

    render() {
        return (
            <View style={styles.container}>

                <Button
                    onPress={this.onTest.bind(this)}
                    title='Learn More'
                    color='#841584'
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

