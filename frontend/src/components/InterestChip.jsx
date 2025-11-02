import Chip from '@mui/material/Chip';

function InterestChip({label, onClick}) {
  return (
    <Chip label={label} variant="outlined" onClick={onClick} />
  )
}

export default InterestChip;