import Box from '@mui/joy/Box';
import InterestChip from './InterestChip';

const interests = ["Cafes", "Museums", "Shopping"];

function InterestSelector({onInterestSelect}) {

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: 'auto',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {interests.map((interest) => (
        <InterestChip label={interest} key={interest} onClick={() => onInterestSelect(interest)}/>
      ))}
    </Box>
  );
}

export default InterestSelector;