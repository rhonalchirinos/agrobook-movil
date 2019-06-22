import React from 'react';
import {ActivityIndicator, Alert, AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, ButtonGroup, Card, Header, Icon, ListItem} from 'react-native-elements'
import ContractService from './store/ContractService';
import {FloatingAction} from "react-native-floating-action";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            selectedIndex: 0,
            loading: false,
            user: null
        };
        this.actions = [
            {
                text: "NUEVO",
                icon: <Icon name='plus-square' color='#ffffff' type='font-awesome'/>,
                name: "bt_accessibility",
                position: 2
            }
        ];
        this.updateIndex = this.updateIndex.bind(this)

    }

    componentDidMount() {
        AsyncStorage.getItem('@book:user').then((user) => {
            this.setState({user: JSON.parse(user)});
            console.log('USER :', user)
        });
        this.load();
    }

    load( status= null){
        this.setState({loading: true});
        ContractService.all(status).then(elements => {
            this.setState({
                elements: elements.data,
                loading: false
            });
        }).catch(() => {
            this.setState({loading: false});
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
        this.props.navigation.navigate('CreateItem');
    }

    onMenu() {
        this.props.navigation.openDrawer();
    }

    format(item) {
        return ContractService.formatDate(item); // moment(item).format('MM/DD/YYYY');
    }

    status(item) {
        return item.status === 'N' ? 'NUEVO' : 'PROCESADO';
    }

    showModal(item) {
        this.props.navigation.push('HomeItemDetail', {item: item});
        console.log(item);
    }

    updateIndex(selectedIndex) {
        const buttons = [null, 'N', 'F'];
        this.setState({selectedIndex});
        this.load( buttons[selectedIndex]);
    }

    render() {
        const buttons = ['TODO', 'NUEVOS', 'FINALIZADOS'];
        const {selectedIndex} = this.state;
        const animating = this.state.animating;

        return (

            <View style={styles.container}>
                <Header
                    placement='left'
                    leftComponent={{
                        icon: 'menu', color: '#fff', onPress: () => {
                            this.onMenu()
                        }
                    }}
                    centerComponent={{text: 'AgroBook', style: {color: '#fff'}}}
                    rightComponent={{icon: 'close', color: '#fff', onPress: this.OnLogout.bind(this)}}
                />
                {this.state.loading &&
                <ActivityIndicator
                    size='large'
                    color='#bc2b78'
                    animating={animating}
                    style={styles.activityIndicator}/>
                }
                <ScrollView>
                    { (this.state.user && !this.state.loading )&&
                    <Card>
                        <View>
                            <Text style={{marginBottom: 10}}>
                                {this.state.user.data.name + ' Bienvenido.'}
                            </Text>
                            <View>
                                <ButtonGroup
                                    onPress={this.updateIndex}
                                    selectedIndex={selectedIndex}
                                    buttons={buttons}
                                />
                            </View>
                            {this.state.elements.map((item) => (
                                <ListItem
                                    key={item.id}
                                    subtitle={
                                        <View>
                                            <View>
                                                <Text
                                                    style={{color: '#8c7d82'}}> {item.farmer.rut} {item.farmer.name} {item.farmer.last_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={{color: '#8c7d82'}}>{item.address}</Text>
                                            </View>

                                            <Button icon={<Icon name='info' type='font-awesome'
                                                                color='#ffffff'/>}
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
                                                    <Text> {this.status(item)}</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Text
                                                        style={{textAlign: 'right'}}>{this.format(item.created_at)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                />
                            ))
                            }
                        </View>
                    </Card>
                    }
                </ScrollView>

                { (this.state.user &&  this.state.user.data.role_id === 1  )&&
                <FloatingAction
                    actions={this.actions}
                    onPressItem={name => {
                        console.log( this.state.user.data.role_id === 1 )
                        console.log(`selected button: ${name}`);
                        this.OnGenerate()
                    }}
                />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});

