import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Spinner } from 'native-base';

import PendingJobsScreen from "./PendingJobsScreen";
import CurrentJobScreen from "./CurrentJobScreen";


import {Query} from "react-apollo"
import {QUERY} from "../services/job.graphql"




export default class MyJobScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <Container style={styles.container}>
            <Tabs>
                <Tab heading="Pending Jobs">


                </Tab>
                <Tab heading="Active Job">
                    <CurrentJobScreen/>
                </Tab>
            </Tabs>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});
