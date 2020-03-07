import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const badgeStyle = {
    position: 'relative',
    top: '-5.4rem',
    left: '2rem'
}

const DraggableImage = ({ order, index, onClick, url, title, moveImage }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.DRAGGABLE_IMAGE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            //Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            //Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.DRAGGABLE_IMAGE, order, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drag(drop(ref))

    return (
        <div
            ref={ref}
            data-key={`${index}`}
            onClick={onClick}
        >
            <span
                className="badge badge-pill badge-dark"
                style={badgeStyle}>
                {`${index + 1}`}
            </span>
            <img
                className='img-thumbnail'
                src={url}
                alt={title}
            />
        </div>
    );
}

export default DraggableImage