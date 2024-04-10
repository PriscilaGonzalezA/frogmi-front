import React, {useEffect} from 'react';
import Layout from "../../components/layout";
import {DataGrid} from '@mui/x-data-grid';
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import axios from "axios";
import Link from "next/link";

export default function Features() {
    const [filter, setFilter] = React.useState({
        md: false,
        ml: false,
        ms: false,
        mw: false,
        me: false,
        mi: false,
        mb: false,
        mlg: false
    });
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 5,
        page: 0,
    });
    const [features, setFeatures] = React.useState([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.checked,
        });
    };

    useEffect(() => {
        const selected = []
        Object.keys(filter).forEach(key => {
            if (filter[key]){
                selected.push(key);
            }
        });
        getData(selected, paginationModel.page + 1, paginationModel.pageSize);
    }, [filter, paginationModel]);

    useEffect(()=>{
        getData([], paginationModel.page + 1, paginationModel.pageSize);
    },[])

    const getData = async (filters, page, per_page) => {
        setIsLoading(true)
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}`;
        axios.defaults.headers.get['Content-Type'] =
            'application/json;charset=utf-8';

        const url = `${baseUrl}api/features`;
        const resp = await axios({
            method: 'GET',
            url,
            params: { mag_type: filters, page, per_page },
        });

        setRowCount(resp.data.pagination.total)
        setFeatures([])
        customData(resp.data.data);
    }

    const customData = (data) => {
        const rows = [];
        Object.keys(data).forEach(key => {
            rows.push({
                    id: data[key].id,
                    type: data[key].type,
                    magnitude: data[key].attributes.magnitude,
                    place: data[key].attributes.place,
                    time: data[key].attributes.time,
                    tsunami: data[key].attributes.tsunami ? "Sí" : "No",
                    mag_type: data[key].attributes.mag_type,
                    title: data[key].attributes.title,
                    longitude: data[key].attributes.coordinates.longitude,
                    latitude: data[key].attributes.coordinates.latitude,
                    url: data[key].links.external_url
                },
            )
        });

        setFeatures(rows);
        setIsLoading(false);
    }

    const { md, ml, ms, mw, me, mi, mb, mlg } = filter;
    const columns = [
        { field: 'id', headerName: 'id', width: 70, sortable: false, renderCell: (params)=>(
            <Link href={`/features/${params.value}/comments`}>{params.value}</Link>
            ) },
        //{ field: 'type', headerName: 'Tipo', width: 130, sortable: false },
        { field: 'magnitude', headerName: 'Magnitud', width: 130, sortable: false },
        { field: 'place', headerName: 'Lugar', width: 90, sortable: false},
        {
            field: 'time',
            headerName: 'Hora',
            sortable: false,
            width: 160,
            //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        { field: 'tsunami', headerName: 'Tsunami', width: 90, sortable: false, valueGetter: (value, row) => `${row.tsunami ? "Sí" : "No"}`},
        { field: 'mag_type', headerName: 'Tipo de magnitud', width: 90, sortable: false},
        { field: 'title', headerName: 'Título', width: 90, sortable: false},
        { field: 'longitude', headerName: 'Longitud', width: 90, sortable: false},
        { field: 'latitude', headerName: 'Latitud', width: 90, sortable: false},
        { field: 'url', headerName: 'Url', width: 90, sortable: false},
    ];

    return (
        <Layout>
            <h1>Lista de movimientos telúricos</h1>
            <>
               <DataGrid
                   rowCount={rowCount}
                   paginationModel={paginationModel}
                   onPaginationModelChange={setPaginationModel}
                   loading={isLoading}
                   rows={features}
                   columns={columns}
                   pageSizeOptions={[5, 10]}
                   paginationMode="server"
               />
                <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Filtro magnitud</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={md} onChange={handleChange} name="md" />
                                    }
                                    label="md"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={ml} onChange={handleChange} name="ml" />
                                    }
                                    label="ml"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={ms} onChange={handleChange} name="ms" />
                                    }
                                    label="ms"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={mw} onChange={handleChange} name="mw" />
                                    }
                                    label="mw"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={me} onChange={handleChange} name="me" />
                                    }
                                    label="me"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={mi} onChange={handleChange} name="mi" />
                                    }
                                    label="mi"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={mb} onChange={handleChange} name="mb" />
                                    }
                                    label="mb"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={mlg} onChange={handleChange} name="mlg" />
                                    }
                                    label="mlg"
                                />
                            </FormGroup>
                        </FormControl>
                </Box>
            </>
        </Layout>
    );
}