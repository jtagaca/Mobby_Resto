import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';


const FavoriteRestaurantsScreen = (props) => {

    const favorites = useSelector(state => state.user.favorites);
    const theme = useSelector(state => state.theme.theme);

    return (
        <View>
            <FlatList 
                data={favorites}
                renderItem={({item}) => {
                    return (
                        <View style={{ backgroundColor: theme.colors.primary }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("RestaurantDetails", { name: item.name, restaurant: item })}>
                                <Card >
                                    <Card.Content>
                                        <Title>
                                            {item.name}
                                        </Title>
                                    </Card.Content>
                                    
                                    <Card.Cover
                                        source={{ uri: item.photo }}
                                        />
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default FavoriteRestaurantsScreen;
