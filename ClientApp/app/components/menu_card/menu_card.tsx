import React, { type JSX } from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import Button from 'reactstrap';
import { Link } from 'react-router-dom';

export function MenuCard(name: string, image: string): JSX.Element {
    return (
        <Card tag={Link} to="/about"
            style={{
                width: '18rem'
            }}
        >
            <img src={image}/>
            <CardBody>
                <CardTitle>
                    {name}
                </CardTitle>
            </CardBody>
        </Card>
    );
}