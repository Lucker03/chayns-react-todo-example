import React from 'react';
import { PropTypes } from 'prop-types';

function WebsiteLayout({ siteId, locationId, appstoreName }) {
    return (
        <div onClick={() => { chayns.openUrlInBrowser(`http://chayns.net/${siteId}`); }}>

            <div>
                <object data={`https://sub60.tobit.com/l/${locationId}?size=57`} type="image/png">
                    <img src="https://chayns.tobit.com/storage/75508-06235/Images/icon-57.png" alt="Platzhalter"/>
                </object>
            </div>
            <div>{appstoreName}</div>
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
