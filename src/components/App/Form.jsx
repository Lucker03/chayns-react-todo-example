import React, { useState, useEffect } from 'react';
import { Accordion, Button, Input } from 'chayns-components/lib';

const Form = () => {
    const [valueName, setvalueName] = useState('');
    const [valueMail, setvalueMail] = useState('');
    const [valueUrl, setvalueUrl] = useState('');
    const [valueComment, setvalueComment] = useState('');
    const [disabledButton, setDisabledButton] = useState(true);
    const [accordionIsOpen, setAccordionIsOpen] = useState();

    useEffect(() => {
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
            setvalueName('');
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
