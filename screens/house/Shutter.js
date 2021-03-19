import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';


class Shutter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
                    <View style={[styles.rectangle, styles.marginView, globalStyle.shadowStyle]}>
                        <View style={styles.marginView}>
                            <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>Volets</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonDownStyle, globalStyle.shadowStyle]}
                            >
                                <Icon name="arrow-circle-down" size={consts.ICON_SIZE} color={consts.BLACK}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonUpStyle, globalStyle.shadowStyle]}
                            >
                                <Icon name="arrow-circle-up" size={consts.ICON_SIZE} color={consts.WHITE}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonStopStyle, globalStyle.shadowStyle]}
                            >
                                <Text style={styles.textButtonStop}>STOP</Text>
                            </TouchableOpacity>
                        </View>
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
    textButtonStop: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.WHITE,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280
    },
    buttonGlobalStyle: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonDownStyle: {
        backgroundColor: consts.BLUE,
    },
    buttonUpStyle: {
        backgroundColor: consts.LIGHT_GRAY,
    },
    buttonStopStyle: {
        backgroundColor: consts.RED,
    },
    rectangle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 250,
        backgroundColor: consts.WHITE,
    },
});

export default Shutter;
