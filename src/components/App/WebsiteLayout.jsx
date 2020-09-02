import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import './app.scss';

function WebsiteLayout({ siteId, locationId, appstoreName }) {
    const [source, setSource] = useState('152342');

    const fetchImg = async () => {
        try {
            const response = await fetch(`https://sub60.tobit.com/l/${locationId}?size=57`);
            if (response.status === 200) {
                setSource(locationId);
            }
        } catch{
            // eslint-disable-next-line no-console
            console.log('Imgnotfound');
        }
    }

    useEffect(() => {
        fetchImg();
    }, []);
    return (
        <div className="pageDiv onepagearea" onClick={() => { chayns.openUrlInBrowser(`http://chayns.net/${siteId}`); }}>
            <div>
                <img className='byerrorpng' src={`https://sub60.tobit.com/l/${source}?size=57`} alt="This is the test Picture"/>
            </div>
            <div className="appstoreName">{appstoreName}</div>
        </div>
    );
}

WebsiteLayout.propTypes = {
    siteId: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    appstoreName: PropTypes.string,
};

WebsiteLayout.defaultProps = {
    appstoreName: '',
};

WebsiteLayout.displayName = 'WebsiteLayout';

export default WebsiteLayout;
