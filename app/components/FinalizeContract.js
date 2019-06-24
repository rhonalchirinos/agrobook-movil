import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Card} from "react-native-elements";
import ContractService from "../store/ContractService";

export default class FinalizeContract extends React.Component {

    state = {
        observation: '',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onCancel = this.props.onCancel;
        this.onSave = this.props.onSave;
        this.id = this.props.id;
        this.setState({
            observation: this.props.observation,
        });
    }

    save() {
        ContractService.close(this.id, this.state).then((resp) => {
            this.onSave(resp.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    cancel() {
        this.onCancel();
    }

    render() {
        return (
            <View>
                <Card title='Finalizar Datos'>
                    <View>
                        <Text> OBSERVACION </Text>
                        <TextInput
                            style={styles.input}
                            multiline = {true}
                            numberOfLines = {4}
                            underlineColorAndroid='transparent'
                            placeholder='Observacion'
                            maxLength={255}
                            value={this.state.observation}
                            onChangeText={(value) => {
                                this.setState({observation: value});
                            }}
                        />
                        <View
                            style={{flexDirection: 'row'}}>
                            <View style={{padding: 20}}>
                                <Button
                                    color="#841584"
                                    style={{paddingHorizontal: 15}}
                                    onPress={this.cancel.bind(this)}
                                    title="CANCELAR"
                                />
                            </View>
                            <View style={{padding: 20}}>
                                <Button
                                    style={{paddingHorizontal: 15}}
                                    onPress={this.save.bind(this)}
                                    title="FINALIZAR"
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

    input: {
        fontSize: 12,
        padding: 5,
        margin: 5,
        borderColor: '#adadad',
        borderWidth: 1
    },
});
