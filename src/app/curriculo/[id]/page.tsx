"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ArrowBack, Download } from "@mui/icons-material";
import Draggable from "react-draggable";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Paragraph = styled(Typography)(({ theme }) => ({
  cursor: "move",
  width: "fit-content",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function CurriculoPage() {
  const [editEl, setEditEl] = React.useState({});

  const { back } = useRouter();

  return (
    <Container maxWidth="md" component="section">
      <Box
        className="action-head"
        display="flex"
        justifyContent="space-between"
        my={4}
      >
        <Box display="flex" alignItems="center">
          <Button variant="text" onClick={() => back()}>
            <ArrowBack /> Curriculo Coral
          </Button>
        </Box>

        <Box>
          <Tooltip
            sx={{ fontSize: "1.2rem" }}
            title="Baixar curriculo (PDF)"
            arrow
          >
            <IconButton
              onClick={() => window.print()}
              aria-label="Baixar curriculo em PDF"
            >
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip
            sx={{ fontSize: "1.2rem" }}
            title="Ver todos os meus currículos"
            arrow
          >
            <IconButton aria-label="selector de arquivos">
              <FolderOpenIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" disabled={true}>
            Salvar
          </Button>
        </Box>
      </Box>
      <Box gap={3} mt={3} pb={10}>
        <Box
          border="1px solid #eee"
          boxShadow="0 1px 3px 1px rgb(60 64 67 / 15%)"
          width="100%"
          height={1223.33}
          padding={15}
        >
          <Draggable>
            <Paragraph
              tabIndex={0}
              onFocus={() =>
                setEditEl({
                  cursor: "move",
                  border: "1px solid yellow",
                })
              }
              onBlur={() =>
                setEditEl({
                  cursor: "default",
                  border: "none",
                })
              }
              sx={editEl}
              onDoubleClick={() =>
                setEditEl({
                  cursor: "default",
                  border: "1px solid yellow",
                  "-mozAppearance:": "textfield",
                  "-webkitAppearance": "textfield",
                  backgroundColor: "white",
                  boxShadow: "1px 1px 1px 0 lightgray inset",
                  font: "-moz-field",
                  marginTop: "5px",
                  padding: "2px 3px",
                  width: "398px",
                })
              }
            >
              Curriculo
            </Paragraph>
          </Draggable>
        </Box>
      </Box>
    </Container>
  );
}
