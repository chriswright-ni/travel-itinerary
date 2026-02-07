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
import AppBar from "../components/MainAppBar.jsx";
import TripCard from "../components/TripCard.jsx";
import theme from "../themes/theme_five.js";
import AddItemButton from "../components/AddItemButton";
import DeleteDayDialog from "../components/DeleteDayDialog";
import DistanceDurationConnector from "../components/DistanceDurationConnector";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useMapContext } from "../contexts/MapContext";
import { useSearchContext } from "../contexts/SearchContext";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import headerPlaceholder from "../images/unsplash-travel-placeholder.jpg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Chip from "@mui/material/Chip";
import Flag from "react-world-flags";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RestaurantIcon from "@mui/icons-material/Restaurant";

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
    currentTrip,
  } = useItineraryContext();

  const { showNotification } = useNotificationContext();
  // const { locationData } = useSearchContext();  This is Obsolete - now part of currentTrip

  const { handleClickOptimiseRoute } = useMapContext();

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
      console.log("Test 17:10: ", dayToRemove);
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
    showNotification(`Item moved to Day ${newDayNumber}`);
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

  const handleClickStartingLocation = () => {
    navigate("/map");
  };

  // Generates a duration string with hours and minutes, based on the number of seconds input
  const createDurationString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const secondsRemaining = seconds - hours * 3600;
    const mins = Math.round(secondsRemaining / 60);

    const durationString = `${hours > 0 ? hours : ""}${hours > 0 ? "h" : ""}${
      hours > 0 ? ", " : ""
    }${mins} ${mins > 1 ? "mins" : "min"}`;

    return durationString;
  };

  // Gets the total itinerary time in seconds
  // This includes the recommended duration of each itinerary item
  const getTotalItineraryTime = (itineraryItems, routeDuration) => {
    if (itineraryItems?.length === 0) return;
    if (routeDuration === null) return;

    let itemDurationTotalMinutes = 0;

    for (let item of itineraryItems) {
      itemDurationTotalMinutes += item.recommendedDuration;
    }

    const totalItineraryDurationSeconds =
      itemDurationTotalMinutes * 60 + routeDuration;

    return totalItineraryDurationSeconds;
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
            return {
              ...day,
              itineraryItems: itineraryReordered,
              route: null,
              optimised: false,
            };
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
          height: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AppBar page={"Itinerary"} />
        <Box sx={{ pb: 23, overflowY: "auto", flex: 1 }}>
          <TripCard
            tripName={currentTrip?.tripName}
            locationData={currentTrip?.locationData}
            headerImageUrl={currentTrip?.headerImageUrl}
            clickable={false}
            startDate={currentTrip?.startDate}
            dayCount={currentTrip?.days}
          />
          {/* <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              mx: 2,
              mt: 3,
              mb: 3,
              bgcolor: "background.paper",
              position: "relative",
            }}
          >
            <CardMedia
              sx={{
                height: 200,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                zIndex: 1,
              }}
              image={tripDetails.headerImageUrl?.image_url || headerPlaceholder}
              title={locationData?.place}
            />
            <CardContent
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                zIndex: 10,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 2,
                py: 0.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#ffffff",
                  textAlign: "left",
                  fontSize: "1.75rem",
                }}
              >
                {tripDetails.tripName || locationData?.place || "My Trip"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", textAlign: "left", fontSize: "1rem" }}
              >
                Mon 15 Jan - Fri 19 Jan
              </Typography>
            </CardContent>
            <Box sx={{ position: "absolute", zIndex: 11, top: 15, right: 15 }}>
              <Chip
                label={locationData?.place || locationData?.country}
                icon={
                  <Flag code={locationData?.country_code || "GB"} height={14} />
                }
                sx={{
                  color: "#ffffff",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  fontSize: "1rem",
                  px: 1,
                }}
              />
            </Box>
          </Card> */}

          <Box>
            {currentTrip?.itinerary.map((itineraryDay, index) => {
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
                    borderRadius: 2,
                    // boxShadow: "0px 3px 6px rgba(0,0,0, 0.1)",
                    boxShadow:
                      expanded === itineraryDay.dayNumber
                        ? "0px 8px 24px rgba(255, 138, 92, 0.18)"
                        : "0px 3px 6px rgba(0,0,0,0.08)",
                    mx: 2,
                    mb: 2,
                    "&:before": {
                      display: "none",
                    },
                    // overflow: "hidden",
                    // backgroundColor:
                    //   expanded === itineraryDay.dayNumber
                    //     ? "primary.light"
                    //     : "background.paper",
                    background:
                      expanded === itineraryDay.dayNumber
                        ? "linear-gradient(135deg, #FFE5D6 0%, #FFF4EC 40%, #FFFFFF 85%)"
                        : "linear-gradient(135deg, #FAFAF7 0%, #FFFFFF 100%)",
                  }}
                  elevation={0}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{
                      // backgroundColor:
                      //   expanded === itineraryDay.dayNumber
                      //     ? "primary.light"
                      //     : "transparent",
                      // border: "1px solid #E0E0E0",
                      border: "none",
                      borderRadius: 2,
                      "&:focus": {
                        outline: "none",
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* <CalendarTodayIcon sx={{ fontSize: "1rem", mx: 1 }} /> */}

                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >{`Day ${itineraryDay.dayNumber}`}</Typography>
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: "0.375rem",
                            mx: 1,
                            color:
                              expanded === itineraryDay.dayNumber
                                ? "secondary.main"
                                : "text.secondary",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >{`${
                          currentTrip.startDate
                            ? dayjs(currentTrip.startDate)
                                .add(index, "day")
                                .format("ddd D MMM")
                            : "No Date Selected" // CHANGE THIS
                        }`}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ScheduleIcon
                          sx={{
                            fontSize: "1rem",
                            mr: 1,
                            color:
                              expanded === itineraryDay.dayNumber
                                ? "secondary.main"
                                : "text.secondary",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {itineraryDay.dayStartTime}
                        </Typography>
                        {/* <FiberManualRecordIcon
                          sx={{
                            fontSize: "0.375rem",
                            mx: 1,
                            color: "text.secondary",
                          }}
                        /> */}
                        <ListAltIcon
                          sx={{
                            fontSize: "1rem",
                            mx: 1,
                            color:
                              expanded === itineraryDay.dayNumber
                                ? "secondary.main"
                                : "text.secondary",
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">{`${
                          itineraryDay.itineraryItems.length
                        } ${
                          itineraryDay.itineraryItems.length > 1 ||
                          itineraryDay.itineraryItems.length === 0
                            ? "Items"
                            : "Item"
                        }`}</Typography>
                      </Box>
                      {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >{`${
                          itineraryDay.route ? itineraryDay.route.distance : ""
                        } ${itineraryDay.route ? "km" : ""}`}</Typography>
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: "0.375rem",
                            mx: 1,
                            display: itineraryDay.route ? "block" : "none",
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {itineraryDay.route
                            ? createDurationString(
                                getTotalItineraryTime(
                                  itineraryDay.itineraryItems,
                                  itineraryDay.route.duration
                                )
                              )
                            : ""}
                        </Typography>
                      </Box> */}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DayMenu
                        itineraryDay={itineraryDay}
                        handleClickRemoveDay={handleClickRemoveDay}
                        handleClickChangeDayTime={handleClickChangeDayTime}
                        handleClickOptimiseRoute={handleClickOptimiseRoute}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, mt: 0 }}>
                    <Box sx={{display: "flex", mb: 2}}>
                      <Chip
                        label="Foodie 🍲"
                        sx={{
                          bgcolor: "#FFB347",
                          color: "white",
                          fontWeight: 600,
                          mr: 1
                        }}
                      />
                      <Chip
                        label="Time Traveler ⏳"
                        sx={{
                          bgcolor: "#6C5B7B",
                          color: "white",
                          fontWeight: 600,
                          mr: 1
                        }}
                      />
                      <Chip
                        label="Explorer 🌲"
                        sx={{
                          bgcolor: "#81C784",
                          color: "white",
                          fontWeight: 600,
                          mr: 1
                        }}
                      />
                    </Box>
                    <ListItemButton
                      onClick={handleClickStartingLocation}
                      sx={{
                        mb: 2,
                        borderRadius: 3,
                        py: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "rgba(255, 209, 179, 0.2)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationPinIcon color={"primary"} sx={{ mr: 1 }} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="caption" color="text.secondary">
                            Starting location:
                          </Typography>
                          {itineraryDay.dayStartLocation ? (
                            <Typography variant="caption">
                              {itineraryDay.dayStartLocation.name}
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              Add a starting location
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                    </ListItemButton>
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
                                border: `2px dashed ${theme.palette.secondary.light}`,
                                borderRadius: 2,
                                height: "120px",
                                // backgroundColor: "background.paper",
                                backgroundColor: "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography>
                                This day is empty — time to fill it with
                                memories! 🌄
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
                              (itineraryItem, index) => {
                                return (
                                  <Box key={itineraryItem.id}>
                                    <SortableItineraryItem
                                      itineraryItem={itineraryItem}
                                      dayNumber={itineraryDay.dayNumber}
                                    />
                                    {index ===
                                    itineraryDayWithTimes.itineraryItems
                                      .length -
                                      1 ? (
                                      ""
                                    ) : itineraryDayWithTimes.route ? (
                                      <DistanceDurationConnector
                                        distance={
                                          itineraryDayWithTimes.route?.legs[
                                            index
                                          ].distance
                                        }
                                        duration={createDurationString(
                                          itineraryDayWithTimes.route?.legs[
                                            index
                                          ].duration
                                        )}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Box>
                                );
                              }
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
                </Accordion>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Fab
            variant="extended"
            color="primary"
            sx={{
              position: "fixed",
              bottom: "120px",
              right: "20px",
              fontWeight: 700,
            }}
            onClick={handleClickAddDay}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Day
          </Fab>
        </Box>

        <DaySelectDrawer
          open={daySelectOpen}
          onClose={() => {
            setDaySelectOpen(false);
            setSelectedItemId(null);
          }}
          itinerary={currentTrip?.itinerary}
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
