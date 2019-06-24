import React from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Card} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import ContractService from "../store/ContractService";
import moment from 'moment';
export default class CompleteContract extends React.Component {

    state = {
        floor_power: '0',
        planting_date: '',
        disabled: true
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onCancel = this.props.onCancel;
        this.onSave = this.props.onSave;
        this.id = this.props.id;
        this.setState({
            floor_power: String(this.props.floor_power),
            planting_date: ContractService.formatDate(this.props.planting_date),
        });
    }

    save() {
        if (this.valid()) {
            ContractService.view(this.id, {
                floor_power: this.state.floor_power,
                planting_date:  moment(this.state.planting_date, 'DD/MM/YYYY').format('MM/DD/YYYY'),
            }).then((resp) => {
                this.onSave(resp.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    cancel() {
        this.onCancel();
    }

    valid() {
        if (this.state.floor_power === '') {
            this.setState({disabled: true});
            return false;
        }
        if (this.state.planting_date === '') {
            this.setState({disabled: true});
            return false;
        }
        this.setState({disabled: false});
        return true;
    }

    render() {
        return (
            <View>
                <Card title='Acompletar Datos'>
                    <View>
                        <Text> POTENCIA DE SUELO </Text>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder='0-100'
                            keyboardType='numeric'
                            maxLength={3}
                            value={this.state.floor_power}
                            onChangeText={(value) => {
                                if (value.length !== 0) {
                                    if (parseFloat(value) >= 0 && parseFloat(value) <= 100) {
                                        this.setState({floor_power: value});
                                    } else {
                                        Alert.alert('Solo admite valores de 0 a 100 ');
                                    }
                                } else {
                                    this.setState({floor_power: value});
                                }
                                this.valid();
                            }}
                        />
                        <Text> FECHA DE SIEMBRA </Text>
                        <DatePicker
                            date={this.state.planting_date}
                            style={{ width: 150}}
                            mode="date"
                            placeholder="FECHA"
                            format="DD/MM/YYYY"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({planting_date: date});
                                this.valid();
                            }}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <View style={{padding: 20}}>
                                <Button
                                    style={{paddingHorizontal: 15}}
                                    color="#841584"
                                    onPress={this.cancel.bind(this)}
                                    title="CANCELAR"
                                />
                            </View>
                            <View style={{padding: 20}}>
                                <Button
                                    disabled={this.state.disabled}
                                    style={{paddingHorizontal: 15}}
                                    onPress={this.save.bind(this)}
                                    title="ACTUALIZAR"
                                />
                            </View>
                        </View>
                    </View>
                </Card>
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
    input: {
        width: 150,
        fontSize: 12,
        padding: 5,
        margin: 5,
        height: 40,
        borderColor: '#adadad',
        borderWidth: 1
    },
});

