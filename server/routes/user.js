const router = require('express').Router();
const firebaseFile = require('../firebase');
const firebaseAdmin = firebaseFile.admin;
const { signInWithEmailAndPassword, signOut, getAuth, signInWithCredential, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, updateProfile, sendPasswordResetEmail } = require('firebase/auth');
const userController = require('../controllers').user;
const subscribeController = require('../controllers').subscribe;

const auth = getAuth();

router.get('/getAllUsers', async (req, res) => {
    const users = await userController.getAll(await firebaseAdmin.auth().listUsers());
    if (!users) res.json({ data: [] });
    else res.json({ data: users });
});

router.post('/login', async (req, res) => {
    try {
        const response = await signInWithEmailAndPassword(auth, req.body.email.name, req.body.password.name);
        const user = response.user;
        if (!user.emailVerified) sendEmailVerification(user);
        const idToken = await user.getIdToken();
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        signOut(auth);
        res.json({ data: true });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.get('/get-logged-in', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        if (user) {
            const uid = user.uid;
            // const dbUser = await User.findOne({ uid: uid });
            const dbUser = await await userController.findByUid({ uid });
            res.json({ data: dbUser });
        } else res.json({ data: null })
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.get('/logout', async (req, res) => {
    try {
        await signOut();
        res.json({ data: null });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const email = user.email;
        const credential = EmailAuthProvider.credential(
            email,
            req.body.oldPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, req.body.password);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-email', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const email = user.email;
        const newEmail = req.body.email;
        const credential = EmailAuthProvider.credential(
            email,
            req.body.password
        );
        await reauthenticateWithCredential(user, credential);
        if (email !== newEmail) {
            await updateEmail(user, newEmail);
            sendEmailVerification(user);
            await userController.update({ email: newEmail, uid: user.uid });
            // dbUser.email = newEmail;
            // dbUser.save();
        }
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-owner-info', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        await updateProfile(user, {
            displayName: req.body.firstName,
        })
        await userController.update({ firstName: req.body.firstName, lastName: req.body.lastName, uid: user.uid });
        // dbUser.firstName = req.body.firstName;
        // dbUser.lastName = req.body.lastName;
        // dbUser.save();
        const displayName = user.name;
        const email = user.email;
        const emailVerified = user.emailVerified || user.email_verified;
        const admin = user.admin;
        res.json({ data: { displayName, email, emailVerified, admin }, check: true });
    } catch (error) {
        console.log(error);
        res.json({ check: false });
    }
});

router.post('/subscribe', async (req, res) => {
    try {
        await userController.updateByEmail({ subscribed: req.body.firstName, email: req.body.email });
        await subscribeController.createIfNotExists({ email: req.body.email });
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ check: false });
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

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const response = await createUserWithEmailAndPassword(auth, email.name, password.name);
        const user = response.user;
        await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: false });
        sendEmailVerification(user);
        await updateProfile(user, {
            displayName: firstName.name,
        })
        await userController.create({
            firstName: firstName.name,
            lastName: lastName.name,
            email: email.name,
            uid: user.uid,
        });
        // const newUser = new User({
        //     firstName: firstName.name,
        //     lastName: lastName.name,
        //     email: email.name,
        //     uid: user.uid,
        // });
        // newUser.save();
        await signOut();
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         const response = await signInWithEmailAndPassword(auth, req.body.email.name, req.body.password.name)
//         const user = response.user;
//         const idTokenResult = await user.getIdTokenResult();
//         const admin = idTokenResult.claims.admin;
//         const displayName = user.displayName;
//         const email = user.email;
//         const emailVerified = user.emailVerified;
//         if (!emailVerified) {
//             user.sendEmailVerification();
//             await firebase.auth().signOut();
//             throw "Email not verified";
//         } else res.json({ data: { displayName, email, emailVerified, admin } });
//     } catch (error) {
//         console.log(error);
//         res.json({ data: null, error: error });
//     }
// });

// router.get('/get-by-ids', async (req, res) => {
//     try {
//         let id = '';
//         if ('id' in req.query) id = req.query.id;
//         const getIds = id.split(',');
//         const users = await User.find({ _id: getIds });
//         res.json({ data: users });
//     } catch (error) {
//         res.json({ data: [], error: error });
//     }
// });

// router.post('/delete', async (req, res) => {
//     try {
//         const users = await User.find({ _id: req.body.ids }, { uid: 1 });
//         users.forEach(async user => {
//             await firebaseAdmin.auth().deleteUser(user.uid)
//         })
//         await User.deleteMany({ _id: req.body.ids });
//         res.json({ success: true });
//     } catch (error) {
//         res.json({ success: false, error: error });
//     }
// });

module.exports = router;