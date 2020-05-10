import React from 'react';
import {Box} from "@material-ui/core";
import {remoteRoutes} from "../../data/constants";

import Navigation from "../../components/layout/Layout";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Header from "./Header";

import MaterialTable, { Column } from 'material-table';

interface IProps {
    data: any | null
    done?: () => any
}

interface Row {
    id: number;
    firstName: string;
    surname: string;
    ministry: string;
    profession: string;
}
  
interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const ListOfVolunteers = ({done}: IProps) => {
    const classes = useStyles();

    // For displaying the table data
    const [state, setData] = React.useState<TableState>({
        columns: [
          { title: 'First name', field: 'firstName' },
          { title: 'Surname', field: 'surname' },
          { title: 'Ministry', field: 'ministry' },
          { title: 'Profession', field: 'profession' },
        ],
        data: [
        ],
    });

    React.useEffect(() => {
        async function fetchVolunteers() {
            const res = await fetch(remoteRoutes.volunteers);
            const json = await res.json();
            setData({
                ...state,
                data:json
            })
        }
        fetchVolunteers();
    }, []);


    return(
        <Navigation>
            <Box p={1} className={classes.root}>
                <Header title="View volunteers" />
                <MaterialTable
                    title="Volunteers"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            
                            // Update user with id 3
                            fetch(remoteRoutes.volunteers + "/" + newData.id, {
                            headers: { "Content-Type": "application/json; charset=utf-8" },
                            method: 'PATCH',
                            body: JSON.stringify({
                                newData
                            })
                            })

                            setTimeout(() => {
                              resolve();
                              if (oldData) {
                                setData((prevState) => {
                                  const data = [...prevState.data];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                              }
                            }, 600);
                          }),
                      }}
                />
            </Box>
        </Navigation>
    );
}

export default ListOfVolunteers;