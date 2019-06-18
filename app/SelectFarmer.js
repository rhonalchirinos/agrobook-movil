import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, ListItem} from "react-native-elements";

export default class SelectFarmer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };
        this.back = null;
    }


    componentDidMount() {
        const {navigation} = this.props;
        this.setState({
            elements: navigation.getParam('farmers', [])
        });
        this.back = navigation.getParam('back');
     }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    onSelect(item) {
        console.log(item);
        this.props.navigation.pop(1);
        if (this.back) {
            this.back({
                item: item
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                <Card title='SELECCIONAR AGRICULTOR'>
                    {this.state.elements.map((item) => (
                        <ListItem
                            key={item.id}

                            subtitle={
                                <View>
                                    <View>
                                        <Text
                                            style={{color: '#8c7d82'}}>  {item.name} {item.last_name}</Text>
                                    </View>

                                </View>
                            }
                            title={
                                <View>
                                    <Text onPress={this.onSelect.bind(this, item)}> {item.rut} </Text>
                                </View>
                            }
                        />
                    ))
                    }
                </Card>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

