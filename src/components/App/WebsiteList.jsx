import React, { useState, useEffect } from 'react';
import { SmallWaitCursor, Button } from 'chayns-components/lib';
import { PropTypes } from 'prop-types';
import WebsiteLayout from './WebsiteLayout';
import './app.scss';

// eslint-disable-next-line react/prop-types
const WebsiteList = ({ searchString = 'Ahaus', isLoadingFirst, setIsLoadingFirst }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [shownArray, setShownArray] = useState([]);
    const [timeOutId, setTimeOutId] = useState(0);
    const [buttontimeOutId, setButtonTimeOutId] = useState(0);
    const [disabledButton, setDisabledButton] = useState(true);

    const getData = async (skip) => {
        try {
            setIsLoading(true);
            const fetchData = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${skip}&Take=20`);
            const jsonData = (await fetchData.json()).Data;
            setIsLoadingFirst(false);
            if (jsonData !== null) {
                setShownArray((prevList) => prevList.concat(jsonData));
            }
        } catch {
            // eslint-disable-next-line no-console
            console.log('fehler beim Laden');
        }
        setIsLoading(false);
    };

    const checkButton = (check) => {
        if (buttontimeOutId > 0) {
            clearTimeout(buttontimeOutId);
        }
        setButtonTimeOutId(setTimeout(() => {
            getData(check);
        }, 500));
    };

    useEffect(() => {
        if (timeOutId > 0) {
            clearTimeout(timeOutId);
        }
        setTimeOutId(setTimeout(() => {
            if (searchString !== '') {
                setShownArray([]);
                getData(0);
            }
            setTimeOutId(0);
        }, 500));
    }, [searchString]);

    useEffect(() => {
        if ((shownArray.length % 20) !== 0) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    }, [shownArray]);

    return (
        <div>
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
            <div className="send">
                {isLoading && <SmallWaitCursor show/>}
            </div>
            <div className="more">
                {!disabledButton && !isLoadingFirst && (
                    <Button className="button" id="loadMore" onClick={() => checkButton(shownArray.length)}>Mehr</Button>
                )}
            </div>
        </div>
    );
};

WebsiteLayout.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default WebsiteList;
