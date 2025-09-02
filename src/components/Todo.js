import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "@fontsource/chewy"; // defaults to weight 400
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "../App.css";
import "@fontsource/nunito"; // defaults to 400
import { useSnack } from "../contexts/SnackBarContext";
export default function Todo({
  todoObj,
  donehandle,
  deletehandle,
  edithandle,
}) {
  const handleClick = useSnack();
  return (
    <Card
      sx={{
        margin: "15px",
        bgcolor: "primary.main",
        // height: "40px",
        padding: "0",
        animation: "auto",
        // minWidth: "300px",
      }}
      variant="contained"
      className="card"
    >
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          padding: "3px",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container spacing={2} width={"100%"}>
          <Grid size={8} justifyContent={"space-between"}>
            <Stack spacing={0}>
              <Typography
                variant="subtitle1"
                color="white"
                style={{
                  textAlign: "left",
                  padding: " 2px 10px ",
                  //   border: "solid",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: todoObj.done ? "line-through" : "",
                }}
              >
                {todoObj.title}
              </Typography>
              {/* <Divider
                sx={{
                  color: "white",
                  width: "80%",
                  margin: "1px 10px",
                }}
              /> */}
              <Typography
                variant="subtitle2"
                color="rgba(255,255,255,0.7)"
                style={{
                  textAlign: "left",
                  padding: " 2px 10px ",
                  //   fontSize: "14px",
                  //   border: "solid",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {todoObj.description}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            size={3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              //   border: "solid",
              display: "flex",
            }}
          >
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              size="small"
              // style={{ border: "solid" }}
            >
              <IconButton
                onClick={() => {
                  if (!todoObj.done) handleClick("Task Cpmleted", true);
                  donehandle(todoObj.key);
                  //   saveData();
                }}
                sx={{ color: todoObj.done ? "white !important" : "" }}
              >
                <CheckCircleRoundedIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white" }}
                onClick={() => {
                  edithandle(todoObj.key);
                }}
              >
                <ModeEditOutlineRoundedIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white" }}
                onClick={() => {
                  deletehandle(todoObj.key);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
