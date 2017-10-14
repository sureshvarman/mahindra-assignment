/**
* Marker component to take care of the markers inside map
* @prop {String} icon
* @prop {String} text
*/
import React from 'react';
import {Link} from 'react-router';
import {FormGroup, FormControl, Row, Col, Grid, ControlLabel} from 'react-bootstrap';

class Blog extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
    }

    render () {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={6}>
                        <Row className="clearfix">
                        {this.props.title} <br/>
                        {this.props.content} <br/>
                        {this.props.createdBy == this.props.userId ? <Link to={`/blogs/edit/${this.props.id}`}>Edit</Link> : ''}
                        </Row>
                    </Col>
                </Row>
            </Grid>

        )
    }
}

export default Blog;
