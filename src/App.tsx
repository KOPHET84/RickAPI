import { useEffect, useState } from "react";
import "./App.css";
import { AppDispatch } from "./app/store";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks";
import { fetchCharacters } from "./features/charactersThunk";
import { choiceCharacter } from "./features/charactersSlice";
import { Container, Button, Box, Grid, Avatar } from "@mui/material";
import {
  StyledBox,
  StyledGrid,
  StyledInfo,
  StyledTypography,
} from "./pages/CardInformation/Card.styles";
import { ChoicePagesApi } from "./pages/CardInformation/CardDialog";
const App = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const character = useAppSelector((state) => state.character);
  const choice = useAppSelector((state) => state.character.choice);
  const [openDialog, setOpenDialog] = useState(false);
  const formData = character.characters[choice];

  useEffect(() => {
    dispatch(fetchCharacters("0"));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  if (character.status === "pending") {
    return (
      <>
        <img src="/dogRuning.gif" alt="gif" />
        <img src="/dogRuning.gif" alt="gif" />
        <img src="/dogRuning.gif" alt="gif" />
        <img src="/runBamby.gif" alt="gif" />
      </>
    );
  }
  if (character.status === "failed") {
    console.error(character.status);
    return (
      <>
        <img src="/error.gif" alt="gif" />
        <StyledTypography>please try to update</StyledTypography>
      </>
    );
  }
  return (
    <>
      {formData && (
        <Container maxWidth="sm">
          <StyledBox sx={{ backgroundColor: "#97bbb7" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenDialog}
            >
              Choice pages
            </Button>
            <StyledTypography>Character Form</StyledTypography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={formData.image || ""}
                alt="Character Image"
              />
            </Box>
            <Grid container spacing={3}>
              <StyledGrid size={6}>
                <StyledTypography>Name:</StyledTypography>
                <StyledInfo>{formData.name}</StyledInfo>
              </StyledGrid>
              <StyledGrid size={6}>
                <StyledTypography>Gender:</StyledTypography>
                <StyledInfo>{formData.gender}</StyledInfo>
              </StyledGrid>
              <StyledGrid size={6}>
                <StyledTypography>Status:</StyledTypography>
                <StyledInfo>{formData.status}</StyledInfo>
              </StyledGrid>
              <StyledGrid size={6}>
                <StyledTypography>Species:</StyledTypography>
                <StyledInfo>{formData.species}</StyledInfo>
              </StyledGrid>
              <StyledGrid size={6}>
                <StyledTypography>Origin:</StyledTypography>
                <StyledInfo>{formData.origin.name}</StyledInfo>
              </StyledGrid>
              <StyledGrid size={6}>
                <StyledTypography>Location:</StyledTypography>
                <StyledInfo>{formData.location.name}</StyledInfo>
              </StyledGrid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => dispatch(choiceCharacter("prev"))}
              >
                Reverse
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(choiceCharacter("next"))}
              >
                Forward
              </Button>
            </Box>
            {openDialog && (
              <ChoicePagesApi open={openDialog} onClose={handleCloseDialog} />
            )}
          </StyledBox>
        </Container>
      )}
    </>
  );
};
export default App;
