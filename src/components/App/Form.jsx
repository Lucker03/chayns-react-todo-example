/* eslint-disable no-control-regex */
import React, { useState, useEffect } from 'react';
import { Accordion, Button, Input } from 'chayns-components/lib';

const Form = () => {
    const [valueName, setvalueName] = useState('');
    const [valueMail, setvalueMail] = useState('');
    const [valueUrl, setvalueUrl] = useState('');
    const [valueComment, setvalueComment] = useState('');
    const [disabledButton, setDisabledButton] = useState(true);
    const [accordionIsOpen, setAccordionIsOpen] = useState();
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (firstTime) {
            if (chayns.env.user.isAuthenticated) {
                setvalueName(chayns.env.user.name);
            }
            setFirstTime(false);
        }
        if (valueName && valueMail) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [valueName, valueMail]);

    const sendIntercom = () => {
        chayns.intercom.sendMessageToPage({
            text: (`Name: ${valueName}
             Mail: ${valueMail}
             Url: ${valueUrl}
             Kommentar: ${valueComment}`),
        }).then((data) => {
            if (data.status === 200) chayns.dialog.alert('', 'Danke für dein Feedback');
            setvalueMail('');
            setvalueUrl('');
            setvalueComment('');
            setAccordionIsOpen(false);
        });
    };

    const checkLoggedin = () => {
        if (!chayns.env.user.isAuthenticated) {
            chayns.addAccessTokenChangeListener(() => {
                sendIntercom();
            });
            chayns.login();
        } else {
            sendIntercom();
        }
    };
    return (
        <Accordion open={accordionIsOpen} head="Schicke uns Deine Page">
            <div className="accordion__content Form_content input-group">
                <Input
                    value={valueName}
                    onChange={setvalueName}
                    placeholder="Name"
                    dynamic
                    required
                />
                <Input
                    value={valueMail}
                    onChange={setvalueMail}
                    placeholder="E-Mail Adresse"
                    dynamic
                    required
                    // eslint-disable-next-line max-len
                    regExp={/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/}
                />
                <Input
                    value={valueUrl}
                    onChange={setvalueUrl}
                    placeholder="Adresse deiner Seite"
                    dynamic
                />
                <Input
                    value={valueComment}
                    onChange={setvalueComment}
                    placeholder="Kommentar"
                    dynamic
                />
                <div className="send input-group">
                    <Button className="button" disabled={disabledButton} id="ready" onClick={() => checkLoggedin()}>Abschicken</Button>
                </div>
            </div>
        </Accordion>
    );
};

export default Form;
