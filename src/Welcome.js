import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Grid, CssBaseline, Typography, Toolbar, Container } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
//<Grid item>
//<Button variant="contained" color="primary">
//Check the Coin FX
//</Button>
//</Grid>
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
        fontSize: 40,
    },
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export default function Welcome() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <MonetizationOnIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Bit Crash!
                        <Typography variant="caption" >
                            Supporter for your investment
                        </Typography>
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.content}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Bit Crash!
                        </Typography>
                        <Box p={3}>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Cryptocurrency investment is no longer difficult.
                                BitCrash starts by comparing capital gains among the world's top tier trader's country.
                                Investment Supporters for You
                                Bit Crash is with you.
                            </Typography>
                        </Box>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">

                                <Grid item>
                                    <Button href='/#/coinfx' variant="outlined" color="primary">
                                        View whole chart
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}