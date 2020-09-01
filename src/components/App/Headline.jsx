import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'chayns-components/lib';

// Use PureComponent instead of Component because it handles the shouldComponentUpdate method for u.
// If u want to define ur own shouldComponentUpdate logic use Component instead of PureComponent.
const Headline = ({ headline, setSearchString }) => {
    return (
        <div>
            <h1>{headline}</h1>
            <Input placeholder="Suche" onClick={setSearchString}/>
        </div>
    );

};

Headline.propTypes = {
    headline: PropTypes.string.isRequired,
};

export default Headline;
