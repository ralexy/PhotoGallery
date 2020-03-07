import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const ReqForm = ({ fetchFromName, handleChange }) => {
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="formName">
                        <Form.Control type="text" 
                        placeholder="Entrez le nom de la galerie que vous voulez éditer" 
                        onChange={handleChange} />
                    </Form.Group>
                    <Button variant='primary' onClick={function () {
                        fetchFromName() }}>Envoyer</Button>
                </Col>
            </Row>
        </Form>
    );
}

ReqForm.propTypes = {
    fetchFromName: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
}


export default ReqForm;