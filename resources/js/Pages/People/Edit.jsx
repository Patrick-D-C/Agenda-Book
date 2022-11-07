import React from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import {
    Box,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    IconButton,
} from "@mui/material";

import GuestLayout from "@/Layouts/GuestLayout";
import { ArrowBack } from "@mui/icons-material";

export default function Edit({ people }) {
    const { data, setData, patch, errors } = useForm({
        id: people.id,
        name: people.name,
        description: people.description,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route("people.update", people));
    };

    return (
        <GuestLayout>
            <Head title="Editar Contato" />
            <Box>
                <Link href="/">
                    <IconButton color="primary">
                        <ArrowBack />
                    </IconButton>
                </Link>
            </Box>
            <Container>
                <Box sx={{ textAlign: "center", pb: 8 }}>
                    <Typography variant="h4" component="h1">
                        Editar {people.name}
                    </Typography>
                </Box>
                <form onSubmit={submit}>
                    <Grid
                        container
                        spacing={2}
                        rowSpacing={3}
                        justifyContent="space-between"
                        alignItems="end"
                    >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                name="name"
                                value={data.name}
                                onChange={onHandleChange}
                                helperText={errors.name}
                                error={Boolean(errors.name)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                name="description"
                                variant="outlined"
                                value={data.description}
                                onChange={onHandleChange}
                                helperText={errors.description}
                                error={Boolean(errors.description)}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign={"center"}>
                            <Button type="submit" variant="contained">
                                Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </GuestLayout>
    );
}
