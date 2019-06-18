import React from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    async login() {
        console.log(this.props);
        // this.props.navigation.replace('Home');
        await AsyncStorage.setItem('@agrebook:user', JSON.stringify(this.state));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.login.bind(this)}
                    >
                        <Text style={styles.submitButtonText}> Register </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "black",
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: "black",
        padding: 10,
        margin: 15,
        alignItems: "center",
        height: 40
    },
    submitButtonText: {
        color: "white"
    }
});
