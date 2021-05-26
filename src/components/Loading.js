import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/#/">
                Coin FX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    COIN FX DataBase is Loading…<CircularProgress />
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'We provide optimal investment information.'}
                </Typography><br />
                <Typography variant="body2">Hana Bank API Provide KRW/USD exchange information</Typography> <br />
                <Typography variant="body2">Bithumb API Provide Coin Quote KRW Information</Typography><br />
                <Typography variant="body2">Cryptocompare API Provide Coin Quote USD Information</Typography><br />
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">We provide optimal investment information.</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}