import Chip from '@mui/material/Chip';

function OptionChip({label, onClick, selected}) {
  return (
    <Chip label={label} color="primary" variant={selected ? "filled" : "outlined"} onClick={onClick} />
  )
}

export default OptionChip;