import React, {Component} from "react"
import {ScrollView, View} from 'react-native';
import {
    Button,
    Container,
    Content,
    List,
    ListItem, Right, Left, Thumbnail, Body, Text
} from 'native-base';

import {SUBSCRIPTION} from "../services/job.graphql";
import {Spinner} from "native-base";
import {Subscription} from "react-apollo";
import styles from "./HomeScreen.style";

class PendingJobsScreen extends Component {
    static navigationOptions = {
        header: null
    };
    handlePress = (jobId) => {
        this.props.navigation.navigate("JobDetail", {jobId});
    };
    render() {
        return <Container style={styles.container}>
            <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Subscription
                    subscription={SUBSCRIPTION.ALL_BY_DRIVER_ID_AND_STATUS}
                    variables={{driver: 4, status: ["PENDING", "ACCEPTED"]}}>
                    {
                        ({data, loading, error}) => {
                            if (loading) {
                                return <>
                                    <Spinner/>
                                    <Text style={{textAlign: "center"}}>Loading Jobs</Text>
                                </>
                            }
                            if (error) {
                                return <Text>"Network Error"</Text>
                            }
                            const applications = data.job_drivers;

                            return <ScrollView>
                                <List>
                                    {
                                        applications.map(({jobs, status}, key) => {
                                            const isPending = status === "PENDING";
                                            return <ListItem thumbnail key={key}>
                                                    <Left>
                                                        <Thumbnail
                                                            square
                                                            source={{uri: "https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"}}
                                                        />
                                                    </Left>
                                                    <Body>
                                                        <Text>{jobs.name}</Text>
                                                        <Text note numberOfLines={1}>{jobs.description || "No description"}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Button
                                                            success={!isPending}
                                                            transparent={isPending}
                                                            disabled={isPending}
                                                            onPress={() => this.handlePress(jobs.id)}
                                                        >
                                                            <Text>{isPending ? "Pending..." : "Start"}</Text>
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                        })
                                    }
                                </List>
                            </ScrollView>
                        }
                    }
                </Subscription>
            </Content>
        </Container>
    }
}

export default PendingJobsScreen;
