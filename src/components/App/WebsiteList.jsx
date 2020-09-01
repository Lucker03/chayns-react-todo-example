import React, { useState, useEffect } from 'react';
import { SmallWaitCursor } from 'chayns-components/lib';
import { PropTypes } from 'prop-types';
import WebsiteLayout from './WebsiteLayout';

// eslint-disable-next-line react/prop-types
const WebsiteList = ({ searchString }) => {
    const [layoutComponent, setLayoutComponent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        const fetchData = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=0&Take=50`);
        const jsonData = await fetchData.json();
        const data = jsonData.Data;
        setIsLoading(false);
        // eslint-disable-next-line max-len
        setLayoutComponent(data.map((datas) => <WebsiteLayout siteId={datas.siteId} locationId={datas.locationId} appstoreName={datas.appstoreName} facebookId={datas.facebookId}/>));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {isLoading && <SmallWaitCursor show/>}
            {layoutComponent}
        </div>
    );
};

WebsiteLayout.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default WebsiteList;
