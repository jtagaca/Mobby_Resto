import React from 'react';
import{StyleSheet, Text, View, Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


const ProfileScreen = (props)=>{
    return(
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff","#6bc1ff"]}
                style={{height: "20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 70,
                        marginTop: -125,
                    }}
                    source={require("../../../assets/templogo.png")}
                />
            </View>

            <View style={{alignItems: "center"}}>
                <Title style={{fontSize: 25, fontWeight: "900"}}> Luis Aguilar </Title>
                <Text style={{fontSize: 20, fontStyle:"italic"}}> Looking for new Restruants </Text>
            </View>

            <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="star" size={32} color="gold"/>
                    <Text style={styles.myText}> Favorite Restruants </Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="credit-card" size={32} color="green"/>
                    <Text style={styles.myText}> Payment Information </Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="restaurant" size={32} color="orange"/>
                    <Text style={styles.myText}> Restruant Reviews </Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="message" size={32} color="cyan"/>
                    <Text style={styles.myText}> Message Me! </Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="edit" size={32} color="blue"/>
                    <Button onPress={() => props.navigation.navigate("SettingsScreen")}>
                        Settings
                    </Button>
                </View>
            </Card>

            <Button onPress={() => props.navigation.goBack()}>
                    Go Back
                </Button>
        
        
        
        {/* END OF MAIN VIEW */}
        </View>


    )
}


const styles = StyleSheet.create({
    root:{
        flex: 1,
    },
    myCard: {
        margin: 3,
    },
    cardContents: {
        flexDirection: "row",
        padding: 8,
    },
    myText: {
        fontSize: 30,
        alignItems: "center",
        fontWeight: "100",
    },
})
export default ProfileScreen;