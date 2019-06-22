import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Header, ListItem} from "react-native-elements";
import moment from "moment";
import ContractService from "./store/ContractService";
import CompleteContract from './components/CompleteContract';
import FinalizeContract from "./components/FinalizeContract";

export default class HomeItemDetail extends React.Component {

    state = {
        item: null,
        edit: false,
        showFinalize: false,
        showComplete: false,
    };

    constructor(props) {
        super(props);
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    componentDidMount() {
        const {navigation} = this.props;
        const item = navigation.getParam('item', null);
        ContractService.show(item.id).then(elements => {
            this.setState({item: elements.data});
        });

        AsyncStorage.getItem('@book:user').then((user) => {
            this.user = JSON.parse(user);
        });

    }

    format(data) {
        if (!data) {
            return '';
        }
        return moment(data).format('DD/MM/YYYY');
    }

    status() {
        if (!this.state.item) {
            return '';
        }
        return this.state.item.status === 'N' ? 'NUEVO' : 'PROCESADO';
    }

    onCancel() {
        this.setState({
            edit: false,
            showFinalize: false,
            showComplete: false,
        });
    }

    onSave(data) {
        this.setState({
            item: data,
            edit: false,
            showFinalize: false,
            showComplete: false,
        });
    }

    editData() {
        this.setState({edit: true, showComplete: true})
    }

    finalized() {
        this.setState({edit: true, showFinalize: true});
    }

    render() {
        return (
            <View>
                <ScrollView>

                    <Header
                        placement='left'
                        leftComponent={{
                            icon: 'chevron-left', color: '#fff', onPress: () => {
                                console.log(this.props.navigation);
                                this.props.navigation.goBack();
                            }
                        }}
                    />
                    {this.state.item && !this.state.edit &&
                    <Card>
                        <ListItem
                            title={
                                <View>
                                    <Text> NOMBRE: {this.state.item.farmer.name} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> APELLIDO: {this.state.item.farmer.last_name} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> RUT: {this.state.item.farmer.rut} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> CORREO: {this.state.item.farmer.email} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> DIRECCION: {this.state.item.address} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> SEMILLA A SEMBRAR: {this.state.item.seed} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> POTENCIA DE SUELO: {this.state.item.floor_power} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> FECHA DE SIEMBRA : {this.format(this.state.item.planting_date)} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> OBSERVACION: {this.state.item.seed}</Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> ESTADO: {this.status()} </Text>
                                </View>
                            }
                        />
                        <ListItem
                            title={
                                <View>
                                    <Text> FECHA:{this.format(this.state.item.created_at)} </Text>
                                </View>
                            } z
                        />

                        <View style={{flexDirection: 'row'}}>
                            {(this.state.item.status === 'N') &&
                            <View style={{flex: 1, marginRight: 10}}>
                                <Button
                                    title="Acompletar Datos"
                                    onPress={() => {
                                        this.editData()
                                    }}
                                />
                            </View>
                            }
                            {(this.state.item.status === 'N' && this.user.data.role_id === 1) &&
                            <View style={{flex: 1}}>
                                <Button
                                    title="Finalizar "
                                    onPress={() => {
                                        this.finalized()
                                    }}
                                />
                            </View>
                            }
                        </View>

                    </Card>
                    }

                    {this.state.showFinalize &&
                    <FinalizeContract
                        id={this.state.item.id}
                        floor_power={this.state.item.floor_power}
                        planting_date={this.state.item.planting_date}
                        onCancel={this.onCancel.bind(this)}
                        onSave={this.onSave.bind(this)}
                    />
                    }

                    {this.state.showComplete &&
                    <CompleteContract
                        id={this.state.item.id}
                        floor_power={this.state.item.floor_power}
                        planting_date={this.state.item.planting_date}
                        onCancel={this.onCancel.bind(this)}
                        onSave={this.onSave.bind(this)}
                    />
                    }

                </ScrollView>
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
    space: {
        marginVertical: 10
    }
});

