import React from 'react';
import PropTypes from 'prop-types';
import ImageCheckbox from './ImageCheckbox';
import {RES_DIR, THUMB_DIR} from '../App';

const ImageThumbs = ({ images, currentImageIndex, onCheckboxClick }) => (
    <ol className="carousel-indicators overflow-auto">
        {images.map(({ }, index) =>
            (
                <li
                    className={`${index === currentImageIndex ? "active" : ""}`}
                    key={index}
                >
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <ImageCheckbox
                                imageIndex={index}
                                onCheckboxClick={onCheckboxClick}
                            />
                        </div>
                    </div>
                    <img
                        data-target="#mainCarousel"
                        data-slide-to={`${index}`}
                        src={RES_DIR + THUMB_DIR + images[index].url}
                        alt={images[index].title}
                        className="img-thumbnail"
                        onClick={function (e) {
                            console.log(currentImageIndex)
                        }}
                    />
                </li>
            ))}
    </ol>
);

ImageThumbs.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    currentImageIndex: PropTypes.number.isRequired,
    onCheckboxClick: PropTypes.func.isRequired
}

export default ImageThumbs