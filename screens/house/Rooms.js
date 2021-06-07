import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Provider } from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import consts from '../../src/consts';



class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    loadImages(images) {
        return Promise.all(Object.keys(images).map((i) => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache'
            };
            return Image.prefetch(img);
        }));
    }

    /**
     * 
     * @param {string} status 
     * @param {int} id 
     * Function with redux who save the current room
     * 
    */
    setRoom(status) {
        const action = {
            type: status
        }
        this.props.dispatch(action);
    }

    handleRedirect(roomName) {
        this.setRoom(roomName);

        switch (this.props.equipment) {
            case "light":
                this.props.navigation.navigate('Lighting');
                return;
            case "temperature":
                this.props.navigation.navigate('Temperature');
                return;
            case "others":
                this.props.navigation.navigate('Shutter');
                return;
            default:
                return;
        }
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
                    <TouchableOpacity style={[styles.containerRoom, globalStyle.shadowStyle]} onPress={() => this.handleRedirect("kitchen")}>
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Cuisine
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerRoom, globalStyle.shadowStyle]} onPress={() => this.handleRedirect("bathroom")}>

                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Salle de bain
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerRoom, globalStyle.shadowStyle]} onPress={() => this.handleRedirect("bedroom")}>
                        {/* <Image source={require('../../assets/rooms/bedroom.jpg')} style={[styles.room]} /> */}
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Chambre
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerRoom, globalStyle.shadowStyle]} onPress={() => this.handleRedirect("salon")}>
                        {/* <Image source={require('../../assets/rooms/salon.jpg')} style={[styles.room]} /> */}
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Salon
                        </Text>
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
        justifyContent:'center'
    },
    room: {
        flexDirection: "row",
        backgroundColor: consts.BLUE,
        width: '90%',
        alignItems: 'center',
        padding: '5%',
        borderRadius: 5,
        height: 80,
        position: "relative",
        opacity: .5
    },
    textRoom: {
        color: consts.BLACK,
        fontSize: 30,
        position: "absolute",
    },
    iconButton: {
        position: 'absolute',
        left: 0,
        marginLeft: '5%',
        alignItems: 'center',
        width: '5%'
    },
    containerRoom: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '10%',
        backgroundColor: consts.BLUE,
        height: 80,
        width: '90%',
        borderRadius: 5
    }
});


const mapStateToProps = (state) => {
    return {
        equipment: state.houseEquipment.name
    };
}

export default connect(mapStateToProps)(Rooms);

