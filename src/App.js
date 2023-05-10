import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listRestaurants } from "./graphql/queries";
import {
  createRestaurant as createRestaurantMutation,
  deleteRestaurant as deleteRestaurantMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    const apiData = await API.graphql({ query: listRestaurants });
    const restaurantsFromAPI = apiData.data.listRestaurants.items;
    setRestaurants(restaurantsFromAPI);
  }

  async function createRestaurant(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createRestaurantMutation,
      variables: { input: data },
    });
    fetchRestaurants();
    event.target.reset();
  }

  async function deleteRestaurant({ id }) {
    const newRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(newRestaurants);
    await API.graphql({
      query: deleteRestaurantMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Yelp***</Heading>
      <View as="form" margin="3rem 0" onSubmit={createRestaurant}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Restaurant Name"
            label="Restaurant Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Restaurant Description"
            label="Restaurant Description"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="city"
            placeholder="Restaurant City"
            label="Restaurant City"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Restaurant
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Restaurants</Heading>
      <View margin="3rem 0">
        {restaurants.map((restaurant) => (
          <Flex
            key={restaurant.id || restaurant.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {restaurant.name}
            </Text>
            <Text as="span">{restaurant.description}</Text>
            <Text as="span">{restaurant.city}</Text>
            <Button variation="link" onClick={() => deleteRestaurant(restaurant)}>
              Delete restaurant
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);