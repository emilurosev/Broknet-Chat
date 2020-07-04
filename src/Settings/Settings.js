import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { Button, Typography } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

const firebase = require('firebase');

export default function Settings(props) {

    const [userInfo, setUserInfo] = useState([]);
    //const [user, loading, error] = useAuthState(firebase.auth());
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [uid, setUid] = useState(null);


    const setProfileToPrivate = async() => {
        await firebase.firestore().collection('users').doc(userInfo.uid).update(
            {private: true}
        );
        window.location.reload();
    }

    const setProfileToPublic = async() => {
        await firebase.firestore().collection('users').doc(userInfo.uid).update(
            {private: false}
        )
        window.location.reload();
    }

    useEffect(() => {
        console.log('use effect 1');
        function check() {
            return firebase.auth().onAuthStateChanged(async (_usr) => {
                if(!_usr) {
                    props.history.push('/login');
                }
                else {  
                    setEmail(_usr.email);
                    setEmailVerified(_usr.emailVerified);
                    setUid(_usr.uid);             
                }
            });
        }
        check();
        
    }, [props.history]);

    useEffect(() => {
        console.log('use effect 2')
        async function data() {
            const userRef = firebase.firestore().collection('users').doc(uid);
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                setUserInfo(doc.data());
            }
        }
        if(uid != null) {
            data();
        }
    }, [uid]);


    return(
        <div>
            <Container style={{textAlign: "center"}}>
                <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                <Typography variant='h5' style={{marginBottom: '1rem'}}>User id is {userInfo.uid}</Typography>
                    {
                        emailVerified ?
                        null :
                        <Typography variant='body2' color='error'>Email not verified</Typography>
                    }
                    <div style={{marginTop: '2rem', marginBottom: '2rem'}}></div>
                    {
                        userInfo.private ?
                        <Typography variant='body2' color='secondary'>Profile is private</Typography> :
                        <Typography variant='body2' color='secondary'>Profile is public</Typography> 

                    }
                    <br></br>
                    {
                        userInfo.private ?
                        <Button variant='contained'  color='secondary' onClick={setProfileToPublic}>Set profile to public</Button> :
                        <Button color='secondary' variant='contained' onClick={setProfileToPrivate}>Set profile to private</Button>
                    }
                    <br></br>
                    <Button style={{marginTop: '2rem'}} variant='contained' color='secondary' onClick={props.goDarkFn}>Change theme</Button>

                </Paper>
            </Container>
         
        </div>
    );
}