import { useForm } from "@inertiajs/inertia-react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    TextField,
} from "@mui/material";

export default function ContactItemForm({
    people,
    contact,
    listIcons,
    handleSubmit,
}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        id: contact?.id || '',
        people_id: people?.id || contact?.people_id,
        name: contact?.name || "phone",
        value: contact?.value || "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (contact?.id) {
            patch(route("contact.update", contact));
        } else {
            post(route("contact.store"));
        }

        reset();
        handleSubmit();
    };

    return (
        <Box
            component="form"
            sx={{
                px: 2,
                py: 1,
                borderRadius: 4,
                boxShadow: "1px 2px 7px 0px rgb(60 60 60 / 20%)",
            }}
            onSubmit={submit}
        >
            <ListItem>
                <ListItemAvatar>
                    {listIcons[data.name].component}
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <TextField
                            fullWidth
                            select
                            label="Tipo"
                            name="name"
                            value={data.name}
                            onChange={onHandleChange}
                            variant="standard"
                        >
                            {Object.keys(listIcons).map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    }
                    secondary={
                        <TextField
                            fullWidth
                            type={listIcons[data.name].type}
                            label={listIcons[data.name].label}
                            name="value"
                            value={data.value}
                            onChange={onHandleChange}
                            variant="standard"
                        />
                    }
                />
            </ListItem>
            <Box textAlign={"center"}>
                <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                >
                    {contact?.id ? "Atualizar" : 'Salvar'}
                </Button>
            </Box>
        </Box>
    );
}
