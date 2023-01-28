import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

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
  return (
    <section>
      <Box
        bgcolor="#eee"
        padding={5}
        paddingX={20}
        minHeight={200}
        className="models"
        width="100%"
      >
        <Box
          className="label-models"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexGrow={1}
          paddingX={10}
          paddingBottom={2.5}
        >
          <Typography>Criar novo currículo</Typography>
          <Button
            variant="text"
            endIcon={<UnfoldMoreIcon />}
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
          gap={5}
          width="100%"
          display="flex"
          justifyContent="space-between"
          paddingX={10}
        >
          {curriculumModels.map((model, index: number) => (
            <Box className={`model-${index}`} key={model.name} padding="0">
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
