import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';

import {MonoText} from '../components/StyledText';
import styles from "./HomeScreen.style"
import gql from "graphql-tag";
import {Query} from "react-apollo";

import JobList from "../components/JobList"
const query = gql`
  query {
  jobs {
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

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    handleItemPress = (jobId) => {
        this.props.navigation.navigate("JobDetail", {jobId});
    };
    render() {
        return (
            <Query query={query}>
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

/**
 <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
 <View style={styles.welcomeContainer}>
 <Image
 source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
 style={styles.welcomeImage}
 />
 </View>

 <View style={styles.getStartedContainer}>
 <Text style={styles.getStartedText}>Get started by opening</Text>

 <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
 <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
 </View>

 <Text style={styles.getStartedText}>
 Change this text and your app will automatically reload.
 </Text>
 </View>

 <View style={styles.helpContainer}>
 <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
 <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
 </TouchableOpacity>
 </View>
 </ScrollView>

 <View style={styles.tabBarInfoContainer}>
 <Text style={styles.tabBarInfoText}>in:</Text>

 <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
 <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
 </View>
 </View>
 */
