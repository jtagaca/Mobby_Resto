import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

//this is still in progress
function newt(props) {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.background}>This is the test for it</Text>
            </View>
        </SafeAreaView>
    );
}

export default newt;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:blue,
        textAlign: 'center'

    },
    text:{
        color:blue,

    }
})