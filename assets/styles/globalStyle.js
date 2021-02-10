import { StyleSheet } from 'react-native';
import consts from '../../src/consts';


export default StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    fontTextRegular: {
        fontFamily: 'Raleway-Regular'
    },
    fontTextMedium: {
        fontFamily: 'Raleway-Medium'
    },
    fontTitleRegular: {
        // fontFamily: 'Prata'
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: consts.BACKGROUND_COLOR
    }
});
