import React from 'react';

// Use PureComponent instead of Component because it handles the shouldComponentUpdate method for u.
// If u want to define ur own shouldComponentUpdate logic use Component instead of PureComponent.
// eslint-disable-next-line react/prop-types
const Intro = ({ intro }) => (
    <div className="tapp__intro first">
        {intro}
    </div>
);

export default Intro;
