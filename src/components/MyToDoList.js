import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Todo from "./Todo";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";
import "@fontsource/chewy"; // defaults to weight 400
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import Modal from "@mui/material/Modal";
import { useSnack } from "../contexts/SnackBarContext";
import { useTodos } from "../contexts/TodoContext";
// import { useTodos } from "../contexts/TodoContext";
export default function MyTODoList() {
  const handleClick = useSnack();
  const { todos, dispatch } = useTodos();
  const [inputValue, setInputValue] = useState("");
  const [taskStaste, setTaskState] = useState("all");
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId("");
  };
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  function handleEditdId(id) {
    const todo = todos.find((t) => t.key === id);
    setEditId(id);
    handleOpenEdit(todo);
  }
  const handleOpenEdit = (todo) => {
    setInputValues(() => {
      if (todo) return { title: todo.title, description: todo.description };
      return { title: "", description: "" };
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditId("");
  };
  const [inputValues, setInputValues] = useState(() => {
    return { title: "", description: "" };
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const doneTodos = useMemo(() => {
    return todos.filter((t) => t.done);
  }, [todos]);

  const notDoneTodos = useMemo(() => {
    return todos.filter((t) => !t.done);
  }, [todos]);
  // style for models
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    color: "primary.main",
    p: 2,
  };
  function handleDeletedId(id) {
    setDeleteId(id);
    handleOpenDelete();
  }

  // handle done click
  function handleDoneClick(targetkey) {
    dispatch({ type: "done", payload: targetkey });
  }
  function handleEdit() {
    dispatch({ type: "edit", payload: { editId, inputValues } });
  }

  function handledeleteClick(targetkey) {
    dispatch({ type: "delete", payload: targetkey });
  }
  function displayTodos() {
    const todosList =
      taskStaste === "all"
        ? todos
        : taskStaste === "completed"
        ? doneTodos
        : notDoneTodos;
    const displayTodos = todosList.map((task) => {
      return (
        <Todo
          key={task.key}
          todoObj={task}
          donehandle={handleDoneClick}
          deletehandle={handleDeletedId}
          edithandle={handleEditdId}
        />
      );
    });
    return displayTodos;
  }
  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ fontFamily: "nunito" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Update Task
          </Typography>
          <Divider sx={{ margin: "5px" }}>
            <PlaylistAddCircleRoundedIcon />
          </Divider>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="standard"
              value={inputValues.title}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  title: e.target.value,
                });
              }}
            />
            <TextField
              id="filled-basic"
              label="Details"
              variant="standard"
              value={inputValues.description}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  description: e.target.value,
                });
              }}
            />
          </Stack>
          <Stack
            spacing={2}
            direction={"row"}
            sx={{ marginTop: "10px" }}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                const todo = todos.find((t) => t.key === editId);
                setInputValues({
                  title: todo.title,
                  description: todo.description,
                });
                handleCloseEdit();
              }}
              startIcon={<CancelRoundedIcon />}
            >
              Cancel
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              endIcon={<ModeEditOutlineRoundedIcon />}
              onClick={() => {
                handleEdit();
                handleClick("Todo updated", true);
                handleCloseEdit();
              }}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ fontFamily: "nunito" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="poster">
            This will permanently delete the Task. Are you absolutely sure ?
          </Typography>
          <Divider sx={{ margin: "5px" }}>
            <PlaylistAddCircleRoundedIcon />
          </Divider>
          <Stack
            spacing={2}
            direction={"row"}
            //   sx={{ border: "solid black" }}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                handleCloseDelete();
                setDeleteId("");
              }}
              autoFocus
              startIcon={<CancelRoundedIcon />}
            >
              Close
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              endIcon={<DeleteRoundedIcon />}
              onClick={() => {
                handleDoneClick(deleteId);
                handledeleteClick(deleteId);
                setDeleteId("");
                handleCloseDelete();
                handleClick("Todo deleted", true);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Container maxWidth="xs">
        <Card
          sx={{
            minWidth: 275,
            borderColor: "primary.main",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <CardContent sx={{ width: "100%" }}>
            <Divider
              sx={{
                color: "primary.main",
              }}
            >
              {" "}
              <PlaylistAddCircleRoundedIcon size="lg" />
            </Divider>
            <Typography
              variant="h2"
              color="primary"
              fontFamily={"chewy"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              To Do List
            </Typography>
            <Divider
              sx={{
                color: "primary.main",
              }}
            >
              {" "}
              <PlaylistAddCircleRoundedIcon />
            </Divider>
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              size="small"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              <Button
                sx={{ textTransform: "none" }}
                onClick={(e) => {
                  setTaskState(e.target.value);
                }}
                value="all"
                variant={taskStaste === "all" ? "contained" : "outlined"}
              >
                All
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                onClick={(e) => {
                  setTaskState(e.target.value);
                }}
                value="completed"
                variant={taskStaste === "completed" ? "contained" : "outlined"}
              >
                Completed
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                value="notcompleted"
                onClick={(e) => {
                  setTaskState(e.target.value);
                }}
                variant={
                  taskStaste === "notcompleted" ? "contained" : "outlined"
                }
              >
                Not Completed
              </Button>
            </ButtonGroup>
            {/* <Todo />
          <Todo />
          <Todo /> */}
            {/* {todosList} */}
            {displayTodos()}
            <Stack
              spacing={2}
              direction={"row"}
              sx={{
                margin: "15px",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Task"
                variant="standard"
                sx={{ flex: "0 0 75%", fontSize: "14px" }}
                // slotProps={{htmlInput:{'value= rrr'}}}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Button
                variant="contained"
                size="4"
                $
                sx={{
                  flex: "0 0 20%",
                  textTransform: "none",
                  fontFamily: "chewy",
                }}
                endIcon={<PlaylistAddCircleRoundedIcon />}
                onClick={() => {
                  dispatch({
                    type: "add",
                    payload: {
                      key: uuidv4(),
                      title: inputValue,
                      description: "none",
                      done: false,
                    },
                  });
                  handleClick("Todo added", true);
                  setInputValue("");
                }}
                disabled={inputValue === ""}
              >
                Add
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
