import React from 'react'
import { FlatList, ScrollView, View, Text } from 'react-native'
import { ListItem, Card } from "react-native-elements"
import { baseUrl } from "../shared/baseURL"
import { connect, MapStateToProps } from "react-redux"
import Loading from "./Loading"
const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

const renderReturnItem = ({ item, index }) => {
    return (
        <ListItem
            key={index}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
            title={item.name}
            subtitle={item.description}
        />
    )
}

const History = (props) => {
    return <Card
        title={"Our History"}
    >
        <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                </Text>
        <Text>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
    </Card>
}

const AboutUs = (props) => {
    if (props.leaders.isLoading) {
        return (
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    else if (props.leaders.errMess) {
        return (
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Text>{props.leaders.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }
    else {
        return (
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <FlatList
                        data={props.leaders.leaders}
                        renderItem={renderReturnItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(AboutUs);