import Button from "@mui/material/Button";

function AddItemButton({handleClickAddItemToDay, itineraryDay}) {
  return (
    <Button
      variant="contained"
      // fullWidth
      onClick={() => {
        handleClickAddItemToDay(itineraryDay.dayNumber);
      }}
      sx={{ mt: 2, fontWeight: 700, fontSize: "0.85rem", borderRadius: "20px", py: 1 }}
    >
      + Add item
    </Button>
  );
}

export default AddItemButton;
