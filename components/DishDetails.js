import React, { Component } from "react"
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Button } from "react-native"
import { Card, Icon, Rating, AirbnbRating, Input } from "react-native-elements"
import { baseUrl } from "../shared/baseURL"
import { connect, MapStateToProps } from "react-redux"
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (payload) => dispatch(postComment(payload))
})
function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>
                    <Rating
                        readonly
                        startingValue={item.rating}
                    />
                </Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            author: '',
            comment: "",
            rating : 0
        }
        this.dishId = this.props.route.params.dishId
    }

    handleChange(input,val){
        console.log("ahlaaa")
        this.setState({
            [input] : val
        })
    }

    ratingCompleted(rating){
        console.log('cbn')
        this.setState(rating)
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    addComment(){
        let d = new Date();
        console.log("ahla")
        this.props.postComment({
            id:this.props.comments.comments.length,
            dishId:this.dishId,
            rating:this.state.rating,
            author: this.state.author,
            comment: this.state.comment,
            date : d.toISOString()
        })
    }

    render() {
        return (
            <ScrollView>
                <Details dish={this.props.dishes.dishes[+this.dishId]}
                    favorite={this.props.favorites.some(el => el == this.dishId)}
                    onPress={() => this.markFavorite(this.dishId)}
                    onPressComment={() => this.toggleModal()}
                    showModal={this.state.showModal}
                    postComment={() => this.postComment()}
                    handleChange = {()=>this.handleChange}
                    author={this.state.author}
                    comment={this.state.comment}
                    ratingCompleted = {()=>this.ratingCompleted}
                    postComment = {()=>this.addComment}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === this.dishId)} />
            </ScrollView>
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
            <>
                <Card
                    featuredTitle={props.dish.name}
                    image={{ uri: baseUrl + props.dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {props.dish.description}
                    </Text>
                    <View style={styles.iconsContainer}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={"pencil"}
                            type='font-awesome'
                            color='#f4511e'
                            onPress={() => props.onPressComment()}
                        />
                    </View>
                </Card>
                <Modal animationType={"slide"} transparent={false}
                    visible={props.showModal}
                    onDismiss={() => props.onPressComment()}
                    onRequestClose={() => props.onPressComment()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            fractions="{1}"
                            startingValue="{5}"
                            onFinishRating={(rating) => props.ratingCompleted(rating)}
                        />
                        <Input
                            placeholder='Author'
                            value= {props.author}
                            onChangeText={(author) => props.handleChange("author", author)}
                            leftIcon={
                                <Icon
                                    name={"user"}
                                    type='font-awesome'
                                />
                            }
                        />
                        <Input
                            placeholder='Comment'
                            value= {props.comment}
                            onChangeText={(comment) => props.handleChange("comment", comment)}
                            leftIcon={
                                <Icon
                                    name={"comments"}
                                    type='font-awesome'
                                />
                            }
                        />
                        <Button
                            onPress={() => { props.postComment() }}
                            color="#512DA8"
                            title="Submit"
                        />
                        <Button
                            onPress={() => { props.onPressComment() }}
                            color="#512DA8"
                            title="cancel"
                        />
                    </View>
                </Modal>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);


const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})