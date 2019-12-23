import React from 'react';
import './HomePage.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import logo from '../b.svg';

export default function HomePage() {
    
    console.log(logo);

    return(

        <Container className={'center'}>
            <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                <Typography variant='h2'>Welcome to BrokNet Social Network!</Typography>
                <Typography style={{marginTop: '1rem', marginBottom: '5rem'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et erat vel ligula sollicitudin feugiat. Nam sed est quis metus tincidunt consectetur. Sed commodo ex et feugiat convallis. Aliquam nisl elit, laoreet et felis sed, volutpat fermentum est. Vestibulum venenatis augue non diam mattis volutpat. Ut non nunc interdum, lobortis diam sit amet, dictum nunc. In convallis neque ac massa scelerisque bibendum. Pellentesque libero libero, scelerisque quis scelerisque ac, sagittis nec dolor. Sed hendrerit quis nibh vitae fringilla. Phasellus volutpat felis ex, eget porta est rutrum in. Donec euismod vestibulum risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce auctor facilisis erat non pulvinar. Cras vitae ultrices odio. Phasellus et dapibus sem.

                    Etiam tempus vulputate leo vel sagittis. Cras pharetra risus ut lectus maximus efficitur. Morbi in diam eu sapien porttitor luctus. Sed tincidunt velit leo, sed consectetur tortor luctus vulputate. Donec porttitor, est quis cursus efficitur, turpis nisl commodo turpis, aliquam gravida magna ante id massa. Phasellus egestas risus eget elit iaculis, ac gravida tortor scelerisque. Praesent molestie arcu velit, id pellentesque ipsum facilisis quis. Donec faucibus eget nibh quis finibus. Praesent tincidunt mauris ex, quis placerat quam tempor rhoncus. Praesent semper, mi a tempus porta, justo metus dignissim ante, mollis volutpat massa odio ac mi. Vestibulum at nisl nisl.

                    Praesent interdum mattis lobortis. Aenean nec scelerisque dolor. Quisque feugiat finibus nulla non ultricies. Quisque facilisis ac odio vitae lacinia. Etiam euismod luctus tempor. Fusce vel luctus libero, eu bibendum tortor. Phasellus non odio eu turpis euismod cursus. Ut tincidunt leo at lacus tristique vulputate. Maecenas pellentesque turpis quis tempus molestie.

                </Typography>
                <img src={logo} className={'App-logo'} alt='Logo'></img>
            </Paper>
        </Container>
    );
}