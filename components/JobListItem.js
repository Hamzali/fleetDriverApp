import React from 'react';
import {ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';

class JobListItem extends React.Component {
    handlePress = () => {
      const {jobId, onPress} = this.props;
      onPress(jobId);
    };
    render() {
        const {jobId, companyName, companyId, description, jobName} = this.props;
        return <ListItem thumbnail>
            <Left>
                <Thumbnail
                    square
                    source={{uri: "https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"}}
                />
            </Left>
            <Body>
                <Text>{jobName}</Text>
                <Text note>{companyName}</Text>
                <Text note numberOfLines={1}>{description || "No description"}</Text>
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
