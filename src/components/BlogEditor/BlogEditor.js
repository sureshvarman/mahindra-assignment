/**
* Marker component to take care of the markers inside map
* @prop {String} icon
* @prop {String} text
*/
import React from 'react';
import {Link} from 'react-router';
import {FormGroup, FormControl, Row, Col, Grid, ControlLabel} from 'react-bootstrap';

class BlogEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('==', nextProps);
        this.props = nextProps;
    }

    onEdit = (name, e) => {
        this.props.onEdit(name, e.target.value);
    }

    onSubmit = (e) => {
        this.props.onSubmit();
        e.preventDefault();
        e.stopPropagation();
    }

    render () {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={6}>
                        <form>
                            <h1>{this.props.id ? this.props.id : ''}</h1>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl type="text" value={this.props.blogTitle} onChange={this.onEdit.bind(this, 'blogTitle')} />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Content</ControlLabel>
                                <FormControl type="textarea" value={this.props.content} onChange={this.onEdit.bind(this, 'content')} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="submit" onClick={this.onSubmit} />
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Grid>

        )
    }
}

export default BlogEditor;
