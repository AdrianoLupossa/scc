"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
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
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import RectangleIcon from "@mui/icons-material/Crop32";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";

import useFabric from "./useFabric";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Typography } from "@mui/material";

// TODO: Add a sidebar with all the actions separated by category (text, image, shape, etc).

const initialSelectionState = {
  bold: false,
  italic: false,
  underline: false,
  alignLeft: false,
  alignCenter: false,
  alignRight: false,
};

export default function CurriculoPage() {
  const { back } = useRouter();

  const canvasEl = React.useRef<HTMLCanvasElement | null>(null);

  const draggableEl = React.useRef(null);

  const [buttonSelected, setButtonSelected] = React.useState(
    initialSelectionState
  );

  const {
    canvas,
    selectedTextProps,
    textActions,
    canvasAction,
    selectedObject,
    ungroup,
  } = useFabric({
    canvasEl,
    actions: { clearButtonSelection },
  });

  const theme = useTheme();

  const selectedButtonStyle = {
    backgroundColor: "lightblue",
    color: theme.palette.primary.main,
  };

  // React.useEffect(() => {
  //   if (canvas) {
  //     document.querySelectorAll(".upper-canvas")[1]?.remove();
  //   }
  // }, [canvas]);

  React.useEffect(() => {
    if (!canvas) return;

    document.addEventListener("keydown", (event: any) => {
      if (!canvas.getActiveObject()) return;
      if (event.key === "Delete" && event.which === 46) {
        if (!canvas) return;

        canvas.getActiveObjects().forEach((activeObject) => {
          canvas.remove(activeObject);
        });

        setButtonSelected(initialSelectionState);
      } else if (event.keyCode == 90 && event.ctrlKey) {
        console.log("Control Z");
      }
    });
  }, [canvas]);

  React.useEffect(() => {
    setButtonSelected((buttonSelected) => ({
      ...buttonSelected,
      bold: selectedTextProps?.fontWeight === "bold",
      italic: selectedTextProps?.fontStyle === "italic",
      underline: Boolean(selectedTextProps?.underline),
      alignLeft: selectedTextProps?.textAlign === "left",
      alignCenter: selectedTextProps?.textAlign === "center",
      alignRight: selectedTextProps?.textAlign === "right",
    }));
  }, [selectedTextProps]);

  function clearButtonSelection() {
    setButtonSelected(initialSelectionState);
  }

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
            <span>
              <IconButton
                onClick={() => window.print()}
                aria-label="Baixar curriculo em PDF"
              >
                <Download />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            sx={{ fontSize: "1.2rem" }}
            title="Ver todos os meus currículos"
            arrow
          >
            <span>
              <IconButton aria-label="selector de arquivos">
                <FolderOpenIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip sx={{ fontSize: "1.2rem" }} title="Salvar alterações" arrow>
            <span>
              <IconButton>
                <SaveIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <Draggable ref={draggableEl}>
        <Box
          id="tools"
          className="formatting-tools"
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
          <Typography fontWeight="bold" fontSize={16} mb={2} gutterBottom>
            Toolbox
          </Typography>
          <Box>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Negrito"
              arrow
            >
              <span>
                <IconButton
                  component={IconButton}
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  onClick={() => {
                    textActions.setTextBold(selectedObject);
                    setButtonSelected({
                      ...buttonSelected,
                      bold: !buttonSelected.bold,
                    });
                  }}
                  style={buttonSelected.bold ? selectedButtonStyle : {}}
                >
                  <FormatBoldIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Itálico"
              arrow
            >
              <span>
                <IconButton
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  onClick={() => {
                    textActions.setTextItalic(selectedObject);
                    setButtonSelected({
                      ...buttonSelected,
                      italic: !buttonSelected.italic,
                    });
                  }}
                  style={buttonSelected.italic ? selectedButtonStyle : {}}
                >
                  <FormatItalicIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip
              placement="top"
              sx={{ fontSize: "1.2rem" }}
              title="Sublinhado"
              arrow
            >
              <span>
                <IconButton
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  onClick={() => {
                    textActions.setTextUnderlined(selectedObject);
                    setButtonSelected({
                      ...buttonSelected,
                      underline: !buttonSelected.underline,
                    });
                  }}
                  style={buttonSelected.underline ? selectedButtonStyle : {}}
                >
                  <FormatUnderlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip
              placement="left"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha á esquerda"
              arrow
            >
              <span>
                <IconButton
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  style={buttonSelected.alignLeft ? selectedButtonStyle : {}}
                  onClick={() => {
                    textActions.setTextAlign({
                      align: "left",
                      text: selectedObject,
                    });

                    setButtonSelected({
                      ...buttonSelected,
                      alignLeft: true,
                      alignCenter: false,
                      alignRight: false,
                    });
                  }}
                >
                  <FormatAlignLeftIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip
              placement="bottom-end"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha ao centro"
              arrow
            >
              <span>
                <IconButton
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  style={buttonSelected.alignCenter ? selectedButtonStyle : {}}
                  onClick={() => {
                    textActions.setTextAlign({
                      align: "center",
                      text: selectedObject,
                    });

                    setButtonSelected({
                      ...buttonSelected,
                      alignCenter: true,
                      alignLeft: false,
                      alignRight: false,
                    });
                  }}
                >
                  <FormatAlignCenterIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip
              placement="right"
              sx={{ fontSize: "1.2rem" }}
              title="Alinha á direita"
              arrow
            >
              <span>
                <IconButton
                  size="small"
                  disabled={
                    !Boolean(selectedObject) ||
                    !Boolean(selectedObject?.type === "textbox")
                  }
                  style={buttonSelected.alignRight ? selectedButtonStyle : {}}
                  onClick={() => {
                    textActions.setTextAlign({
                      align: "right",
                      text: selectedObject,
                    });

                    setButtonSelected({
                      ...buttonSelected,
                      alignRight: true,
                      alignLeft: false,
                      alignCenter: false,
                    });
                  }}
                >
                  <FormatAlignRightIcon />
                </IconButton>
              </span>
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
            <Button variant="text" onClick={() => ungroup()}>
              ungroup
            </Button>
            <IconButton
              size="small"
              disabled={
                !Boolean(selectedObject) ||
                !Boolean(selectedObject?.type === "textbox")
              }
              onClick={() =>
                textActions.setTextFontSize({
                  action: "-",
                  text: selectedObject,
                })
              }
            >
              <TextDecreaseIcon />
            </IconButton>

            {selectedTextProps &&
              Boolean(selectedObject?.type === "textbox") && (
                <Input
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    padding: 0,
                    width: 30,
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  onFocus={(e: any) => e.target.select}
                  type="text"
                  size="small"
                  readOnly
                  value={selectedTextProps.fontSize}
                />
              )}

            <IconButton
              disabled={
                !Boolean(selectedObject) ||
                !Boolean(selectedObject?.type === "textbox")
              }
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

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              size="small"
              onClick={() => canvasAction.addShape("circle")}
            >
              <CircleIcon />
            </IconButton>

            <Tooltip sx={{ fontSize: "1.2rem" }} title="Linha" arrow>
              <IconButton
                size="small"
                onClick={() => canvasAction.addShape("line")}
              >
                <HorizontalRuleIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              size="small"
              onClick={() => canvasAction.addShape("rect")}
            >
              <RectangleIcon />
            </IconButton>
          </Box>
        </Box>
      </Draggable>

      <Box gap={3} mt={3} pb={10}>
        <canvas
          style={{
            border: "1px solid #eee",
            boxShadow: "0 1px 3px 1px rgb(60 64 67 / 15%)",
            width: "704px",
            height: "1123.33px",
          }}
          ref={canvasEl}
          width={794}
          height={1123.33}
        />
      </Box>
    </Container>
  );
}
