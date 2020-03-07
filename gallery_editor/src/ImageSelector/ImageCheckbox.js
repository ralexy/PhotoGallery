import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ImageCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.ordered
        };
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.onCheckboxClick();
    }

    onCheckboxClick= () => {
        this.props.onCheckboxClick(!this.state.isChecked, this.props.imageIndex)
    }


    render() {
        return (
            <div className="input-group mb-1">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input type="checkbox"
                            id={`cb${this.props.imageIndex}`}
                            aria-label="Checkbox for following text input"
                            checked={this.state.isChecked}
                            onChange={this.toggleChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ImageCheckbox.propTypes = {
    ordered: PropTypes.bool.isRequired,
    imageIndex: PropTypes.number.isRequired,
    onCheckboxClick: PropTypes.func.isRequired
}

export default ImageCheckbox