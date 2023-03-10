"use client";
import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material";

import Download from "@mui/icons-material/Download";
import EyePreview from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

export default function Profile() {
  const theme = useTheme();

  const handleEditProfile = () => {};

  return (
    <Container component={Box} maxWidth="lg" mb={30}>
      <Box
        width="100%"
        bgcolor="darkgray"
        height={160}
        padding={5}
        zIndex={-1}
        position="relative"
        mb={20}
      >
        <Box
          position="absolute"
          border={`2px solid ${theme.palette.primary.main}`}
          left={40}
          bottom={-80}
        >
          <Image
            src={"/assets/brand/logotipo.png"}
            width={150}
            height={150}
            alt="Foto do perfil do usuário"
          />
        </Box>
      </Box>

      <Box component="section">
        <Grid justifyContent="space-between" container>
          <Grid xs={12} sm={6} md={6} lg={6} item>
            <Box
              display="flex"
              gap={3}
              justifyContent="flex-start"
              borderBottom="1px solid #ddd"
              paddingBottom={1}
              marginBottom={2}
            >
              <Button variant="text" startIcon={<EditIcon />}>
                Editar
              </Button>
              <Tooltip
                sx={{ fontSize: "1.2rem" }}
                title="Pré-visualizar"
                placement="top"
                arrow
              >
                <span>
                  <Button
                    onClick={() => window.print()}
                    aria-label="Pré-visualizar currículo"
                    variant="text"
                    endIcon={<EyePreview />}
                  >
                    Pré-visualizar
                  </Button>
                </span>
              </Tooltip>

              <Button variant="text" startIcon={<ShareIcon />}>
                Partilhar
              </Button>
            </Box>
            <Typography variant="h6" component="h1">
              Resumo:{" "}
            </Typography>
            <Typography mb={2}>
              I have more than 7 years of experience in manage great teams and
              build high quality products to a lot of industries from e-commerce
              products, cloud products, marketing tools until industrial
              robots.d
            </Typography>
            <Typography mb={2} gutterBottom>
              Nome: Adriano Alberto Lupossa
            </Typography>

            <Typography mb={2} gutterBottom>
              Cargo/Função: Software Enginner & Business Developer
            </Typography>

            <Typography mb={2} gutterBottom>
              Telefone: +244 943 223 929
            </Typography>

            <Typography mb={2} gutterBottom>
              Endereço: Luanda, Kilamba
            </Typography>

            <Typography mb={2} gutterBottom>
              E-mail: adrianolupossa@gmail.com
            </Typography>

            <Typography fontWeight="bold" gutterBottom>
              Sites e Links:
            </Typography>
            <Typography mb={2} gutterBottom>
              @adrianolupossa (Github & Linkedin)
            </Typography>

            <Typography fontWeight="bold">Experiência Profissional</Typography>
            <List>
              <ListItem>
                <ListItemText>Eadsoft/EadFast</ListItemText>
              </ListItem>
            </List>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={5} item>
            {/* <Typography variant="h6" component="h2" align="right">
              Pré-visualização
            </Typography> */}

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
              mb={3}
            >
              <TextField
                id="select-model"
                select
                helperText="Modelo de apresentação do curriculo"
                label="Modelo do currículo"
                defaultValue="coral"
                variant="standard"
                required
                className="mt-1"
              >
                <MenuItem value="coral">Coral</MenuItem>
                <MenuItem value="escritor">Escritor Moderno</MenuItem>
                <MenuItem value="serif">Serif</MenuItem>
              </TextField>

              <Tooltip
                sx={{ fontSize: "1.2rem" }}
                title="Baixar curriculo (PDF)"
                placement="top"
                arrow
              >
                <span>
                  <Button
                    onClick={() => window.print()}
                    aria-label="Baixar curriculo em PDF"
                    variant="text"
                    endIcon={<Download />}
                  >
                    Baixar
                  </Button>
                </span>
              </Tooltip>
            </Box>

            <Box component={Paper} height={500} padding={5}>
              Preview do curriculo
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
