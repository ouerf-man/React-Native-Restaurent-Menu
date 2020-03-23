import React, { Component } from "react"
import { View, Text } from "react-native"
import { Card } from "react-native-elements"
import {DISHES} from "../shared/dishes"


class DishDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            dishes : DISHES
        }
        this.dishId = this.props.route.params.dishId
    }
   

    render() {
        return (
            <Details dish={this.state.dishes[+this.dishId]} />
        )
    }
}



const Details = (props) => {
    if (!props.dish) {
        return (
            <View>

            </View>
        )
    }
    else {
        return (
            <Card
                featuredTitle={props.dish.name}
                image={require('./images/uthappizza.png')}>
                <Text style={{ margin: 10 }}>
                    {props.dish.description}
                </Text>
            </Card>
        )
    }
}

export default DishDetail;