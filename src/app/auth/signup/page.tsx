"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
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

import useSignup from "./useSignup";

const SignupPage: React.FC = () => {
  const {
    handleRegister,
    fullName,
    email,
    phoneNumber,
    password,
    formSubmited,
  } = useSignup();

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
        <form action="#!" method="POST" onSubmit={handleRegister}>
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
                type="text"
                label="Nome completo"
                inputRef={fullName}
                variant="standard"
                disabled={formSubmited}
                required
              />
            </FormControl>
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

            <FormControl>
              <TextField
                fullWidth
                type="tel"
                label="Número de telefone (opcional)"
                inputRef={phoneNumber}
                variant="standard"
                disabled={formSubmited}
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
              onClick={handleRegister}
              disabled={formSubmited}
            >
              {formSubmited ? "Registando..." : "Criar nova conta"}
            </Button>
            <Typography mt={3}>
              Caso você já tenha uma conta, clica em{" "}
              <Link href="/auth/login">
                <Button variant="text">Iniciar Sessão</Button>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
