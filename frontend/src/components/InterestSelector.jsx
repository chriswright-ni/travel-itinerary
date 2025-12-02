import Box from '@mui/joy/Box';
import InterestChip from './InterestChip';

const interests = ["Museums", "Food & Drink", "History", "Shopping", "Iconic Sights", "Nature & Scenery"];

function InterestSelector({onInterestSelect, selected}) {

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        px: 0,
        overflow: 'auto',
        width: 'auto',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
        backgroundColor: "background.paper",
        borderRadius: 3
      }}
    >
      {interests.map((interest) => (
        <InterestChip label={interest} key={interest} onClick={() => onInterestSelect(interest)} selected={selected===interest}/>
      ))}
    </Box>
  );
}

export default InterestSelector;