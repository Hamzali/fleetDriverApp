import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';


import styles from "./HomeScreen.style"
import {Query} from "react-apollo";

import {QUERY} from "../services/job.graphql"

import JobList from "../components/JobList"

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    handleItemPress = (jobId) => {
        this.props.navigation.navigate("JobDetail", {jobId});
    };
    render() {
        return (
            <Query query={QUERY.FIND_ALL}>
                {
                    ({loading, error, data}) => {
                        return <View style={styles.container}>
                            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                                {!loading && <JobList jobs={data.jobs} onItemPress={this.handleItemPress}/>}
                                {loading && <Text>"Loading Jobs"</Text>}
                            </ScrollView>
                        </View>
                    }
                }
            </Query>
        );
    }
}
