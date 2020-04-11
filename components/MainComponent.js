import React, { Component } from "react";
import Menu from "./Menu"
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text } from "react-native"
import { Icon } from "react-native-elements"
import DishDetail from "./DishDetails";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import Home from "./Home"
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import Reservation from "./ReservationComponent"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})
function MenuNavigator() {
    return (
        <Stack.Navigator initialRouteName="Menu" screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Menu" component={Menu} options={
                ({ navigation }) => ({
                    title: "Menu",
                    headerLeft: () => <Icon name="menu" size={24} color={"white"} onPress={() => navigation.toggleDrawer()} />,
                })
            }
            />
            <Stack.Screen name="Dish Detail" component={DishDetail} options={{ title: "Details" }} />
        </Stack.Navigator>
    )
}



function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Home" component={Home} options={
                ({ navigation }) => ({
                    title: "Home",
                    headerLeft: () => <Icon name="menu" size={24} color={"white"} onPress={() => navigation.toggleDrawer()} />,
                })
            } />
        </Stack.Navigator>
    )
}

function ContactNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Contact" component={Contact} options={
                ({ navigation }) => ({
                    title: "Contact",
                    headerLeft: () => <Icon name="menu" size={24} color={"white"} onPress={() => navigation.toggleDrawer()} />,
                })
            } />
        </Stack.Navigator>
    )
}

function ReservationNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Reservation" component={Reservation} options={
                ({ navigation }) => ({
                    title: "Reservation",
                    headerLeft: () => <Icon name="menu" size={24}
                        iconStyle={{ color: 'white' }}
                        onPress={() => navigation.navigate('DrawerToggle')} />,
                })
            } />
        </Stack.Navigator>
    )
}

function AboutNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="AboutUs" component={AboutUs} options={
                ({ navigation }) => ({
                    title: "About Us",
                    headerLeft: () => <Icon name="menu" size={24} color={"white"} onPress={() => navigation.toggleDrawer()} />,
                })
            } />
        </Stack.Navigator>
    )
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchPromos();
    }

    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <Drawer.Navigator drawerContent={CustomDrawerContentComponent}>
                        <Drawer.Screen name="Home" component={HomeNavigator} options={{
                            title: "Home",
                            drawerLabel: "Home",
                            drawerIcon: ({ tintColor }) => <Icon name="home" type='font-awesome' size={24} color={tintColor} />
                        }} />
                        <Drawer.Screen name="About us" component={AboutNavigator} options={{
                            drawerIcon: ({ tintColor }) => <Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
                        }} />
                        <Drawer.Screen name="Menu" component={MenuNavigator} options={{
                            drawerIcon: ({ tintColor }) => <Icon name="list" type="font-awesome" size={24} color={tintColor} />
                        }} />
                        <Drawer.Screen name="Contact us" component={ContactNavigator} options={{
                            drawerIcon: ({ tintColor }) => <Icon name="address-card" type="font-awesome" size={24} color={tintColor} />
                        }} />
                        <Drawer.Screen name="Reservation" component={ReservationNavigator} options={{
                            drawerIcon: ({ tintColor }) => <Icon
                            name='cutlery'
                            type='font-awesome'            
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                        }} />
                    </Drawer.Navigator>
                </View>
            </NavigationContainer>
        )
    }
}


const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#f4511e',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Main)