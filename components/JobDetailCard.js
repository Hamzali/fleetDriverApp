import React, {Component} from "react"

import {Container, Card, Content, CardItem, Text, Body} from "native-base"


class JobDetailCard extends Component {
    render() {
        const {job, status} = this.props;
        return  <Container style={{height: 300}}>
            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text>{job.name}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                        <Text>
                            Description: {job.description || "No description"}
                        </Text>
                        <Text>
                            {job.source} -> {job.destination}
                        </Text>
                        <Text>
                            Duration: {job.time}
                        </Text>
                        <Text>
                            Exp.: {job.experience}
                        </Text>
                        <Text>
                            Model: {job.model}
                        </Text>
                        <Text>
                            Capacity: {job.capacity}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Text>{status}</Text>
                    </CardItem>
                </Card>
            </Content>
            </Container>
    }
}

export default JobDetailCard;
