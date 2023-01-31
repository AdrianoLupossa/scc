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

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import TitleIcon from "@mui/icons-material/Title";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";

import SaveIcon from "@mui/icons-material/Save";

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
          <IconButton>
            <SaveIcon />
          </IconButton>
        </Box>
      </Box>

      <Draggable>
        <Box
          boxShadow="1px 2px 20px #ddd"
          bgcolor="white"
          p={3}
          borderRadius={2}
          left={25}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          flexDirection="column"
          sx={{ cursor: "move" }}
        >
          <Box>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Negrito"
              arrow
            >
              <IconButton size="small">
                <FormatBoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Itálico"
              arrow
            >
              <IconButton size="small">
                <FormatItalicIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Sublinhado"
              arrow
            >
              <IconButton size="small">
                <FormatUnderlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip
              placement="left"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha á esquerda"
              arrow
            >
              <IconButton size="small">
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="bottom-end"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha ao centro"
              arrow
            >
              <IconButton size="small">
                <FormatAlignCenterIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="right"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha á direita"
              arrow
            >
              <IconButton size="small">
                <FormatAlignRightIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip sx={{ fontSize: "1.2rem" }} title="Título" arrow>
              <IconButton size="small">
                <TitleIcon />
              </IconButton>
            </Tooltip>

            <IconButton size="small">
              <TextDecreaseIcon />
            </IconButton>

            <IconButton size="small">
              <TextIncreaseIcon />
            </IconButton>
          </Box>
        </Box>
      </Draggable>

      <Box gap={3} mt={3} pb={10}>
        <Box
          border="1px solid #eee"
          boxShadow="0 1px 3px 1px rgb(60 64 67 / 15%)"
          width="100%"
          height={1223.33}
          padding={15}
          sx={{
            cursor: "text",
          }}
        >
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
        </Box>
      </Box>
    </Container>
  );
}
