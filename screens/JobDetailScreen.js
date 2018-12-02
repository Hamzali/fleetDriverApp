import React from 'react';

import {MapView} from 'expo';
import {Query, Mutation, Subscription} from "react-apollo";

import {Button, Text, Spinner} from "native-base";

import JobDetailCard from "../components/JobDetailCard"

import { MUTATION, SUBSCRIPTION} from "../services/job.graphql"
import {getRoute} from "../services/gmap.api"

import {Alert} from "react-native";


const Marker = MapView.Marker;
const Polyline = MapView.Polyline;
export default class JobDetailScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        routes: []
    };

    async componentDidMount() {
        try {
            const routes = await getRoute("istanbul", "ankara");
            this.setState({routes});
        } catch (e) {
            console.error(e)
        }

    }


    render() {
        const {params} = this.props.navigation.state;
        return (
            <Subscription subscription={SUBSCRIPTION.FIND_JOB_BY_ID} variables={{jobId: params.jobId, driver: 4}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return <>
                                <Spinner/>
                                <Text style={{textAlign: "center"}}>Loading Job</Text>
                            </>
                        }
                        if (error) {
                            return <Text>Network Error</Text>
                        }

                        const job = data.jobs[0];

                        const jobDriver = job.job_drives;
                        const isApplied = jobDriver.length > 0;

                        return <>
                            <MapView
                                style={{height: 300}}
                                initialRegion={{
                                    latitude: 41.0845869,
                                    longitude: 28.6302871,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                zoom={10}

                            >
                                <Marker coordinate={{
                                    latitude: 41.0845869,
                                    longitude: 28.6302871,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}/>

                                <Polyline
                                    coordinates={this.state.routes}
                                    strokeWidth={4}
                                />

                            </MapView>

                            <JobDetailCard job={job}/>

                            <Mutation mutation={MUTATION.APPLY_FOR_JOB}>
                                {
                                    (insert_job_drivers) => {
                                        return <Button
                                            full
                                            disabled={isApplied}
                                            onPress={() => {
                                                insert_job_drivers({
                                                    variables: {
                                                        job: params.jobId,
                                                        driver: 4,
                                                        status: "PENDING"
                                                    }
                                                })
                                                    .then(() => {
                                                        Alert.alert("Applied!");
                                                    })
                                                    .catch(() => Alert.alert("Failed to Apply!"))
                                            }}
                                        >
                                            <Text>{isApplied ? "PENDING" : "APPLY"}</Text>
                                        </Button>
                                    }
                                }
                            </Mutation>
                        </>
                    }
                }
            </Subscription>
        );
    }
}
