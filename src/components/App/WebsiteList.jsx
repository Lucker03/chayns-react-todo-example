import React, { useState, useEffect } from 'react';
import { SmallWaitCursor, Button } from 'chayns-components/lib';
import { PropTypes } from 'prop-types';
import WebsiteLayout from './WebsiteLayout';
import './app.scss';

// eslint-disable-next-line react/prop-types
const WebsiteList = ({ searchString }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [shownArray, setShownArray] = useState([]);

    const getData = async (skip) => {
        try {
            const fetchData = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${skip}&Take=20`);
            const jsonData = await fetchData.json();
            const data = jsonData.Data;
            setShownArray((prevList) => prevList.concat(data));
        } catch {
            console.log("fehler beim Laden");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getData(0);
    }, []);

    useEffect(() => {
        console.log("ArrayEffect", shownArray);
    }, [shownArray]);

    return (
        <div>
            {isLoading && <SmallWaitCursor show />}
            <div className="container">
                <div className="pages">
                    {shownArray.map((datas) => (
                        <WebsiteLayout
                            siteId={datas.siteId}
                            locationId={datas.locationId}
                            appstoreName={datas.appstoreName}
                            facebookId={datas.facebookId}
                        />
                    ))}
                </div>
            </div>
            <div className="more">
                <Button className="button" id="loadMore" onClick={() => getData(shownArray.length)}>Mehr Laden</Button>
            </div>
        </div>
    );
};

WebsiteLayout.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default WebsiteList;
