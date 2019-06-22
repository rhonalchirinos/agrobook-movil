import {AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import conf from '../Configuration';
import React from 'react';
import axios from 'axios';
import Service from "../store/Service";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rut: '',
            password: '',
            errorLogin: false
        };
    }

    async login() {
        const {rut, password} = this.state;
        try {
            const response = await axios.post(conf.api + 'login', {
                rut: rut,
                password: password
            });
            await AsyncStorage.setItem('@book:user', JSON.stringify(response.data));
            await Service.configuration();
            this.props.navigation.navigate('Home');
        } catch (error) {
            this.setState({errorLogin: true});
            setTimeout(() => {
                this.setState({errorLogin: false});
            }, 3000);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Rut'
                        placeholderTextColor='black'
                        autoCapitalize='none'
                        onChangeText={(rut) => this.setState({rut})}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Password'
                        placeholderTextColor='black'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        tit
                        onPress={this.login.bind(this)}
                    >
                        <Text style={styles.submitButtonText}> INICIAR </Text>
                    </TouchableOpacity>

                    <View>
                        {this.state.errorLogin &&
                        <Text> Contraseña Invalida </Text>
                        }
                    </View>
                    <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('./../../assets/agro.jpg')}
                    />
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 15,
    },
    input: {
        fontSize: 12,
        padding: 5,
        margin: 5,
        height: 40,
        borderColor: 'black',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        height: 40
    },
    submitButtonText: {
        color: 'white'
    }
});
