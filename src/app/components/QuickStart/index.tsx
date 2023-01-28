import { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useMediaQuery, useTheme } from "@mui/material";

type curriculumModelType = Array<{
  src: string;
  name: string;
}>;

const curriculumModels: curriculumModelType = [
  { src: "coral.png", name: "Coral" },
  { src: "escritor-moderno.png", name: "Escritor moderno" },
  { src: "serif.png", name: "Serif" },
  { src: "suico.png", name: "Suiço" },
  { src: "verde-hortela.png", name: "Verde hortelã" },
  { src: "coral.png", name: "Coral" },
  { src: "escritor-moderno.png", name: "Escritor moderno" },
  { src: "serif.png", name: "Serif" },
  { src: "suico.png", name: "Suiço" },
  { src: "verde-hortela.png", name: "Verde hortelã" },
];

// border-[1px] border-solid rounded-sm hover:border-blue-500"
const Curriculum = styled(Image)(({ theme }) => ({
  border: "1px solid transparent",
  cursor: "pointer",
  borderRadius: "3px",
  ":hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export default function QuickStart() {
  const [translate, setTranslate] = useState("-100%");
  const [modelToShow, setModelToShow] = useState(5);

  // Responsive Web Design - Conditional values
  //   const theme = useTheme();
  //   const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section>
      <Box
        bgcolor="#eee"
        padding={5}
        paddingX={20}
        minHeight={200}
        sx={{
          ":after": {
            content: '""',
            bgcolor: "#eee",
            position: "absolute",
            left: 0,
            padding: 5,
            width: "100%",
            height: 800,
            transition: "transform ease-in",
            transform: `translateY(${translate})`,
            zIndex: -1,
          },
        }}
        className="models"
        width="100%"
      >
        <Box
          className="label-models"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          overflow="hidden"
          width="100%"
          flexGrow={1}
          paddingX={10}
          paddingBottom={2.5}
        >
          <Typography>Criar novo currículo</Typography>
          <Button
            variant="text"
            endIcon={<UnfoldMoreIcon />}
            onClick={() => {
              if (modelToShow === 5) {
                setTranslate("0");
                setModelToShow(8);
              } else {
                setTranslate("-100%");
                setModelToShow(5);
              }
            }}
            sx={{
              textTransform: "initial",
              fontSize: 15,
              position: "relative",
              bottom: "5px",
            }}
          >
            Galeria de Modelos
          </Button>
        </Box>
        <Box
          className="models"
          gap={6}
          width="100%"
          display="flex"
          flexWrap="wrap"
          paddingX={10}
        >
          {curriculumModels
            .slice(0, modelToShow)
            .map((model, index: number) => (
              <Box
                className={`model-${index}`}
                key={`${model.name}-${index}`}
                padding="0"
              >
                <Curriculum
                  alt={model.name}
                  src={`/assets/curriculum/${model.src}`}
                  width={118}
                  height={150}
                />
                <Box display="flex" flexDirection="column">
                  <Typography>Curriculo</Typography>
                  <Typography variant="caption">{model.name}</Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </section>
  );
}
