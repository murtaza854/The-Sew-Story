import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { EmailVerified, AccountCreation, SendResetLink, ResetPassword, ResetPasswordCheck } from './components';
import './Auth.scss';
// import { Heading1 } from '../components';
// import resetPasswordCheck from './functions/resetPasswordCheck';
// import resetPassword from './functions/resetPassword';
// import recoverEmail from './functions/recoverEmail';
// import verifyEmail from './functions/verifyEmail';

function Auth(props) {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || null;
    const actionCode = params.get('oobCode') || null;

    let comp = <div />;
    if (mode === 'verifyEmail') comp = <EmailVerified mode={mode} actionCode={actionCode} />
    else if (mode === 'emailNotVerified') comp = <EmailVerified mode={mode} actionCode="" />
    else if (mode === 'accountCreation') comp = <AccountCreation />
    else if (mode === 'sendResetLink') comp = <SendResetLink />
    else if (mode === 'resetPassword') comp = <ResetPassword mode={mode} actionCode={actionCode} />
    else if (mode === 'resetSuccessful') comp = <ResetPasswordCheck title="Password Reset" message="Your password was successfully reset." />
    else if (mode === 'resetFailed') comp = <ResetPasswordCheck title="Password Reset" message="The link you used has either expired or used more than once." />

    return (
        <Container fluid className="auth">
            {
                mode === 'resetPassword' ? (
                    null
                ) : (
                    <Row className="justify-content-center margin-global-top-5">
                        <img src="/logo.png" alt="" />
                    </Row>
                )
            }
            {comp}
        </Container>
    );
}

export default Auth;