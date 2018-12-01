import React from 'react';
import {ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';

class JobListItem extends React.Component {
    handlePress = () => {
      const {jobId, onPress} = this.props;
      onPress(jobId);
    };
    render() {
        const {jobId, companyName, companyId, source, destination, description} = this.props;
        return <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{src: require('../assets/images/robot-dev.png')}}/>
            </Left>
            <Body>
            <Text>{companyName}</Text>
            <Text note numberOfLines={1}>{description || "No description"}</Text>
            <Text note numberOfLines={1}>{source || "No description"}</Text>
            <Text note numberOfLines={1}>{destination || "No description"}</Text>
            </Body>
            <Right>
                <Button transparent onPress={this.handlePress}>
                    <Text>Details</Text>
                </Button>
            </Right>
        </ListItem>
    }
}

export default JobListItem;
