import { Link } from "@inertiajs/inertia-react";
import { AccountCircle } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";

export default function PeopleItem({ people }) {
    return (
        <Box>
            <Link
                href={people.view_url}
                title={`Visualizar contato ${people.name}`}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{}}>
                            <AccountCircle
                                sx={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ wordBreak: "break-all" }}
                        primary={people.name}
                        secondary={people.description}
                    />
                </ListItem>
            </Link>
            <Divider variant="middle" component="li" />
        </Box>
    );
}
