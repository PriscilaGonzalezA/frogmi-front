import Layout from "../../../components/layout";
import React, {useEffect} from "react";
import {Box, Button, Card, CircularProgress, TextField} from "@mui/material";
import { useRouter } from 'next/router';
import axios from "axios";


const Comments = () => {
    const {
        query: { slug },
    } = useRouter();
    const [feature, setFeature] = React.useState(null);
    const [comment, setComment] = React.useState("");
    const [comments, setComments] = React.useState([]);

    useEffect(()=> {
        if (slug) getData();
    },[slug]);
    const getData = async (filters, page, per_page) => {
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}`;
        axios.defaults.headers.get['Content-Type'] =
            'application/json;charset=utf-8';
        const url = `${baseUrl}api/features/${slug}`;
        const resp = await axios({
            method: 'GET',
            url,
        });
        setFeature(resp.data)
        setComments(resp.data.comments)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}`;
        axios.defaults.headers.get['Content-Type'] =
            'application/json;charset=utf-8';
        const url = `${baseUrl}api/features/${slug}/comments`;
        const resp = await axios({
            method: 'POST',
            url,
            data: {body: comment},
        });
        let tempComments = comments
        tempComments.push(resp.data);
        setComments(tempComments);
        setComment("");
    }

    return (
        <Layout>
            { feature ?
                (<>
                        <h1>{feature.title}</h1>
                        <Box>
                            <label>Magnitud</label>: {feature.magnitude} <br/>
                            <label>Lugar</label>: {feature.place} <br/>
                            <label>Tsunami</label>: {feature.tsunami ? "Sí" : "No"} <br/>
                            <label>url</label>: <a href={feature.url}>{feature.url}</a> <br/>
                        </Box>
                        <h1>Comentarios:</h1>
                        <Box>
                            { comments.map((comment, index) => {
                                return (
                                    <Card variant={"outlined"} sx={{marginTop:"5px"}} key={index}>
                                        <label>Id:</label> {comment.id}<br/>
                                        <label>Comentario:</label> {comment.body}<br/>
                                        <label>Fecha:</label> {comment.created_at}<br/>
                                    </Card>
                                )
                            })}
                        </Box>

                        <h1>Agrega un comentario</h1>
                        <form onSubmit={(e)=>handleComment(e)}>
                            <TextField
                                hiddenLabel
                                id="comment"
                                name={"comment"}
                                variant="filled"
                                value={comment}
                                onChange={(e)=>{setComment(e.target.value)}}
                            />
                            <br/>
                            <Button
                                type={"submit"}
                                disabled={comment == null || comment == ""}
                            >
                                Comentar
                            </Button>
                        </form>

                    </>
                ) :
                <>
                <CircularProgress size={15} sx={{ marginLeft: '3px' }} />
            </>
            }

        </Layout>
    )
}

export default Comments;