import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';

import {Thumbnail, Spinner} from "native-base"
import styles from "./HomeScreen.style"

import {SUBSCRIPTION} from "../services/job.graphql"
import driverGQL from "../services/driver.graphql"

import JobList from "../components/JobList"
import Subscription from "react-apollo/Subscriptions";
import Query from "react-apollo/Query";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    handleItemPress = (jobId) => {
        this.props.navigation.navigate("JobDetail", {jobId});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Query query={driverGQL.QUERY.FIND_BY_ID} variables={{id: 4}}>
                        {
                            ({loading, data, err}) => {
                                if (loading) {
                                    return <Spinner/>;
                                }
                                if (err) {
                                    return <Text>"Network Error"</Text>
                                }
                                const driver = data.drivers[0];
                                return <Subscription subscription={SUBSCRIPTION.FIND_AVAILABLE_JOBS}>
                                    {
                                        ({loading, error, data}) => {
                                            return <>
                                                    <View style={styles.userContainer}>
                                                        <Thumbnail large source={{uri: driver.image_url}}/>
                                                        <Text>{driver.username}</Text>
                                                    </View>

                                                    <ScrollView>
                                                        {!loading && <JobList
                                                            jobs={data.jobs}
                                                            onItemPress={this.handleItemPress}/>}
                                                        {loading && <>
                                                            <Spinner/>
                                                            <Text style={{textAlign: "center"}}>Loading Jobs</Text>
                                                        </>}
                                                    </ScrollView>
                                                </>
                                        }
                                    }
                                </Subscription>
                            }
                        }
                    </Query>
                </View>
            </View>
        );
    }
};
