import React from "react"
import { FlatList, StyleSheet, StatusBar } from "react-native"
import { ListItem } from "react-native-elements"
import { DISHES } from "../shared/dishes"

class Menu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderReturnItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    leftAvatar={{ source: require("./images/uthappizza.png") }}
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate("Dish Detail", { dishId: item.id })}
                />
            )
        }
        return (
            <FlatList
                style={styles.main}
                data={this.state.dishes}
                renderItem={renderReturnItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}
const styles = StyleSheet.create({
    main: {
    }
})

export default Menu;