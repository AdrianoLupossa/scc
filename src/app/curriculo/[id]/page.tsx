"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
// import { ArrowBack, Download } from "@mui/icons-material";
import Draggable from "react-draggable";

// import { styled } from "@mui/material/styles";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Download from "@mui/icons-material/Download";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import TitleIcon from "@mui/icons-material/Title";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";

import SaveIcon from "@mui/icons-material/Save";
import useFabric from "./useFabric";

// TODO: Add a sidebar with all the actions separated by category (text, image, shape, etc).

export default function CurriculoPage() {
  const { back } = useRouter();

  const canvasEl = React.useRef<HTMLCanvasElement | null>(null);

  const { textActions, selectedObject } = useFabric({ canvasEl });

  // React.useEffect(() => {
  //   if (canvas) {
  //     document.querySelectorAll(".upper-canvas")[1]?.remove();
  //   }
  // }, [canvas]);

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
          zIndex={999}
          sx={{ cursor: "move" }}
        >
          <Box>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Negrito"
              arrow
            >
              <IconButton
                size="small"
                onClick={() => textActions.setTextBold(selectedObject)}
              >
                <FormatBoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Itálico"
              arrow
            >
              <IconButton
                size="small"
                onClick={() => textActions.setTextItalic(selectedObject)}
              >
                <FormatItalicIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Sublinhado"
              arrow
            >
              <IconButton
                size="small"
                onClick={() => textActions.setTextUnderlined(selectedObject)}
              >
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
              <IconButton
                size="small"
                onClick={() =>
                  textActions.setTextAlign({
                    align: "left",
                    text: selectedObject,
                  })
                }
              >
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="bottom-end"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha ao centro"
              arrow
            >
              <IconButton
                size="small"
                onClick={() =>
                  textActions.setTextAlign({
                    align: "center",
                    text: selectedObject,
                  })
                }
              >
                <FormatAlignCenterIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="right"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha á direita"
              arrow
            >
              <IconButton
                size="small"
                onClick={() =>
                  textActions.setTextAlign({
                    align: "right",
                    text: selectedObject,
                  })
                }
              >
                <FormatAlignRightIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tooltip sx={{ fontSize: "1.2rem" }} title="Título" arrow>
              <IconButton size="small" onClick={() => textActions.addTitle()}>
                <TitleIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              size="small"
              onClick={() =>
                textActions.setTextFontSize({
                  action: "-",
                  text: selectedObject,
                })
              }
            >
              <TextDecreaseIcon />
            </IconButton>

            {/* <Typography
              sx={{ border: "1px solid #ddd", borderRadius: 1, padding: 0.5 }}
            >
              {format.fontSize}
            </Typography> */}
            <IconButton
              size="small"
              onClick={() =>
                textActions.setTextFontSize({
                  action: "+",
                  text: selectedObject,
                })
              }
            >
              <TextIncreaseIcon />
            </IconButton>
          </Box>
        </Box>
      </Draggable>

      <Box gap={3} mt={3} pb={10}>
        <canvas
          style={{
            border: "1px solid #eee",
            boxShadow: "0 1px 3px 1px rgb(60 64 67 / 15%)",
          }}
          ref={canvasEl}
          width={794}
          height={1123.33}
        />
      </Box>
    </Container>
  );
}
