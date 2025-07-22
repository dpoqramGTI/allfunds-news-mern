import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import allfundsLogo from "@/assets/images/allfundsLogo.png";

export default function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={(theme) => ({
          [theme.breakpoints.down("xl")]: {
            px: 2,
          },
        })}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            px: 0,
            minHeight: "64px",
          }}
        >
          <Box
            component="img"
            src={allfundsLogo}
            alt="Allfunds - The largest digital ecosystem and Wealthtech"
            sx={{
              height: { xs: 30, md: 40 },
              objectFit: "contain",
            }}
          />
          <Box>
            <Button
              component={NavLink}
              to="/"
              color="inherit"
              sx={{
                mx: 1,
                "&.active": {
                  borderBottom: "2px solid white",
                  borderRadius: 0,
                },
              }}
            >
              Nuevas
            </Button>
            <Button
              component={NavLink}
              to="/archived"
              color="inherit"
              sx={{
                mx: 1,
                "&.active": {
                  borderBottom: "2px solid white",
                  borderRadius: 0,
                },
              }}
            >
              Archivadas
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
