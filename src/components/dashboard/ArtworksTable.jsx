import React, {forwardRef, useEffect, useState} from "react";

import MaterialTable from "material-table";
import Delete from "@material-ui/icons/Delete";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {deleteArtworkByIdAC, getArtworksPreviewsByUserId} from "../../redux/artworkReducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, Route} from "react-router-dom";


const ArtworksTable = (props) => {

    const dispatch = useDispatch();
    const artworksPreviews = useSelector(state => {
        return state.artworkReducer.artworksPreviews;
    });
    const currentUser = useSelector(state => {
        return state.authReducer.currentUser
    });

    useEffect(() => {
        dispatch(getArtworksPreviewsByUserId(currentUser.userId));
    }, [currentUser]);

    const [artworkToEdit, setArtworkToEdit] = useState(null);

    const deleteArtwork = (artworkId, userId) => {
        dispatch(deleteArtworkByIdAC(artworkId, userId));
    };


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    return (
        <>
            <MaterialTable
                icons={tableIcons}
                title="User artworks"
                columns={[
                    {
                        title: 'Name',
                        field: 'name',
                        render: rowData => <NavLink to={`/artworks/id/${rowData.artworkId}`}>{rowData.name}</NavLink>
                    },
                ]}
                data={artworksPreviews}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => setArtworkToEdit(rowData.artworkId)
                    },
                    {
                        icon: Delete,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => deleteArtwork(rowData.artworkId, currentUser.userId)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />

                {artworkToEdit && <Redirect to={`/artwork-form/${artworkToEdit}`}/>}

        </>
    )
}

export default ArtworksTable;