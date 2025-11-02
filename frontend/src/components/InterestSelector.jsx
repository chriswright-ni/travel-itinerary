import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import InterestChip from './InterestChip';

const interests = ["Cafes", "Museums"];

function InterestSelector() {

  function handleClick(interest) {
    console.log(`${interest} clicked!`);
  }

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
        <InterestChip label={interest} key={interest} onClick={() => handleClick(interest)}/>
      ))}
    </Box>
  );
}

export default InterestSelector;