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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DayMenu from "../components/DayMenu";
import theme from "../themes/theme_five.js";
import AddItemButton from "../components/AddItemButton";
import DeleteDayDialog from "../components/DeleteDayDialog";
import { useNotificationContext } from "../contexts/NotificationContext";

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
    updateDayStartTime,
    expanded,
    setExpanded,
  } = useItineraryContext();

  const { showNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [daySelectOpen, setDaySelectOpen] = useState(false); // Day select bottom drawer state on itinerary page
  const [timeSelectOpen, setTimeSelectOpen] = useState(false); // Time select bottom drawer state on itinerary page
  const [currentDayNumber, setCurrentDayNumber] = useState(null); // The current day number the item to be moved is in
  // const [itemIdToMove, setItemIdToMove] = useState(null); // The itinerary item id to be moved
  const [selectedItemId, setSelectedItemId] = useState(null); // Selected itinerary item for moving to another day or changing time
  const [selectedItem, setSelectedItem] = useState(null); // Selected itinerary item for moving to another day or changing time
  const [isDayStartTime, setIsDayStartTime] = useState(false); // Boolean sets to true if the day starting time is being changed
  const [deleteDayDialogOpen, setDeleteDayDialogOpen] = useState(false); // State to control the delete day dialog
  const [dayNumberToRemove, setDayNumberToRemove] = useState(null); // The day to be removed to provide data to confirmation dialog

  // useEffect(() => {
  //   console.log("Itinerary update: ", itinerary);
  // }, [itinerary]);

  // Calls the addDay function and automatically expands the new day
  const handleClickAddDay = () => {
    const newDayNumber = addDay();
    setExpanded(newDayNumber);
    showNotification(`Day ${newDayNumber} added`);
  };

  // Calls the removeDay function and displays notification
  // If the day has items, a confirmation dialog opens
  const handleClickRemoveDay = (dayToRemove) => {
    if (dayToRemove.itineraryItems.length > 0) {
      console.log("Test 17:10: ", dayToRemove)
      setDayNumberToRemove(dayToRemove.dayNumber);
      setDeleteDayDialogOpen(true);
    } else {
      removeDay(dayToRemove.dayNumber);
      showNotification(`Day ${dayToRemove.dayNumber} removed`);
    }
  };

  // Calls the removeDay function from the remove day confirmation dialog
  const handleRemoveDay = (dayNumberToRemove) => {
    removeDay(dayNumberToRemove);
    showNotification(`Day ${dayNumberToRemove} removed`);
  };

  const handleClickRemoveFromItinerary = (itemIdToRemove, dayNumber) => {
    removeItem(itemIdToRemove, dayNumber);
    showNotification(`Item removed from Day ${dayNumber}`);
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
    setExpanded(newDayNumber);
    showNotification(`Item moved to Day ${newDayNumber}`);
  };

  // When the user selects the add to a new day option in the bottom day select drawer,
  // this function adds a new day, and calls the moveItem function with the newly
  // created day number
  const handleClickMoveItemNewDay = () => {
    const newDayNumber = addDay();
    moveItem(selectedItemId, currentDayNumber, newDayNumber);
    setDaySelectOpen(false);
  };

  // When the item change time button is clicked, this function sets item to change and the day number
  // before opening the time select drawer
  // NOTE: THIS FUNCTION MAY BE GETTING REMOVED
  const handleClickChangeTime = (itemToChange, dayNumber) => {
    // console.log("itemToChange: ", itemToChange);
    setSelectedItem(itemToChange);
    // console.log("selectedItem: ", selectedItem);
    // console.log("selectedItem start Time: ", selectedItem.startTime)
    setCurrentDayNumber(dayNumber);
    setTimeSelectOpen(true);
  };

  // Sets the updated itinerary item time using the time set in the time select drawer
  // NOTE: THIS FUNCTION MAY BE GETTING REMOVED
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

  // Sets the updated day start time using the time set in the time select drawer
  const handleClickDayStartTimeSelect = (newStartTime) => {
    updateDayStartTime(currentDayNumber, newStartTime);
    setTimeSelectOpen(false);
    showNotification(`Day ${currentDayNumber} start time updated`);
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
    showNotification(`Day ${dayNumber} reordered`);
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
    });

    const style = {
      transform: transform ? CSS.Transform.toString(transform) : undefined,
      transition,
      touchAction: "none",
    };

    return (
      // <Grid ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Grid>
        <ItineraryItem
          itineraryItem={itineraryItem}
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
          ref={setNodeRef}
          style={style}
          dragAttributes={attributes}
          dragListeners={listeners}
          isSelected={itineraryItem.id === selectedItemId}
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
              // UPDATE EDIT MODE FOR LOCAL TEXT UPDATE ONLY
              slotProps={{
                input: {
                  // readOnly: editMode ? false : true,
                },
              }}
              fullWidth
            />
            <Button variant="outlined" onClick={() => navigate("/")}>
              New Trip
            </Button>
          </Box>

          <Button variant="outlined">Optimise Route</Button>
        </Box>
        <Box sx={{ pb: 15 }}>
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
                  // defaultExpanded={index === 0 ? true : false}
                  expanded={expanded === itineraryDay.dayNumber}
                  onChange={() => {
                    setExpanded(
                      expanded === itineraryDay.dayNumber
                        ? null
                        : itineraryDay.dayNumber
                    );
                  }}
                  sx={{
                    // borderRadius: 2,
                    mx: 2,
                    mb: 1,
                    "&:before": {
                      display: "none",
                    },
                    // overflow: "hidden",
                  }}
                  elevation={0}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{
                      backgroundColor:
                        expanded === itineraryDay.dayNumber
                          ? "primary.selected"
                          : "transparent",
                      border: "1px solid #E0E0E0",
                      // border: "none",
                      // overflow: "hidden",
                      // padding: 0,
                      borderRadius: 2,
                      // "&:before": {
                      //   display: "none"
                      // }
                      // "& .Mui-focusVisible": {
                      //   outline: "none",
                      //   bgcolor: "transparent"
                      // },
                      "&:focus": {
                        outline: "none",
                        // bgcolor: "transparent"
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        // backgroundColor: "primary.light",
                        // border: "1px solid #E0E0E0",
                        // // overflow: "hidden",
                        // // bgcolor: "background.paper",
                        // borderRadius: 2,
                        // py: 1,
                        // px: 2,
                        // width: "100%",
                        // boxShadow: 2,
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>{`Day ${itineraryDay.dayNumber}`}</Typography>
                        <FiberManualRecordIcon
                          sx={{ fontSize: "0.375rem", mx: 1 }}
                        />
                        <Typography>{`${
                          tripDetails.startDate
                            ? dayjs(tripDetails.startDate)
                                .add(index, "day")
                                .format("ddd D MMM")
                            : "Mon 22 Dec" // CHANGE THIS
                        }`}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>{`Start at ${itineraryDay.dayStartTime}`}</Typography>
                        <FiberManualRecordIcon
                          sx={{ fontSize: "0.375rem", mx: 1 }}
                        />
                        <Typography>{`${itineraryDay.itineraryItems.length} ${
                          itineraryDay.itineraryItems.length > 1
                            ? "Items"
                            : "Item"
                        }`}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DayMenu
                        itineraryDay={itineraryDay}
                        handleClickRemoveDay={handleClickRemoveDay}
                        handleClickChangeDayTime={handleClickChangeDayTime}
                      />
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
                        items={itineraryDay.itineraryItems.map(
                          (item) => item.id
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        <Grid container spacing={2} direction={"column"}>
                          {itineraryDay.itineraryItems.length === 0 ? (
                            <Box
                              sx={{
                                border: `2px dashed ${theme.palette.text.secondary}`,
                                borderRadius: 2,
                                height: "120px",
                                backgroundColor: "background.paper",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography>
                                No itinerary items added yet!
                              </Typography>
                              <AddItemButton
                                handleClickAddItemToDay={() =>
                                  handleClickAddItemToDay(
                                    itineraryDay.dayNumber
                                  )
                                }
                                itineraryDay={itineraryDay}
                              />
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
                    {itineraryDay.itineraryItems.length === 0 ? (
                      ""
                    ) : (
                      <AddItemButton
                        handleClickAddItemToDay={() =>
                          handleClickAddItemToDay(itineraryDay.dayNumber)
                        }
                        itineraryDay={itineraryDay}
                      />
                    )}
                  </AccordionDetails>
                  {/* <AccordionActions>
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
                </AccordionActions> */}
                </Accordion>
              );
            })}
          </Box>
          <Box>
            <Button variant="outlined" fullWidth onClick={handleClickAddDay}>
              Add day
            </Button>
          </Box>
        </Box>
        <DaySelectDrawer
          open={daySelectOpen}
          onClose={() => {
            setDaySelectOpen(false);
            setSelectedItemId(null);
          }}
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
            isDayStartTime
              ? itinerary[currentDayNumber - 1].dayStartTime
              : selectedItem?.startTime
          }
          currentEndTime={selectedItem?.endTime}
          handleClickSetTime={
            isDayStartTime
              ? handleClickDayStartTimeSelect
              : handleClickTimeSelect
          }
        />
        <DeleteDayDialog
          open={deleteDayDialogOpen}
          onClose={() => setDeleteDayDialogOpen(false)}
          dayNumber={dayNumberToRemove}
          handleRemoveDay={handleRemoveDay}
        />
        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
