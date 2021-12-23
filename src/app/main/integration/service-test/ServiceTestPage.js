import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux'
import ServiceTestInputPanel from './components/ServiceTestInputPanel'
import ServiceTestHeader from './components/ServiceTestHeader'
import ServiceTestOutputPanel from './components/ServiceTestOutputPanel'
import * as actions from './store/actions'

const ServiceTestPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(actions.getIntegrationDataStart())
    })

    return (<React.Fragment>
        <div className={
            classes.root
        }>
            <Grid container>
                <Grid item
                    sm={4}
                    className={
                        classes.leftSide
                }>
                    <div className={
                        classes.reqPanel
                    }>
                        <ServiceTestInputPanel />
                    </div>

                </Grid>
                <Grid item
                    sm={8}
                    className={
                        classes.rightSide
                }>
                    <ServiceTestHeader/>
                    <ServiceTestOutputPanel/>
                </Grid>
            </Grid>
        </div>
    </React.Fragment>)
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "white"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    leftSide: {
        borderRight: "1px solid #c4c4c4"
    },
    apiName: {
        textAlign: "center"
    },
    rightSide: {
        padding: "10px 30px"
    }
}));


export default ServiceTestPage;
