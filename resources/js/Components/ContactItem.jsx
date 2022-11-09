import { Inertia } from "@inertiajs/inertia";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import { useState } from "react";
import ContactItemForm from "./ContactItemForm";

export default function ContactItem({ contact, listIcons }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return edit ? (
        <ContactItemForm
            contact={contact}
            listIcons={listIcons}
            handleSubmit={() => {
                setEdit(!edit);
                setOpen(false);
            }}
        />
    ) : (
        <Box key={contact.id}>
            <ListItem>
                <ListItemAvatar>
                        {listIcons[contact.name].component}
                </ListItemAvatar>
                <ListItemText
                    sx={{ wordBreak: "break-all" }}
                    primary={listIcons[contact.name].text}
                    secondary={contact.value}
                />
                <ListItemAvatar sx={{ minWidth: "auto" }}>
                    <IconButton onClick={handleClick}>
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
                        <MenuItem onClick={() => setEdit(true)}>
                            <ListItemIcon>
                                <Edit fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Editar</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                Inertia.delete("/contact/" + contact.id)
                            }
                        >
                            <ListItemIcon>
                                <Delete fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Excluir</ListItemText>
                        </MenuItem>
                    </Menu>
                </ListItemAvatar>
            </ListItem>
            <Divider variant="middle" component="li" />
        </Box>
    );
}
