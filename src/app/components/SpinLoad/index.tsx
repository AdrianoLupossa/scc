import { useState, useEffect } from "react";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Box from "@material-ui/core/Box";

import { CircularProgress, Box } from "@mui/material";

export default function SpinLoad({
  fullScreen = false,
  fallback,
  temporary = false,
  size = 40,
}: {
  fullScreen?: boolean;
  fallback: string;
  temporary?: boolean;
  size?: number;
}) {
  const [showSpin, setShowSpin] = useState(temporary);

  useEffect(() => {
    if (temporary) {
      setTimeout(() => {
        setShowSpin(false);
      }, 5000);
    }
  }, [temporary]);

  return fullScreen ? (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {temporary ? (
        (showSpin && <CircularProgress size={size} color="primary" />) ||
        fallback ||
        "No data found!"
      ) : (
        <CircularProgress color="primary" />
      )}
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      {temporary ? (
        (showSpin && <CircularProgress size={size} color="primary" />) ||
        fallback ||
        "No data found!"
      ) : (
        <CircularProgress size={size} color="primary" />
      )}
    </Box>
  );
}

// SpinLoad.defaultProps = {
//   fullScreen: false,
//   temporary: false,
// };
