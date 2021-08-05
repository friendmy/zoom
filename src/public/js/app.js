const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
const form = welcome.querySelector("form");

room.hidden = true;

let roomName;

const addMessage = (message) => {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
};

const handleMessageSubmit = (e) => {
    e.preventDefault();
    const input = room.querySelector("#msg input");
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${input.value}`);
        input.value = "";
    });
};

const handleNicknameSubmit = (e) => {
    e.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value);
    // , roomName, () => {
    //     addMessage(`You: ${input.value}`);
    //     input.value = "";
    // }
};

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
};

const enterRoom = (name) => {
    socket.emit("enter_room", name, showRoom);
    roomName = name;
};

const handleRoomSubmit = (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    enterRoom(input.value);
    input.value = "";
};
form.addEventListener("submit", handleRoomSubmit);
// roomform.addEventListener("submit", handle);

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${left} left ㅠㅠ!`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    if (rooms.length === 0) {
        roomList.innerHTML = "";
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        li.style.cursor = "pointer";
        roomList.append(li);
        li.addEventListener("click", () => {
            enterRoom(room);
        });
    });
});
