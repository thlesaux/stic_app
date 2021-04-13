import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Provider } from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from "react-native-vector-icons/Ionicons";

import consts from '../../src/consts';

const imageCuisine = { uri: "https://decorill.org/wp-content/uploads/2020/09/how-to-remodel-my-kitchen.jpg" };
const imageSalleDeBain = { uri: "https://m.foiredeparis.fr/var/comexposium/storage/images/media/foire-de-paris/images/le-mag/articles/tendance_sdb_2019_img7/11420376-1-fre-FR/Tendance_SDB_2019_Img7.png" };
const imageChambre = { uri: "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2018/03/Discover-the-Ultimate-Master-Bedroom-Styles-and-Inspirations-6_1.jpg" };
const imageSalon = { uri: "https://www.cdeco.fr/wp-content/uploads/2018/05/conseil-deco-pour-un-salon-design-contemporain.jpg" };

class Rooms extends Component {

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
                    <TouchableOpacity style={styles.containerRoom}>
                        <Image source={imageCuisine} style={[styles.room]} />
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Cuisine
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerRoom}>
                        <Image source={imageSalleDeBain} style={[styles.room]} />
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Salle de bain
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerRoom}>
                        <Image source={imageChambre} style={[styles.room]} />
                        <Text style={[globalStyle.fontTextMedium, styles.textRoom]}>
                            Chambre
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerRoom}>
                        <Image source={imageSalon} style={[styles.room]} />
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
        paddingTop: '30%'
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
        opacity: .7
    },
    textRoom: {
        color: "#000",
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
        marginBottom: '10%'
    }
});

export default Rooms;
