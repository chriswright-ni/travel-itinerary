import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import ItineraryItem from "../components/ItineraryItem";
// import ItineraryTitle from "../components/ItineraryTitle";
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
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import DaySelectDrawer from "../components/DaySelectDrawer";
import TimeSelectDrawer from "../components/TimeSelectDrawer";

function ItineraryPage() {
  const {
    itinerary,
    setItinerary,
    addDay,
    removeDay,
    places,
    placesById,
    removeItem,
    setActiveDay,
    tripDetails,
    setTripDetails,
    moveItem,
    changeTime,
    calculateItineraryTimes,
    updateDayStartTime
  } = useItineraryContext();
  const [editMode, setEditMode] = useState(false);

  const [daySelectOpen, setDaySelectOpen] = useState(false); // Day select bottom drawer state on itinerary page
  const [timeSelectOpen, setTimeSelectOpen] = useState(false); // Time select bottom drawer state on itinerary page
  const [currentDayNumber, setCurrentDayNumber] = useState(null); // The current day number the item to be moved is in
  // const [itemIdToMove, setItemIdToMove] = useState(null); // The itinerary item id to be moved
  const [selectedItemId, setSelectedItemId] = useState(null); // Selected itinerary item for moving to another day or changing time
  const [selectedItem, setSelectedItem] = useState(null); // Selected itinerary item for moving to another day or changing time
  const [isDayStartTime, setIsDayStartTime] = useState(false); // Boolean sets to true if the day starting time is being changed

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Itinerary update: ", itinerary);
  // }, [itinerary]);

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
    setActiveDay(dayNumber);
    navigate("/search");
  };

  // When the user clicks the move to another day in the itinerary item card,
  // this function sets the itemId and currentDay of the selected item that will be moved
  const handleClickMoveItem = (itemIdToMove, currentDayNumber) => {
    setSelectedItemId(itemIdToMove);
    setCurrentDayNumber(currentDayNumber);
    setDaySelectOpen(true);
  };

  // When the user selects the day to move the item to in the bottom day select drawer,
  // this function calls the moveItem function
  const handleClickMoveItemDaySelect = (newDayNumber) => {
    moveItem(selectedItemId, currentDayNumber, newDayNumber);
    setDaySelectOpen(false);
  };

  // When the user selects the add to a new day optiob in the bottom day select drawer,
  // this function adds a new day, and calls the moveItem function with the newly
  // created day number
  const handleClickMoveItemNewDay = () => {
    const newDayNumber = addDay();
    moveItem(selectedItemId, currentDayNumber, newDayNumber);
    setDaySelectOpen(false);
  };

  // When the item change time button is clicked, this function sets item to change and the day number
  // before opening the time select drawer
  const handleClickChangeTime = (itemToChange, dayNumber) => {
    // console.log("itemToChange: ", itemToChange);
    setSelectedItem(itemToChange);
    // console.log("selectedItem: ", selectedItem);
    // console.log("selectedItem start Time: ", selectedItem.startTime)
    setCurrentDayNumber(dayNumber);
    setTimeSelectOpen(true);
  };

  const handleClickTimeSelect = (newStartTime, newEndTime) => {
    changeTime(selectedItemId, currentDayNumber, newStartTime, newEndTime);
    setTimeSelectOpen(false);
  };

  // When the day start time is clicked, this function sets the day number,
  // sets the flag indicating it is a day start time select and not an item time select,
  // before opening the time select drawer
  const handleClickChangeDayTime = (dayNumber) => {
    setCurrentDayNumber(dayNumber);
    setIsDayStartTime(true);
    setTimeSelectOpen(true);
  };

  const handleClickDayStartTimeSelect = (newStartTime) => {
    updateDayStartTime(currentDayNumber, newStartTime);
    setTimeSelectOpen(false);
  };

  const findDayId = (itemId) => {
    if (itinerary.some((day) => day.dayNumber === itemId)) {
      return itemId;
    }
    return itinerary.find((day) =>
      day.itineraryItems.some((item) => item.id === itemId)
    );
  };

  const handleDragEnd = (event, dayNumber) => {
    const { active, over } = event;
    console.log("Day number in handleDragEnd: ", dayNumber);

    if (over && active.id !== over.id) {
      setItinerary((prev) =>
        prev.map((day) => {
          if (day.dayNumber === dayNumber) {
            const oldIndex = day.itineraryItems.findIndex(
              (item) => item.id === active.id
            );
            const newIndex = day.itineraryItems.findIndex(
              (item) => item.id === over.id
            );
            const itineraryReordered = arrayMove(
              day.itineraryItems,
              oldIndex,
              newIndex
            );
            return { ...day, itineraryItems: itineraryReordered };
          } else {
            return day;
          }
        })
      );
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
    } = useSortable({
      id: itineraryItem.id,
      disabled: editMode ? false : true,
    });

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
          dayNumber={dayNumber}
          handleClickMoveItem={() =>
            handleClickMoveItem(itineraryItem.id, dayNumber)
          }
          handleClickChangeTime={() =>
            handleClickChangeTime(itineraryItem, dayNumber)
          }
        />
      </Grid>
    );
  };

  // console.log("itinerary ", itinerary);

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
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="trip-name"
              // label="What is your trip called?"
              value={tripDetails.tripName}
              variant="outlined"
              onChange={(e) =>
                setTripDetails((prev) => ({
                  ...prev,
                  tripName: e.target.value,
                }))
              }
              slotProps={{
                input: {
                  readOnly: editMode ? false : true,
                },
              }}
              fullWidth
            />
            <Button variant="outlined" onClick={() => navigate("/")}>
              New Trip
            </Button>
          </Box>

          <Button variant="outlined" onClick={handleClickEditItinerary}>
            {editMode ? "Done" : "Edit itinerary"}
          </Button>
          <Button variant="outlined">Optimise Route</Button>
        </Box>
        <Box>
          {itinerary.map((itineraryDay, index) => {
            // Generate itinerary day with dynamically generated start and end times
            const itineraryDayWithTimes = calculateItineraryTimes(
              itineraryDay,
              30
            );
            return (
              <Accordion
                key={itineraryDay.dayNumber}
                defaultExpanded={index === 0 ? true : false}
                sx={{
                  // borderRadius: 2,
                  mx: 2,
                  // mb: 2
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{
                    // backgroundColor: "primary.light",
                    border: "1px solid #E0E0E0",
                    overflow: "hidden",
                  }}
                >
                  <Box>
                    <Typography component="span">{`Day ${
                      itineraryDay.dayNumber
                    } ${
                      tripDetails.startDate
                        ? dayjs(tripDetails.startDate)
                            .add(index, "day")
                            .format("ddd D MMM")
                        : ""
                    }`}</Typography>

                    <Box
                      sx={{
                        typography: "button",
                        cursor: "pointer",
                        textTransform: "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("day start button clicked");
                        handleClickChangeDayTime(itineraryDay.dayNumber);
                      }}
                    >
                      {`Start at ${itineraryDay.dayStartTime}`}
                    </Box>
                  </Box>
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
                            <Typography>
                              No itinerary items added yet!
                            </Typography>
                          </Box>
                        ) : (
                          itineraryDayWithTimes.itineraryItems.map(
                            (itineraryItem) => (
                              <SortableItineraryItem
                                key={itineraryItem.id}
                                itineraryItem={itineraryItem}
                                dayNumber={itineraryDay.dayNumber}
                              />
                            )
                          )
                        )}
                      </Grid>
                    </SortableContext>
                  </DndContext>
                  <Button
                    variant="contained"
                    // fullWidth
                    onClick={() => {
                      handleClickAddItemToDay(itineraryDay.dayNumber);
                    }}
                  >
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
            );
          })}
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
        <DaySelectDrawer
          open={daySelectOpen}
          onClose={() => setDaySelectOpen(false)}
          itinerary={itinerary}
          handleDaySelect={handleClickMoveItemDaySelect}
          handleClickAddDay={handleClickMoveItemNewDay}
          itemId={selectedItemId}
        />
        <TimeSelectDrawer
          open={timeSelectOpen}
          onClose={() => {
            setTimeSelectOpen(false);
            setIsDayStartTime(false);
          }}
          // This component is used for both item time selection and day start time selection
          currentStartTime={
            isDayStartTime ? itinerary[currentDayNumber - 1].dayStartTime : selectedItem?.startTime
          }
          currentEndTime={selectedItem?.endTime}
          handleClickSetTime={isDayStartTime ? handleClickDayStartTimeSelect : handleClickTimeSelect}
        />
        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
