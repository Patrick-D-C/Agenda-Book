import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import {
    Box,
    Container,
    Typography,
    Avatar,
    List,
    ListItemText,
    IconButton,
    Menu,
    ListItemIcon,
    MenuItem,
} from "@mui/material";

import GuestLayout from "@/Layouts/GuestLayout";
import {
    Add,
    ArrowBack,
    Call,
    Delete,
    Edit,
    Email,
    Facebook,
    Instagram,
    MoreVert,
    PhoneIphone,
    Remove,
    WhatsApp,
} from "@mui/icons-material";
import ContactItemForm from "@/Components/ContactItemForm";
import ContactItem from "@/Components/ContactItem";
import { Inertia } from "@inertiajs/inertia";

export default function Show({ people, edit_url, destroy_url }) {
    const arrayIcon = {
        phone: {
            component: <Call color="info" />,
            label: "Numero",
            type: "number",
        },
        cell_number: {
            component: <PhoneIphone color="warning" />,
            type: "number",
            label: "Numero",
        },
        whatsapp: {
            component: <WhatsApp color="success" />,
            label: "Numero",
            type: "number",
        },
        email: {
            component: <Email color="info" />,
            label: "E-mail",
            type: "email",
        },
        facebook: {
            component: <Facebook color="primary" />,
            label: "Nick",
            type: "text",
        },
        instagram: {
            component: <Instagram color="secondary" />,
            label: "Nick",
            type: "text",
        },
    };

    const [openNewItem, setOpenNewItem] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <GuestLayout>
            <Head title={`${people.name} - Visualizar Contato`} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Link href="/">
                    <IconButton color="primary">
                        <ArrowBack />
                    </IconButton>
                </Link>
                <Box onClick={handleClick}>
                    <IconButton color="info">
                        <MoreVert />
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <Link href={edit_url}>
                            <MenuItem>
                                <ListItemIcon>
                                    <Edit fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText>Editar</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem
                            onClick={() => Inertia.delete(destroy_url, people)}
                        >
                            <ListItemIcon>
                                <Delete fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Excluir</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Container>
                <Box sx={{ textAlign: "center", pb: 3 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                        }}
                    />
                    <Typography variant="h5" component="h2">
                        {people.name}
                    </Typography>
                    {people.description && (
                        <Typography variant="p" sx={{ wordBreak: "break-all" }}>
                            {people.description}
                        </Typography>
                    )}
                </Box>
                <Box textAlign={"right"}>
                    <IconButton
                        sx={{}}
                        color="info"
                        onClick={() => setOpenNewItem(!openNewItem)}
                    >
                        {openNewItem ? <Remove /> : <Add />}
                    </IconButton>
                </Box>
                {openNewItem && (
                    <ContactItemForm
                        people={people}
                        listIcons={arrayIcon}
                        handleSubmit={() => setOpenNewItem(!openNewItem)}
                    />
                )}
                <Box>
                    <List
                        sx={{
                            width: "100%",
                            maxHeight: "390px",
                            overflowY: "auto",
                            // bgcolor: "background.paper",
                        }}
                    >
                        {people.contacts?.map((contact) => (
                            <ContactItem
                                key={contact.id}
                                contact={contact}
                                listIcons={arrayIcon}
                            />
                        ))}
                    </List>
                </Box>
            </Container>
        </GuestLayout>
    );
}
