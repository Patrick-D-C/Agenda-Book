import React, {  useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import {
    Box,
    Grid,
    InputAdornment,
    List,
    TextField,
    Typography,
    Fab,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";

import GuestLayout from "@/Layouts/GuestLayout";
import PeopleItem from "@/Components/PeopleItem";

export default function Inicio({ list_people, create_url }) {
    const [listPeopleFiltered, setListPeopleFiltered] = useState(list_people);

    const filterList = _.debounce((search) => {
        const newList = list_people.filter(
            (people) =>
                people.name.toLowerCase().includes(search.toLowerCase()) ||
                people.description.toLowerCase().includes(search.toLowerCase())
        );
        setListPeopleFiltered(newList);
    }, 300);

    return (
        <GuestLayout>
            <Head title="Agenda" />
            <Box sx={{ textAlign: "center", pb: 5 }}>
                <Typography variant="h6" component="h1">
                    Bem-vindo a agenda
                </Typography>
            </Box>
            <Box sx={{ textAlign: "center", pb: 3 }}>
                <Typography variant="h5" component="h2">
                    Contatos
                </Typography>
            </Box>

            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="end"
            >
                <Grid item xs={11}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Pesquisa"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="white" />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => filterList(e.target.value)}
                    />
                </Grid>
            </Grid>
            <List
                sx={{
                    width: "100%",
                    maxHeight: "390px",
                    overflowY: "auto",
                }}
            >
                {listPeopleFiltered.map((people) => (
                    <PeopleItem key={people.id} people={people} />
                ))}
            </List>
            <Fab
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
                color="info"
                aria-label="Novo contato"
            >
                <Link href={create_url} title="Adicionar novo contato">
                    <Add />
                </Link>
            </Fab>
        </GuestLayout>
    );
}
