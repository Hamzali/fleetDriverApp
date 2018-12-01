import React from 'react';
import {ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';

const JobListItem = ({jobId, companyName, companyId, source, destionation, description}) => {
    return <ListItem thumbnail>
        <Left>
            <Thumbnail square source={{src: require('../assets/images/robot-dev.png')}}/>
        </Left>
        <Body>
            <Text>{companyName}</Text>
            <Text note numberOfLines={1}>{description || "No description"}</Text>
            <Text note numberOfLines={1}>{source || "No description"}</Text>
            <Text note numberOfLines={1}>{destionation || "No description"}</Text>
        </Body>
        <Right>
            <Button transparent>
                <Text>Details</Text>
            </Button>
        </Right>
    </ListItem>
};

export default JobListItem;
