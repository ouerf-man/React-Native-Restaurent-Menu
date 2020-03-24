import React, { Component } from "react";
import { DISHES } from '../shared/dishes'
import Menu from "./Menu"
import { View , Platform, StatusBar} from "react-native"
import DishDetail from "./DishDetails";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import {createDrawerNavigator} from "@react-navigation/drawer"
import Home from "./Home"
import Contact from "./Contact";
import AboutUs from "./AboutUs"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator(){
    return(
        <Stack.Navigator initialRouteName="Menu" screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }}>
            <Stack.Screen name="Menu" component={Menu} options={{title:"Menu"}} />
            <Stack.Screen name="Dish Detail" component={DishDetail} options={{title:"Details"}}/>
        </Stack.Navigator>
    )
}

function HomeNavigator(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }}>
            <Stack.Screen name="Home" component={Home} options={{title:"Home"}} />
        </Stack.Navigator>
    )
}

function ContactNavigator(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }}>
            <Stack.Screen name="Contact" component={Contact} options={{title:"Contact"}} />
        </Stack.Navigator>
    )
}

function AboutNavigator(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }}>
            <Stack.Screen name="AboutUs" component={AboutUs} options={{title:"About us"}} />
        </Stack.Navigator>
    )
}

export default class Main extends Component {


    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1}}>
                   <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={HomeNavigator}/>
                        <Drawer.Screen name="About us" component={AboutNavigator}/>
                        <Drawer.Screen name="Menu" component={MenuNavigator} />
                        <Drawer.Screen name="Contact us" component={ContactNavigator}/>
                    </Drawer.Navigator> 
                </View>
            </NavigationContainer>
        )
    }
}