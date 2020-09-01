import React, { useState, useEffect } from 'react';
import WebsiteLayout from './WebsiteLayout';
import { SmallWaitCursor } from 'chayns-components/lib';

const WebsiteList = () => {
    const [layoutComponent, setLayoutComponent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        const fetchData = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=Ahaus&Skip=0&Take=50`);
        const jsonData = await fetchData.json();
        const data = jsonData.Data;
        setIsLoading(false);
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

export default WebsiteList;
