import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {IGroup} from "./types";
import EditDialog from "../../components/EditDialog";
import GroupEditor from "./GroupEditor";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MembersList from "./members/MembersList";

interface IProps {
    data: IGroup
    onEdited: (data: any) => any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        largeIcon: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },

        rootPaper: {
            padding: theme.spacing(2),
            borderRadius: 0
        },
    }),
);

export default function Details({data, onEdited}: IProps) {
    const [dialog, setDialog] = useState<boolean>(false)
    const classes = useStyles()

    function handleClose() {
        setDialog(false)
    }

    function handleEdit() {
        setDialog(true)
    }

    function handleDelete() {
        //TODO implement delete
    }

    function handleEdited(dt: any) {
        setDialog(false)
        onEdited(dt)
    }

    return (
        <Box p={2} className={classes.root}>
            <Paper className={classes.rootPaper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box display='flex' pb={1}>
                            <Box pr={2}>
                                <Avatar className={classes.largeIcon}><PeopleIcon/></Avatar>
                            </Box>
                            <Box flexGrow={1}>
                                <Typography variant='h6'>{data.name}</Typography>
                                <Typography variant='body2'>{`${data.privacy}, ${data.category.name}`}</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' flexDirection='column'>
                            <Box>
                                <Typography variant='h6' style={{fontSize: '0.92rem'}}>Details</Typography>
                            </Box>
                            <Box>
                                <Typography variant='body2'>{data.details}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' flexDirection='column'>
                            <Box>
                                <Typography variant='h6' style={{fontSize: '0.92rem'}}>Members</Typography>
                            </Box>
                            <Box>
                                <MembersList data={data}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='flex-end' pt={2}>
                            <Button variant="outlined" color="default" size='small' onClick={handleDelete}>
                                Delete
                            </Button>
                            <Box pl={1}>
                                <Button variant="outlined" color="primary" size='small' onClick={handleEdit}>
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </Paper>

            <EditDialog open={dialog} onClose={handleClose} title='Edit Group'>
                <GroupEditor data={data} isNew={false} onGroupEdited={handleEdited}/>
            </EditDialog>
        </Box>
    );
}
