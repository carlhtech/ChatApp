import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto} from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';

const InputBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color={"grey"} />
                <TextInput />
                <Entypo name="attachment" size={24} color={"grey"} />
                <Fontisto name="camera" size={24} color={"grey"} />
            </View>
            <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="microphone" size={28} color="white" />
            </View>
        </View>
    )
}

export default InputBox;
