import { Box, Grid, styled, Typography } from "@mui/material";

export const StyledGrid = styled(Grid)({
  padding: "10px",
  backgroundColor: "#f4f4f4",
  borderRadius: "8px",
});
export const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: "bold",
  color: "#333",
}));

export const StyledInfo = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: "#555",
  fontFamily: "cursive",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #ddd",
  boxShadow: theme.shadows[2],
}));
