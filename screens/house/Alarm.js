import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';


class Alarm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            alarmState: false,
        };
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={globalStyle.containerLoading}>
                    <ActivityIndicator size="large" color={consts.BLUE}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.marginView}>
                        <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>Alarme</Text>
                    </View>
                    <View style={[styles.circle, styles.marginView, globalStyle.shadowStyle]}>
                        <Icon name={this.state.alarmState === true ? "lock" : "unlock"} size={consts.ICON_SIZE} color={consts.BLACK}/>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={[styles.buttonGlobalStyle, styles.buttonOnStyle, globalStyle.shadowStyle]}
                            onPress={() => this.setState({ alarmState: true})}
                        >
                            <Text style={styles.textButtonOn}>ON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonGlobalStyle, styles.buttonOffStyle, globalStyle.shadowStyle]}
                            onPress={() => this.setState({ alarmState: false})}
                        >
                            <Text style={styles.textButtonOff}>OFF</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    marginView: {
        marginBottom: 45
    },
    textTitle: {
        fontSize: consts.FONT_SIZE_TITLE,
        color: consts.BLACK
    },
    textButtonOn: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.BLACK
    },
    textButtonOff: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.WHITE
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250
    },
    buttonGlobalStyle: {
        padding: 16,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
    },
    buttonOnStyle: {
        backgroundColor: consts.BLUE,
    },
    buttonOffStyle: {
        backgroundColor: consts.LIGHT_GRAY,
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: consts.BLUE,
    },
});

export default Alarm;
