import Chip from '@mui/material/Chip';

function InterestChip({label, onClick, selected}) {
  return (
    <Chip label={label} color="primary" variant={selected ? "filled" : "outlined"} onClick={onClick} />
  )
}

export default InterestChip;