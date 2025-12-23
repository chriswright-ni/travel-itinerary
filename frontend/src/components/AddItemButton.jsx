import Button from "@mui/material/Button";

function AddItemButton({handleClickAddItemToDay, itineraryDay}) {
  return (
    <Button
      variant="contained"
      // fullWidth
      onClick={() => {
        handleClickAddItemToDay(itineraryDay.dayNumber);
      }}
      sx={{ textTransform: "none", mt: 2, fontWeight: 700, fontSize: "1rem" }}
    >
      + Add item
    </Button>
  );
}

export default AddItemButton;
