import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const InfoFormPanel = ({ handleChange, title, year, artist, description }) => {

    return (
        <Form>
            <Form.Group controlId="formTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                    type="text" value={title}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formYear">
                <Form.Label>Année</Form.Label>
                <Form.Control type="text" value={year}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formArtist">
                <Form.Label>Artiste</Form.Label>
                <Form.Control type="text" value={artist}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" value={description}
                    onChange={handleChange} rows="10"/>
            </Form.Group>
        </Form>
    );
}

InfoFormPanel.propTypes = {
    handleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default InfoFormPanel;