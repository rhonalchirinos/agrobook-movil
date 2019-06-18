import React from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Header, Icon, ListItem} from 'react-native-elements'
import ContractService from "./store/ContractService";
import * as moment from "moment";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            list: [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                },
            ]
        };

    }

    componentDidMount() {
        AsyncStorage.getItem('@book:user').then((user) => {
            this.setState({user: JSON.parse(user)});
        });
        ContractService.all().then(elements => {
            // debugger;
            this.setState({elements: elements.data});
        });
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    async logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    OnLogout() {
        const _this = this;
        Alert.alert(
            'Salir',
            'Desea salir de la aplicaciòn?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => {
                        _this.logout().then();
                    }
                },
            ]
        )
    }

    OnGenerate() {
        console.log(' CREATE ');
    }

    onMenu() {
        this.props.navigation.openDrawer();
    }

    format(item) {
        return moment(item).format("MM-DD-YYYY");
    }

    showModal(item) {
        console.log(item);
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    leftComponent={{
                        icon: 'menu', color: '#fff', onPress: () => {
                            this.onMenu()
                        }
                    }}
                    centerComponent={{text: 'AgroBook', style: {color: '#fff'}}}
                    rightComponent={{icon: 'close', color: '#fff', onPress: this.OnLogout.bind(this)}}
                />
                {this.state.user &&
                <Card title='AgroBook'>
                    <Text style={{marginBottom: 10}}>
                        {this.state.user.data.name + ' Bienvenido.'}
                    </Text>
                    <Button
                        onPress={this.OnGenerate.bind(this)}
                        icon={<Icon name='plus-square' color='#ffffff' type='font-awesome'/>}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='GENERAR CONTRATO'/>
                </Card>
                }
                <Card title='AgroBook'>
                    {this.state.elements.map((item) => (
                        <ListItem
                            key={item.id}
                            subtitle={
                                <View>
                                    <View>
                                        <Text style={{color: '#8c7d82'}}>{item.farmer.name} {item.farmer.last_name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: '#8c7d82'}}>{item.address}</Text>
                                    </View>

                                    <Button style={{width: 20, right: 0, alignSelf: 'flex-end'}}
                                            icon={<Icon name='angle-right' type='font-awesome' color='#ffffff'/>}
                                            onPress={() => {
                                                this.showModal(item)
                                            }}
                                    />
                                </View>
                            }
                            title={
                                <View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 1}}>
                                            <Text>{item.farmer.rut}</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text style={{textAlign: 'right'}}>{this.format(item.created_at)}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                    ))
                    }
                </Card>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

