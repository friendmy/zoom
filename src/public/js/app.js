const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => {
    console.log("Connectied to Browser ✅");
};

const handleClose = () => {
    console.log("Disconnectied to Browser ❎");
};

const handleMessage = (message) => {
    console.log("New message: ", message.data);
};

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);

const handleSubmit = (e) => {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
