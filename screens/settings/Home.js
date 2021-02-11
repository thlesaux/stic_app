import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings home</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: consts.BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Home;
