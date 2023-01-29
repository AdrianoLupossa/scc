"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Stack,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

import useLogin from "./useLogin";

const LoginPage: React.FC = () => {
  const { handleLogin, email, password, formSubmited } = useLogin();

  return (
    <Container
      component="section"
      style={{ paddingTop: 10, paddingBottom: 50 }}
    >
      <Box
        width={400}
        boxShadow={1}
        borderBottom="1px solid #ddd"
        margin="auto"
        mt={5}
      >
        <form action="#!" method="POST" onSubmit={handleLogin}>
          <Stack padding={5} gap={2}>
            <Image
              style={{ margin: "auto" }}
              src="/assets/brand/logotipo.png"
              width={100}
              height={100}
              alt="Logotipo SCC"
            />

            <FormControl required>
              <TextField
                fullWidth
                type="email"
                label="E-mail"
                inputRef={email}
                variant="standard"
                disabled={formSubmited}
                required
              />
            </FormControl>

            <FormControl required>
              <TextField
                fullWidth
                type="password"
                label="Palavra-passe"
                inputRef={password}
                variant="standard"
                disabled={formSubmited}
                required
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              style={{
                marginTop: 10,
              }}
              onClick={handleLogin}
              disabled={formSubmited}
            >
              {formSubmited ? "Logando..." : "Iniciar sessão"}
            </Button>
            <Typography mt={3}>
              Caso você não tenha uma conta, clica em{" "}
              <Link href="/auth/signup">
                <Button variant="text">Registar</Button>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
