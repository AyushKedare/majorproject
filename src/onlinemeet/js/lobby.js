// let form = document.getElementById("lobby__form");

// let displayName = sessionStorage.getItem("display_name");
// if (displayName) {
//     form.name.value = displayName;
// }
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     sessionStorage.setItem("display_name", e.target.name.value);
//     let inviteCode = e.target.room.value;
//     if (!inviteCode) {
//         inviteCode = String(Math.floor(Math.random() * 10000));
//     }
//     window.location = `room.html?room=${inviteCode}`;
// });

let form = document.getElementById("lobby__form");

let displayName = sessionStorage.getItem("display_name");
if (displayName) {
    form.name.value = displayName;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the value of the host checkbox
    let isHost = form.host.checked ? 1 : 0; // 1 if host, 0 if not

    sessionStorage.setItem("display_name", e.target.name.value);

    let inviteCode = e.target.room.value;
    if (!inviteCode) {
        inviteCode = String(Math.floor(Math.random() * 10000));
    }

    // Pass the host value in the query parameters
    window.location = `room.html?room=${inviteCode}&host=${isHost}`;
});
