import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={globalStyle.containerLoading}>
                    <ActivityIndicator size="large" color={consts.BLUE} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Text>Home</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Alarm')}>
                        <Text>Alarme</Text>
                    </TouchableOpacity>
                </View>
            );
        }
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
