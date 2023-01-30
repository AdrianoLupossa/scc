"use client";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Box, Typography, IconButton, Tooltip, Skeleton } from "@mui/material";

import QuickStart from "./components/QuickStart";

export default function Home() {
  return (
    <main>
      <QuickStart />
      <Box className="recent-documents" paddingTop={3} paddingX={22}>
        <Box
          className="action-head"
          display="flex"
          justifyContent="space-between"
        >
          <Typography>Documentos recentes</Typography>
          <Tooltip
            sx={{ fontSize: "1.2rem" }}
            title="Ver todos os meus currículos"
            arrow
          >
            <IconButton aria-label="selector-de-arquivos">
              <FolderOpenIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          className="documents"
          display="flex"
          flexWrap="wrap"
          gap={3}
          mt={3}
          pb={10}
        >
          <Skeleton variant="rectangular" width={208} height={254.67} />
          <Skeleton variant="rectangular" width={208} height={254.67} />
          <Skeleton variant="rectangular" width={208} height={254.67} />
          <Skeleton variant="rectangular" width={208} height={254.67} />
          <Skeleton variant="rectangular" width={208} height={254.67} />
          <Skeleton variant="rectangular" width={208} height={254.67} />
        </Box>
      </Box>
    </main>
  );
}
