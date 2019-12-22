import React from 'react';
import './HomePage.css';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

export default function HomePage() {
    return(
        <Container className={'center'}>
            <Paper style={{marginTop: '2rem'}}>
                <Typography variant='h2'>Welcome to BrokNet Social Network!</Typography>
                <Typography style={{marginTop: '1rem'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et erat vel ligula sollicitudin feugiat. Nam sed est quis metus tincidunt consectetur. Sed commodo ex et feugiat convallis. Aliquam nisl elit, laoreet et felis sed, volutpat fermentum est. Vestibulum venenatis augue non diam mattis volutpat. Ut non nunc interdum, lobortis diam sit amet, dictum nunc. In convallis neque ac massa scelerisque bibendum. Pellentesque libero libero, scelerisque quis scelerisque ac, sagittis nec dolor. Sed hendrerit quis nibh vitae fringilla. Phasellus volutpat felis ex, eget porta est rutrum in. Donec euismod vestibulum risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce auctor facilisis erat non pulvinar. Cras vitae ultrices odio. Phasellus et dapibus sem.

                    Etiam tempus vulputate leo vel sagittis. Cras pharetra risus ut lectus maximus efficitur. Morbi in diam eu sapien porttitor luctus. Sed tincidunt velit leo, sed consectetur tortor luctus vulputate. Donec porttitor, est quis cursus efficitur, turpis nisl commodo turpis, aliquam gravida magna ante id massa. Phasellus egestas risus eget elit iaculis, ac gravida tortor scelerisque. Praesent molestie arcu velit, id pellentesque ipsum facilisis quis. Donec faucibus eget nibh quis finibus. Praesent tincidunt mauris ex, quis placerat quam tempor rhoncus. Praesent semper, mi a tempus porta, justo metus dignissim ante, mollis volutpat massa odio ac mi. Vestibulum at nisl nisl.

                    Praesent interdum mattis lobortis. Aenean nec scelerisque dolor. Quisque feugiat finibus nulla non ultricies. Quisque facilisis ac odio vitae lacinia. Etiam euismod luctus tempor. Fusce vel luctus libero, eu bibendum tortor. Phasellus non odio eu turpis euismod cursus. Ut tincidunt leo at lacus tristique vulputate. Maecenas pellentesque turpis quis tempus molestie.

                    Cras laoreet dui nulla, id sodales felis imperdiet interdum. Quisque efficitur est lacus, eu malesuada odio feugiat quis. Pellentesque eu ligula varius, egestas nunc vitae, mollis turpis. In metus velit, venenatis vitae ullamcorper vel, tempor at nibh. Sed sodales eleifend lacus nec rhoncus. Etiam et porttitor nisl. Sed pretium est in turpis porta vestibulum. Suspendisse efficitur molestie porta. Mauris molestie sit amet nunc sed euismod. Proin pharetra auctor tellus, sed semper enim tempus quis. Nam hendrerit nunc rutrum urna auctor vulputate in eu felis.

                    Quisque id nunc sed arcu posuere aliquam. Praesent tristique ante ut nisl consectetur varius. Nam aliquam purus quis eros eleifend efficitur vitae id arcu. Nunc vel orci elementum nisi egestas efficitur. Duis euismod lectus sed dolor venenatis feugiat. Phasellus sed accumsan risus. Nulla porttitor bibendum tortor non luctus. Vivamus dictum sem eu ultrices eleifend. Morbi maximus felis ut leo volutpat, non blandit turpis sagittis. Donec eget sem vel libero tempus feugiat. 
                </Typography>
            </Paper>
        </Container>
    );
}