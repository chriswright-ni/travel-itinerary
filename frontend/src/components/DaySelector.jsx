import Box from '@mui/joy/Box';
import OptionChip from './OptionChip';
import { useItineraryContext } from "../contexts/ItineraryContext";


function DaySelector({onDaySelect, selected}) {

  const { itinerary, currentTrip } = useItineraryContext();

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
      {currentTrip?.itinerary.map((itineraryDay) => (
        <OptionChip label={`Day ${itineraryDay.dayNumber}`} key={itineraryDay.dayNumber} onClick={() => onDaySelect(itineraryDay)} selected={selected===itineraryDay.dayNumber}/>
      ))}
    </Box>
  );
}

export default DaySelector;