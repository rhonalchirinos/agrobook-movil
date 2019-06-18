import React from 'react';

import {StyleSheet} from 'react-native';
import Route from './app/route';
import axios from 'axios';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Route/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
