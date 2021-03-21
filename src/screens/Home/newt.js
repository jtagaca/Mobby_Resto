import {
  PaperProvider,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";

//this is still in progress
function newt(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants("burger"));
  }, []);

  const restaurants = useSelector((state) =>
    state.restaurant.restaurants
      ? state.restaurant.restaurants.businesses
      : null
  );
  console.log(restaurants);
  const isLoading = useSelector(
    (state) => state.restaurant.isFetchingRestaurants
  );
  if (isLoading || !restaurants) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={item => item.id}
          data={restaurants}
          renderItem={({ item }) => <Text>{item.alias}</Text>}
        />
        {/* const MyComponent = () => (
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        ); */}
      </SafeAreaView>
    );
  }
}

export default newt;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "blue",
    textAlign: "center",
  },
  text: {
    color: "blue",
  },
});
