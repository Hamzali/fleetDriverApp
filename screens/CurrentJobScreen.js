import React, {Component} from "react"
import {Alert, View} from 'react-native';
import styles from "./HomeScreen.style";
import {MapView} from "expo";
import {getRoute} from "../services/gmap.api";
import {Subscription} from "react-apollo";
import {SUBSCRIPTION} from "../services/job.graphql";
import {Button, Spinner, Text} from "native-base";
import JobDetailCard from "../components/JobDetailCard";

const Marker = MapView.Marker;
const Polyline = MapView.Polyline;
class CurrentJobScreen extends Component {
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

        return <Subscription
                    subscription={SUBSCRIPTION.ALL_BY_DRIVER_ID_AND_STATUS}
                    variables={{driver: 4, status: ["IN_PROGRESS"]}}>
                    {
                        ({data, loading, error}) => {
                            if (loading) {
                                return <Spinner/>
                            }
                            if (error) {
                                return <Text>Error</Text>
                            }

                            if (data.job_drivers.length <= 0) {
                                return <Text>No Active Job</Text>
                            }


                            const job = data.job_drivers[0].jobs;
                            return <>
                                <Text>{"Active Job"}</Text>
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
                                <JobDetailCard job={job} status={data.job_drivers[0].status}/>
                                <Button
                                    full>
                                    <Text>Finish Trip</Text>
                                </Button>
                            </>
                        }
                    }
                </Subscription>
    }
}

export default CurrentJobScreen;
