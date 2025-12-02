import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import ItineraryItem from "../components/ItineraryItem";
import ItineraryTitle from "../components/ItineraryTitle";
// import ItineraryActions from "../components/ItineraryActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useItineraryContext } from "../contexts/ItineraryContext";
import Grid from "@mui/material/Grid";
import PlaceCard from "../components/PlaceCard";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import AccordionActions from "@mui/material/AccordionActions";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

function ItineraryPage() {
  const {
    itinerary,
    setItinerary,
    addDay,
    removeDay,
    places,
    placesById,
    removeItem,
    setActiveDay
  } = useItineraryContext();
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Itinerary update: ", itinerary);
  }, [itinerary]);

  const handleClickAddDay = () => {
    addDay();
    console.log(places); // Test code
    console.log(placesById); // Test code
  };

  const handleClickRemoveDay = (dayToRemove) => {
    removeDay(dayToRemove);
  };

  const handleClickRemoveFromItinerary = (itemIdToRemove, dayNumber) => {
    removeItem(itemIdToRemove, dayNumber);
  };

  // Toggles the itinerary edit mode
  // In edit mode, the add day, remove day and remove item become visible
  const handleClickEditItinerary = () => {
    setEditMode((prev) => !prev);
    console.log(`edit mode: ${editMode}`);
  };

  const handleClickAddItemToDay = (dayNumber) => {
    setActiveDay(dayNumber)
    navigate("/")
  }

  const findDayId = (itemId) => {
    if (itinerary.some((day) => day.dayNumber === itemId)) {
      return itemId;
    }
    return itinerary.find((day) => day.itineraryItems.some((item) => item.id === itemId))
  }

  const handleDragEnd = (event, dayNumber) => {
    const { active, over } = event;
    console.log("Day number in handleDragEnd: ", dayNumber);

    if (over && active.id !== over.id) {
      setItinerary((prev) =>
        prev.map((day) => {
          if (day.dayNumber === dayNumber) {
            const oldIndex = day.itineraryItems.findIndex((item) => item.id === active.id);
            const newIndex = day.itineraryItems.findIndex((item) => item.id === over.id);
            const itineraryReordered = arrayMove(day.itineraryItems, oldIndex, newIndex);
            return {...day, itineraryItems: itineraryReordered}
          } else {
            return day;
          }
        }))
    }
  };

  // const handleDragOver = (event) => {
  //   const { active, over } = event;
    
  // };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const SortableItineraryItem = ({ itineraryItem, dayNumber }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: itineraryItem.id, disabled: editMode ? false : true});

    const style = {
      transform: transform ? CSS.Transform.toString(transform) : undefined,
      transition,
      touchAction: "none",
    };

    return (
      <Grid ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <ItineraryItem
          itineraryItem={itineraryItem}
          editMode={editMode}
          handleClickRemoveFromItinerary={() =>
            handleClickRemoveFromItinerary(itineraryItem.id, dayNumber)
          }
        />
      </Grid>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <Box sx={{mb: 2}}>
          <ItineraryTitle />

          <Button variant="outlined" onClick={handleClickEditItinerary}>
            {editMode ? "Done" : "Edit itinerary"}
          </Button>
          <Button variant="outlined">Optimise Route</Button>
        </Box>
        <Box>
          {itinerary.map((itineraryDay, index) => (
            <Accordion
              key={itineraryDay.dayNumber}
              defaultExpanded={index === 0 ? true : false}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{backgroundColor: "primary.light", borderBottom: "1px solid #E0E0E0"}}
              >
                <Typography component="span">{`Day ${itineraryDay.dayNumber}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) =>
                    handleDragEnd(event, itineraryDay.dayNumber)
                  }
                  // onDragOver={handleDragOver}
                >
                  <SortableContext
                    items={itineraryDay.itineraryItems.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Grid container spacing={2} direction={"column"}>
                      {itineraryDay.itineraryItems.length === 0 ? (
                        <Box>
                          <Typography>No itinerary items added yet!</Typography>
                        </Box>
                      ) : (
                        itineraryDay.itineraryItems.map((itineraryItem) => (
                          <SortableItineraryItem
                            key={itineraryItem.id}
                            itineraryItem={itineraryItem}
                            dayNumber={itineraryDay.dayNumber}
                          />
                        ))
                      )}
                    </Grid>
                  </SortableContext>
                </DndContext>
                <Button variant="outlined" fullWidth onClick={() => {handleClickAddItemToDay(itineraryDay.dayNumber)}}>
                  + Add an item
                </Button>
              </AccordionDetails>
              <AccordionActions>
                {editMode ? (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() =>
                      handleClickRemoveDay(itineraryDay.dayNumber)
                    }
                  >
                    Remove Day
                  </Button>
                ) : (
                  ""
                )}
              </AccordionActions>
            </Accordion>
          ))}
        </Box>
        <Box>
          {editMode ? (
            <Button variant="outlined" fullWidth onClick={handleClickAddDay}>
              Add day
            </Button>
          ) : (
            ""
          )}
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
