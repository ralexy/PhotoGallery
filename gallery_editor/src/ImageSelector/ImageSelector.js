import React, { useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap/';
import PropTypes from 'prop-types';
import ImageCheckbox from './ImageCheckbox';
import GalleryImageInfoPanel from '../GalleryImageInfoPanel';
import { RES_DIR, FULL_SIZE_DIR, THUMB_DIR } from '../App';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function ImageSelector (props) {
    const onCheckboxClick = (isChecked, index) => {
        if (isChecked) {
            if (!(props.tempGallery.includes(props.images[index]))) {
                props.tempGallery.push(props.images[index]);
            }
        } else if (!isChecked) {
            if (props.tempGallery.includes(props.images[index])) {
                let i = props.tempGallery.indexOf(props.images[index]);
                props.tempGallery.splice(i, 1);
            }
        }
    };

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const target = useRef(null);

    const handleSelect = (selectedIndex, e) => {
        if (selectedIndex >= 0) {
            setIndex(selectedIndex);
            setDirection(e.direction);
        }
    };

    const handleThumbSelect = (e) => {
        //e.currentTarget.setAttribute('class', "active");
        let i = parseInt(e.currentTarget.getAttribute('data-key'));
        setIndex(i);
    }

    const popover = (
        <Popover id="newgallery-popover">
            <Popover.Title as="h3"
                style={{ backgroundColor: "#ff9696", }}>
                Erreur
            </Popover.Title>
            <Popover.Content
                style={{ backgroundColor: "#ff6464", }}>
                Vous n'avez sélectionné aucune image pour votre nouvelle gallerie.
            </Popover.Content>
        </Popover>
    );

    const fetchedCheck = (i) => {
        if(props.tempGallery.length > 0)
        {
            let img = props.tempGallery.find(
                function (img) {
                    return img.pictureId === props.images[i].pictureId
                }
            )
            if(img != null) {
                return img.hasOwnProperty('order')
            }
        } 

    }

    return (
        <div className="row">
            <div id="gallery-maker-main-column"
                className="col-md-8 jumbotron">
                <div className="imageSelector">
                    <div id="mainCarousel" className="carousel slide"
                        data-interval="false" data-ride="carousel">
                        <ol className="carousel-indicators overflow-auto">
                            {props.images.map(({ }, i) =>
                                (<li
                                    className={`${i === index ? "active" : ""}`}
                                    key={i}
                                >
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <ImageCheckbox
                                                imageIndex={i}
                                                onCheckboxClick={onCheckboxClick}
                                                ordered={props.images[i].hasOwnProperty('order')}
                                            />
                                        </div>
                                    </div>
                                    <img
                                        data-target="#mainCarousel"
                                        data-key={`${i}`}
                                        data-slide-to={`${i}`}
                                        src={props.images[i].thumbsUrl + props.images[i].fileName}
                                        alt={props.images[i].title}
                                        className="img-thumbnail"
                                        onClick={handleThumbSelect}
                                    />
                                </li>))
                            }
                        </ol>
                        <div style={{ margin: "1em" }}>
                            <OverlayTrigger trigger='focus' placement='right'
                                overlay={popover}>
                                <Button ref={target}
                                    onClick={props.newGalleryOnClick}
                                    variant="primary">
                                    Prendre les images sélectionnées pour former une nouvelle gallerie
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <Carousel
                            activeIndex={index}
                            slide={false}
                            indicators={false}
                            direction={direction}
                            onSelect={handleSelect}
                            interval={null} controls={true}>
                            {props.images.map(({ }, index) =>
                                (
                                    <Carousel.Item>
                                        <img
                                            src={props.images[index].url + props.images[index].fileName}
                                            alt={props.images[index].title}
                                            className="img-fluid d-block"
                                        />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div id="gallery-maker-side-panel" className="col-md-3 jumbotron">
                <GalleryImageInfoPanel
                    title={props.images[index].title}
                    year={props.images[index].year}
                    artist={props.images[index].artist}
                    description={props.images[index].description}
                />
            </div>
        </div>
    );
}

ImageSelector.propTypes = {
    parentApp: PropTypes.object.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            thumbsUrl: PropTypes.string.isRequired,
            fileName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    currentImageIndex: PropTypes.number.isRequired,
    tempGallery: PropTypes.array.isRequired,
    newGalleryOnClick: PropTypes.func.isRequired
}

export default ImageSelector

export const MOCK_GALLERY = [
    { url: "1.jpg", title: "Les Demoiselles d'Avignon", year: "1924", artist: "Pablo Picasso", description: loremIpsum },
    { url: "2.jpg", title: "Guernica", year: "1934", artist: "Pablo Picasso", description: loremIpsum },
    { url: "3.jpg", title: "Tructruc", year: "1920", artist: "Chelouzar", description: loremIpsum },
    { url: "4.jpg", title: "Vielle dame", year: "1864", artist: "Un mec", description: loremIpsum },
    { url: "Mona_Lisa.jpg", title: "La Joconde", year: "1540", artist: "Léonard De Vinci", description: loremIpsum },
    { url: "Nicolas_Poussin_-_Le_massacre_des_Innocents.jpg", title: "Le massacre des innoncents", year: "1625-1626", artist: "Nicolas Poussin", description: loremIpsum },
    { url: "Bacon_by_Gray_257.jpg", title: "Portrait of Francis Bacon", year: "1960", artist: "Reginald Gray", description: loremIpsum },
    { url: "Mathis_Gothart_Grünewald_062.jpg", title: "Le Christ outragé", year: "1503-1505", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Edouard_Manet,_A_Bar_at_the_Folies-Bergère.jpg", title: "Un bar aux Folies Bergère", year: "1882", artist: "Édouard Manet", description: loremIpsum },
    { url: "NPG_NPG_5205-001.jpg", title: "Man's Head (Self Portrait III)", year: "1963", artist: "Lucian Freud", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "Grunewald_Isenheim1.jpg", title: "Retable d'Issenheim", year: "1512-1516", artist: "Mathias Grünewald", description: loremIpsum },
    { url: "PARR-Martin-New-Brighton-Merseyside-The-Last-Resort.jpg", title: "New Brighton Merseyside (Série The Last Resort)", year: "1983-1985", artist: "Martin Parr", description: loremIpsum },
]
