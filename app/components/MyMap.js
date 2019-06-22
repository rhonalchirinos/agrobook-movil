import React from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button, Icon} from "react-native-elements";
import ContractService from "../store/ContractService";

export default class MyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coordinate: {
                latitude: 12,
                longitude: 12,
            }
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.back = navigation.getParam('back');
    }

    load(){
        ContractService.search(this.state.coordinate.longitude, this.state.coordinate.latitude ).then( (resp) => {
            const sear = resp.data.features[0].properties.name  + '; ' + resp.data.features[0].properties.country;
            this.setState({search: sear});
            this.props.navigation.pop(1);
            this.back({ item: sear });
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.container}>
                    <MapView
                        onRegionChange={(center) => {
                            console.log(center);
                            const northeast = {
                                latitude: center.latitude + center.latitudeDelta / 2,
                                longitude:  center.longitude + center.longitudeDelta / 2,
                            };
                            console.log( northeast)
                            this.setState({coordinate: center});
                        }}
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={this.state.coordinate} />

                    </MapView>

                </View>

                <KeyboardAvoidingView style={{flexDirection: 'row'}} behavior="padding" enabled>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        autoCapitalize='none'
                        value={this.state.search}
                        onChangeText={(address) => {
                            this.setState({address});
                        }}
                    />
                    <Button
                        style={{paddingHorizontal: 15}}
                        color="#841584"
                        onPress={this.load.bind(this)}
                        icon={<Icon name='search' type='font-awesome'/>}
                    />
                </KeyboardAvoidingView>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
        top: 0,
        position: 'relative',
        fontSize: 12,
        width: '75%',
        height: 40,
        borderColor: '#adadad',
        borderWidth: 1,
        backgroundColor: '#fff'

    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});