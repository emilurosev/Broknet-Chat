import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

const firebase = require('firebase');

export default function Settings(props) {

    const [userInfo, setUserInfo] = useState([]);
    //const [user, loading, error] = useAuthState(firebase.auth());
    const [email, setEmail] = useState('');


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
            return firebase.auth().onAuthStateChanged(_usr => {
                if(!_usr) {
                    props.history.push('/login');
                }
                else {  
                    setEmail(_usr.email);
                }
            });
        }
        check();
        
    }, [props.history]);

    useEffect(() => {
        console.log('use effect 2')
        async function data() {
            await firebase.firestore().collection('users').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if(doc.data().email === email) {
                        setUserInfo(doc.data());
                    }
                });
            });
        }
        data();
    }, [email]);


    return(
        <div>
            <Container style={{textAlign: "center"}}>
                <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                    <p style={{marginBottom: '2rem'}}>User id: {userInfo.uid}</p>

                    <Button style={{marginBottom: '2rem'}} variant='contained' color='secondary' onClick={props.goDarkFn}>Change theme</Button>
                    <br></br>
                    {
                        userInfo.private ?
                        <Button variant='contained'  color='secondary' onClick={setProfileToPublic}>Set profile to public</Button> :
                        <Button color='secondary' variant='contained' onClick={setProfileToPrivate}>Set profile to private</Button>
                    }
                </Paper>
            </Container>
         
        </div>
    );
}