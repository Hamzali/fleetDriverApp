import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    List
} from 'native-base';
import {
    View
} from 'react-native';

import JobListItem from "./JobListItem"

class JobList extends Component {
    renderList = () => {
        const {jobs, onItemPress} = this.props;
        return jobs.map(({id, companies, description, source, destination}, key) =>
            <View key={key}>
                <JobListItem
                    jobId={id}
                    companyId={companies.id}
                    companyName={companies.name}
                    description={description}
                    source={source}
                    destination={destination}
                    onPress={onItemPress}
                />
            </View>
        )
    };

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {
                            this.renderList()
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

export default JobList;
