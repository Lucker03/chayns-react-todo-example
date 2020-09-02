import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import './App/app.scss';

// Components
// import { Input } from 'chayns-components/lib';
import Headline from './App/Headline';
import Intro from './App/Intro';
import WebsiteList from './App/WebsiteList';
import Form from './App/Form';


// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
const App = () => {
    const [searchString, setSearchString] = useState('Ahaus');
    return (
        <>
            <Headline setSearchString={setSearchString} headline="My Favorite Sites" />
            <Intro intro="Dies ist meine Seite, wo Du auf die Suche nach verschiedenen Chayns Pages gehen kannst." />
            <WebsiteList searchString={searchString} />
            <Form />
        </>
    );
};

export default App;
export const HotApp = hot(App);
