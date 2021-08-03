const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => {
    console.log("Connectied to Browser ✅");
};

const handleClose = () => {
    console.log("Disconnectied to Browser ❎");
};

const handleMessage = (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
};

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);

const makeMessage = (type, payload) => {
    const msg = { type, payload };
    return JSON.stringify(msg);
};

const handleSubmit = (e) => {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = "";
};

const handleNickSubmit = (e) => {
    e.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
