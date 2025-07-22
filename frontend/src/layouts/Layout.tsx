import { Container } from "@mui/material";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        disableGutters
        sx={(theme) => ({
          pt: 4,
          pb: 4,
          [theme.breakpoints.down("xl")]: {
            px: 2,
          },
        })}
      >
        {children}
      </Container>
    </>
  );
}
