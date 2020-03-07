import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import InfoFormPanel from './GalleryImageInfoFormPanel';
import DraggableImage from './DraggableImage';


const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."



function GalleryOrdener(props) {

    const [clicked, setClick] = useState(false);
    const [index, setIndex] = useState(0);
    const [gallery, setGallery] = useState(props.newGallery);

    const style = { paddingLeft: "0em", paddingRight: "0em" };

    const imageOnClick = (e) => {
        setClick(true);
        let i = parseInt(e.currentTarget.getAttribute('data-key'));
        setIndex(i);
    };

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'formTitle':
                {
                    let tempGallery = gallery;
                    tempGallery[index].title = e.target.value;
                    setGallery(tempGallery);
                }
                break;
            case 'formYear':
                {
                    let tempGallery = gallery;
                    tempGallery[index].year = e.target.value;
                    setGallery(tempGallery);
                }
                break;
            case 'formArtist':
                {
                    let tempGallery = gallery;
                    tempGallery[index].artist = e.target.value;
                    setGallery(tempGallery);
                }
                break;
            case 'formDescription':
                {
                    let tempGallery = gallery;
                    tempGallery[index].description = e.target.value;
                    setGallery(tempGallery);
                }
                break;
            default:
                break;
        }
    };

    const moveImage = useCallback(
        (dragIndex, hoverIndex) => {
            const dragImage = gallery[dragIndex];
            setGallery(
                update(gallery, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragImage],
                    ],
                }),
            );
        },
        [gallery],
    );

    return (
        <div className="container-fluid ml-1 mr-1">
            <div className="row">
                <div id="gallery-maker-backbutton"
                    style={style}>
                    <Button variant='secondary' size='lg'
                        style={{ borderRadius: "2em" }}
                        onClick={function () {
                            props.handleBackClick(gallery)
                        }}>
                        ❮
                    </Button>
                </div>
                <div id="gallery-maker-main-column"
                    className="col-md-8 jumbotron"
                    style={{ paddingTop: "1em" }}>
                    <div className="row"
                        style={{ justifyContent: "center", padding: "1em" }}>
                        <Button variant='primary' onClick={function () { props.handleSaveGallery(gallery) }}>Sauvegarder la galerie</Button>
                    </div>
                    <DndProvider backend={Backend}>
                        <div className="row">
                            {gallery.map((image, i) => (
                                <DraggableImage
                                    order={image.order}
                                    index={i}
                                    onClick={imageOnClick}
                                    url={image.thumbsUrl + image.fileName}
                                    title={image.title}
                                    moveImage={moveImage}
                                />

                            )
                            )}
                        </div>
                    </DndProvider>
                </div>
                <div id="gallery-maker-side-panel"
                    className="col-md-3 jumbotron"
                    style={style}>
                    {clicked &&
                        <InfoFormPanel
                            handleChange={handleChange}
                            title={gallery[index].title}
                            year={gallery[index].year}
                            artist={gallery[index].artist}
                            description={loremIpsum}
                        />
                    }
                </div>
            </div>

        </div>
    );
}

GalleryOrdener.propTypes = {
    newGallery: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            thumbsUrl: PropTypes.string.isRequired,
            fileName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            description: PropTypes.string
        })
    ).isRequired,
    handleBackClick: PropTypes.func.isRequired,
    handleSaveGallery: PropTypes.func.isRequired
}

export default GalleryOrdener;
