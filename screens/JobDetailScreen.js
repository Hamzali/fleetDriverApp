import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import { MapView } from 'expo';
import styles from "./HomeScreen.style"
import gql from "graphql-tag";
import {Query, Mutation} from "react-apollo";
import axios from "axios";

import JobList from "../components/JobList"
import {Button, Container} from "native-base";

const MAP_API_KEY = "AIzaSyDFz1mFqY6E2oiw5X661_Xnah9Wmofh1Ag";

const mode = 'driving';
const origin = 'istanbul';
const destination = 'ankara';
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${MAP_API_KEY}&mode=${mode}`;


const query = gql`
  query Job( $jobId: Int! ) {
    jobs(where: {id: {_eq: $jobId}}) {
    id,
    source,
    destination,
    description,
    companies {
      name,
      id
    }
    }
  }
`;


const mutation = gql`
mutation applyJob($driver: Int!, $job: Int!, $status: String!) {
    insert_job_drivers(objects:[
    {driver_id: $driver, job_id: $job, status: $status}
  ]) {
    returning {
      drivers {
        name
      }, jobs {
        id
      }
    }
  }
}
`;

const Marker = MapView.Marker;
const Polyline = MapView.Polyline;
export default class JobDetailScreen extends React.Component {
    state = {
        routes: []
    };

    handleApprove = () => {

    };

    async componentDidMount() {
        try {
            const {data} = await axios(url);
            console.log(data);
            const routes = this.decode(data.routes[0].overview_polyline.points);
            this.setState({routes});
        } catch (e) {
            console.error(e)
        }

    }

    decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


    render() {
        const { params } = this.props.navigation.state;
        console.log(params);
        return (
                <Query query={query} variables={{jobId: params.jobId}}>
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

                                <Text>{"Job Detail " + job.description}</Text>

                                <Mutation mutation={mutation}>
                                    {
                                        (insert_job_drivers, {data}) => {
                                            console.log(data);
                                            return <Button full onPress={() => {
                                                insert_job_drivers({variables: {job: params.jobId, driver: 4, status: "PENDING"}})
                                            }}>
                                                <Text>APPLY</Text>
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
