import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ContractService from "../store/ContractService";
import {Button, Card, Header, Icon} from "react-native-elements";


export default class CreateItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            farmers: [],
            address: null,
            seed: null,
            farmer: undefined,
            disabled: true
        };
        this.address = null;
    }

    componentDidMount() {
        ContractService.farmers().then(elements => {
            this.setState({farmers: elements.data.data});
        });
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    onSelectFarmer() {
        const _this = this;
        this.props.navigation.push('SelectFarmer', {
            farmers: this.state.farmers,
            back: (data) => {
                if (data) {
                    _this.state.farmer = data.item;
                    _this.valid();
                }
            }
        });
    }

    onSelectDir() {
        const _this = this;
        this.props.navigation.push('MyMap', {
            farmers: this.state.farmers,
            back: (data) => {
                if (data.item) {
                    console.log( data.item, '<--------');
                    _this.setState({address: data.item })
                }
            }
        });
    }

    farmerName(farmer) {
        if (farmer) {
            return farmer.name + ' ' + farmer.last_name;
        }
        return '';
    }

    async onSave() {
        if (this.valid()) {
            try {
                await ContractService.store({
                    address: this.state.address,
                    seed: this.state.seed,
                    farmer_id: this.state.farmer.id
                });
                this.props.navigation.push('Home');
            } catch (error) {
                console.log('error', error.response);
                if (error.response && error.response.data.duplicate) {
                    alert('Este agricultor tiene una orden abierta ');
                }
            }
        }
    }

    valid() {
        if (!this.state.farmer) {
            this.setState({disabled: true});
            return false
        }

        if (!this.state.address) {
            this.setState({disabled: true});
            return false
        }

        if (!this.state.seed) {
            this.setState({disabled: true});
            return false
        }

        this.setState({disabled: false});
        return true;
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    placement='left'
                    leftComponent={{
                        icon: 'chevron-left', color: '#fff', onPress: () => {
                            console.log(this.props.navigation);
                            this.props.navigation.goBack();
                        }
                    }}
                />
                <Card title='AGREGAR CONTRATO'>

                    <Text> DIRECCION </Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        autoCapitalize='none'
                        maxLength={255}
                        value={this.state.address}
                        onChangeText={(address) => {
                            this.setState({address});
                            this.valid();
                        }}
                    />
                    <Text> SEMILLAS </Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        autoCapitalize='none'
                        maxLength={255}
                        onChangeText={(seed) => {
                            this.setState({seed});
                            this.valid();
                        }}
                    />
                    <Text> AGRICULTOR </Text>
                    <Text style={styles.input}
                          onPress={this.onSelectFarmer.bind(this)}> {this.farmerName(this.state.farmer)} </Text>


                    <View  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{paddingRight: 20}}>
                            <Button
                                onPress={this.onSelectDir.bind(this)}
                                backgroundColor='#03A9F4'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='MAPA'/>
                        </View>
                        <View >
                            <Button
                                style={{alignSelf: 'flex-end'}}
                                disabled={this.state.disabled}
                                onPress={this.onSave.bind(this)}
                                backgroundColor='#03A9F4'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='GENERAR'/>
                        </View>
                    </View>

                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    input: {
        fontSize: 12,
        padding: 5,
        margin: 5,
        borderColor: 'black',
        backgroundColor: '#fff',
        borderWidth: 1
    },
});
