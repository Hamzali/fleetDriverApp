import React, {Component} from "react"
import {ScrollView, Alert} from 'react-native';
import {
    Button,
    Container,
    Content,
    List,
    ListItem,
    Right,
    Left,
    Thumbnail,
    Body,
    Text,
    Spinner
} from 'native-base';

import {MUTATION, SUBSCRIPTION} from "../services/job.graphql";
import {Mutation, Subscription} from "react-apollo";
import styles from "./HomeScreen.style";

class PendingJobsScreen extends Component {
    static navigationOptions = {
        header: null
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
                            const applications = data.job_drivers.filter(({status}) => {
                                return status === "ACCEPTED" || status === "PENDING";
                            });

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
                                                        <Mutation mutation={MUTATION.START_JOB} >
                                                            {
                                                                (update_job_drivers, {data}) => {
                                                                    return <Button
                                                                        success={!isPending}
                                                                        transparent={isPending}
                                                                        disabled={isPending}
                                                                        onPress={() => update_job_drivers({variables: {
                                                                                job: jobs.id,
                                                                                driver: 4
                                                                            }})
                                                                            .then(() => Alert.alert("Started"))
                                                                        }
                                                                    >
                                                                        <Text>{isPending ? "Pending..." : "Start"}</Text>
                                                                    </Button>
                                                                }
                                                            }
                                                        </Mutation>
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
