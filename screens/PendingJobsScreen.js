import React, {Component} from "react"
import {ScrollView, Text, View} from 'react-native';
import {
    Container,
    Content,
    List
} from 'native-base';

import {SUBSCRIPTION} from "../services/job.graphql";
import {Spinner} from "native-base";
import {Subscription} from "react-apollo";
import styles from "./HomeScreen.style";

class PendingJobsScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return <Subscription
            subscription={SUBSCRIPTION.ALL_BY_DRIVER_ID_AND_STATUS}
            variables={{driver: 4, status: "PENDING"}}>
            {
                ({data, loading, error}) => {
                    if (loading) {
                        return <Spinner/>
                    }
                    if (error) {
                        return <Text>"Network Error"</Text>
                    }
                    console.log(data);
                    const applications = data.job_drivers;

                    return <Container style={styles.container}>
                        <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
                            {
                                applications.map(({jobs, status}, key) => {
                                    return <Text key={key}>{`status: ${status} id: ${jobs.id}`}</Text>
                                })
                            }
                        </Content>
                    </Container>
                }
            }
        </Subscription>
    }
}

export default PendingJobsScreen;
