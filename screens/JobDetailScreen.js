import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';

import styles from "./HomeScreen.style"
import gql from "graphql-tag";
import {Query} from "react-apollo";

import JobList from "../components/JobList"
import {Button} from "native-base";
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

export default class JobDetailScreen extends React.Component {
    handleApprove = () => {

    };

    render() {
        const { params } = this.props.navigation.state;
        console.log(params);
        return (
            <View>
                <Query query={query} variables={{jobId: params.jobId}}>
                    {
                        ({loading, error, data}) => {
                            if (loading) {
                                return <Text>"Loading Job"</Text>
                            }
                            const job = data.jobs[0];
                            return  <View>
                                <Text>{"Job Detail " + job.description}</Text>
                                <Button transparent onPress={this.handleApprove}>
                                    <Text>Details</Text>
                                </Button>
                            </View>
                        }
                    }
                </Query>
            </View>
        );
    }
}
