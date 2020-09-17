import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import './App/app.scss';

// Components
// import { Input } from 'chayns-components/lib';
import Headline from './App/Headline';
import Intro from './App/Intro';
import WebsiteList from './App/WebsiteList';
import Form from './App/Form';

const App = () => {
    const [searchString, setSearchString] = useState();
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    return (
        <>
            <Headline searchString={searchString} setSearchString={setSearchString} headline="My Favorite Sites"/>
            <Intro className="first" intro="Dies ist meine Seite, wo Du auf die Suche nach verschiedenen Chayns Pages gehen kannst."/>
            <WebsiteList
                searchString={searchString}
                setSearchString={setSearchString}
                isLoadingFirst={isLoadingFirst}
                setIsLoadingFirst={setIsLoadingFirst}
            />
            {!isLoadingFirst && (
                <Form/>
            )}
        </>
    );
};

export default App;
export const HotApp = hot(App);
