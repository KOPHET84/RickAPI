import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../app/reduxHooks";
import { fetchCharacters } from "../../features/charactersThunk";
import { choicePage } from "../../features/charactersSlice";
export const ChoicePagesApi = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number | string>("");
  const handleSubmit = () => {
    dispatch(fetchCharacters(String(page)));
    dispatch(choicePage(String(page)));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <DialogTitle>Search box</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            autoFocus
            margin="dense"
            label="Write the page number"
            fullWidth
            variant="outlined"
            value={page}
            onChange={(e) => {
              if (+e.target.value < 43 && +e.target.value > -1)
                setPage(Number(e.target.value));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Box mb={2}>
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: "violet",
                color: "ActiveCaption",
                marginRight: "15px",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                backgroundColor: "violet",
                color: "ActiveCaption",
                marginLeft: "10px",
              }}
            >
              Load page {page}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
