/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from './styles';
import { Languages } from "@common";
import SearchInput from './SearchInput';
import { View, Text, Keyboard, ScrollView } from 'react-native';
import ShipwayInAPI from "@services/ShipwayInAPI";
import moment from 'moment';

export default class TrackOrderScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object,
    };

    state = {
        orderId: '',
        order: null,
        activities: [],
        isLoading: false
    };

    componentDidMount = () => {
        const orderId = this.props.navigation.getParam('orderId');
        if (orderId) {
            this.getOrderShipmentDetails(orderId)
        }
    }

    getOrderShipmentDetails = async (orderId) => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true,
            orderId
        })
        try {
            let data = await ShipwayInAPI.getOrderShipmentDetails(orderId)
            if (data.response) {
                let order = data.response,
                    activities = [];
                for (let activity of order.scan) {
                    let index = activities.findIndex(item => item.day === moment(activity.time).format("YYYY-MM-DD"));
                    if (index >= 0) {
                        activities[index].data = [...activities[index].data, activity];
                    } else {
                        activities = [...activities, { day: moment(activity.time).format("YYYY-MM-DD"), data: [activity] }]
                    }

                }

                this.setState({
                    order,
                    activities: [...activities],
                    isLoading: false
                })
            }
        } catch (e) {
            this.setState({
                isLoading: false
            })
        }

    }

    onChangeOrderId = (value) => {
        this.setState({
            orderId: value
        })
    }

    render() {
        const { orderId, order, activities, isLoading } = this.state;
        return (
            <View style={styles.container}>
                <SearchInput
                    value={orderId}
                    onChangeText={this.onChangeOrderId}
                    onSearch={() => this.getOrderShipmentDetails(orderId)}
                    isLoading={isLoading}
                />
                <ScrollView>
                    {!isLoading ?
                        order ?
                        <View style={styles.orderDetailContainer} >
                            <View style={styles.header}>
                                <Text style={styles.headerText}>
                                    {order.current_status}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.leftColumn}>
                                    <Text>
                                        Carrier
                                </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text>
                                        {order.carrier}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.leftColumn}>
                                    <Text>
                                        Origin
                                </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text>
                                        {order.from}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.leftColumn}>
                                    <Text>
                                        Destination
                                </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text>
                                        {order.to}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.leftColumn}>
                                    <Text>
                                        Status Time
                                </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text>
                                        {order.time}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.leftColumn}>
                                    <Text>
                                        Recipient
                                    </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text>
                                        {order.recipient}
                                    </Text>
                                </View>
                            </View>
                            {activities.map(activity => <View>
                                <View style={styles.activityHeader}>
                                    <Text style={styles.activityHeaderText}>
                                        {activity.day}
                                    </Text>
                                </View>
                                {activity.data.map(data => <View style={styles.row}>
                                    <View style={styles.leftColumn}>
                                        <Text>
                                            {data.location}
                                        </Text>
                                    </View>
                                    <View style={styles.rightColumn}>
                                        <Text>
                                            {data.status_detail}
                                        </Text>
                                    </View>
                                    <View style={styles.rightColumn}>
                                        <Text>
                                            {moment(data.time).format("ddd, HH:mm")}
                                        </Text>
                                    </View>
                                </View>
                                )}

                            </View>
                            )}
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No Awb Found.</Text>
                        </View>
                        :
                        null
                    }
                </ScrollView>

            </View>
        );
    }
}
