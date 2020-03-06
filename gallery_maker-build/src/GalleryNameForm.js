import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';


const NameForm = ({ name, desc, handleChange }) => {
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="formName">
                        <Form.Control type="text" placeholder="Entrez un nom pour votre gallerie" value={name} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formDesc">
                        <Form.Control type="text" placeholder="Description" value={desc} onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

NameForm.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}


export default NameForm;