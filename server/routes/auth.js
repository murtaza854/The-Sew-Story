const router = require('express').Router();
const firebaseFile = require('../firebase');
const { getAuth, verifyPasswordResetCode, sendPasswordResetEmail, confirmPasswordReset, applyActionCode } = require('firebase/auth');
// const firebase = firebaseFile.firebase;

const auth = getAuth();

router.post('/reset-password-check', async (req, res) => {
    try {
        await verifyPasswordResetCode(auth, req.body.actionCode);
        res.json({ data: true });
    } catch (error) {
        res.json({ data: false });
    }
});

router.post('/send-password-reset-link', async (req, res) => {
    try {
        await sendPasswordResetEmail(auth, req.body.email);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/', async (req, res) => {
    try {
        var mode = req.body.mode;
        var actionCode = req.body.actionCode;
        var continueUrl = req.body.continueUrl || null;
        var lang = req.body.mode || 'en';
        let data;
        switch (mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                // handleResetPassword(auth, actionCode, continueUrl, lang);
                await confirmPasswordReset(auth, actionCode, req.body.password);
                res.json({ data: 'Reset success' });
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                // handleRecoverEmail(auth, actionCode, lang);
                break;
            case 'verifyEmail':
                // Display email verification handler and UI.
                // data = auth.handleVerifyEmail(firebase.auth(), actionCode, continueUrl, lang);
                await applyActionCode(auth, actionCode);
                res.json({ data: 'Email verified' });
                break;
            default:
                // Error: invalid mode.
                throw 'Invalid'
        }
    } catch (error) {
        res.json({ data: 'Invalid', error: error });
    }
});

module.exports = router;
