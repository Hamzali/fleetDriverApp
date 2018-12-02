import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import { MapView } from 'expo';
import {Query, Mutation} from "react-apollo";


import {Button} from "native-base";

import {QUERY, MUTATION} from "../services/job.graphql"
import {getRoute} from "../services/gmap.api"


const Marker = MapView.Marker;
const Polyline = MapView.Polyline;
export default class JobDetailScreen extends React.Component {
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
        const { params } = this.props.navigation.state;
        console.log(params);
        return (
                <Query query={QUERY.FIND_JOB_BY_ID} variables={{jobId: params.jobId}}>
                    {
                        ({loading, error, data}) => {
                            if (loading) {
                                return <Text>"Loading Job"</Text>
                            }
                            const job = data.jobs[0];
                            return  <>
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

                                <Text>{job.description != null ? job.description : "No description"}</Text>
                                <Text>{job.source} -> {job.destination}</Text>
                                <Text>{job.time}</Text>
                                <Text>{job.capacity}</Text>
                                <Text>{job.model}</Text>


                                <Mutation mutation={MUTATION.APPLY_FOR_JOB}>
                                    {
                                        (insert_job_drivers, {data}) => {
                                            return <Button
                                                full
                                                disabled={data != null}
                                                onPress={() => {
                                                    insert_job_drivers({variables: {job: params.jobId, driver: 4, status: "PENDING"}})
                                                        .then(console.log)
                                                        .catch(console.error)
                                                }}
                                            >
                                                <Text style={{color: "white"}}>{data ? "PENDING" : "APPLY"}</Text>
                                            </Button>
                                        }
                                    }
                                </Mutation>
                            </>
                        }
                    }
                </Query>
        );
    }
}
