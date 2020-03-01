import React from 'react';
import PropTypes from 'prop-types';

const infoPanelStyle = {
    display: 'flex',
    alignItems: 'center'
}
const titleStyle = {
    fontSize: '2rem'
}
const subtitleStyle = {
    fontSize: '1.5rem'
}

const GalleryImageInfoPanel = ({ title, year, artist, description }) => (
    <div className="info-panel" style={infoPanelStyle}>
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4" style={titleStyle}>
                    {title}
                </h4>
                <h5 className="card-subtitle mb-4" style={subtitleStyle}>
                    {`${artist}, ${year}`}
            </h5>
                <p className="card-text">
                    {description}
                </p>
            </div>
        </div>
    </div>
);

GalleryImageInfoPanel.propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default GalleryImageInfoPanel;