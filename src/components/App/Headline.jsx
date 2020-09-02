import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'chayns-components/lib';
import './app.scss';

// Use PureComponent instead of Component because it handles the shouldComponentUpdate method for u.
// If u want to define ur own shouldComponentUpdate logic use Component instead of PureComponent.
const Headline = ({ headline }) => (
    <div className="Suche">
        <h1>{headline}</h1>
        <Input className="input" id="textInp" placeholder="Suche" />
    </div>
);

Headline.propTypes = {
    headline: PropTypes.string.isRequired,
};

export default Headline;
