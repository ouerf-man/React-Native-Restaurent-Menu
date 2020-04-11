import React from "react"
import { FlatList, StyleSheet, StatusBar } from "react-native"
import { Tile } from "react-native-elements"
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseURL';
import { Loading } from './Loading';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }
class Menu extends React.Component {
    render() {
        const { navigate } = this.props.navigation;

        const renderReturnItem = ({ item, index }) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dish Detail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image}}
                    />
            )
        }
        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderReturnItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}
const styles = StyleSheet.create({
    main: {
    }
})

export default connect(mapStateToProps)(Menu);