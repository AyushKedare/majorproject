// hostlogic
const APP_ID = "9bcf0e417e794e1f9d769224b2727ece";

let uid = sessionStorage.getItem("uid");
if (!uid) {
    uid = String(Math.floor(Math.random() * 10000));
    sessionStorage.setItem("uid", uid);
}

let token = null;
let client;
let rtmClient;
let channel;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get("room");
let isHost = urlParams.get("host") === "1"; // Determine if the user is the host

if (!roomId) {
    roomId = "main";
}

let displayName = sessionStorage.getItem("display_name");
if (!displayName) {
    window.location = "lobby.html";
}

let localTracks = [];
let remoteUsers = {};
let localScreenTracks;
let sharingScreen = false;

let joinRoomInit = async () => {
    try {
        rtmClient = await AgoraRTM.createInstance(APP_ID);
        await rtmClient.login({ uid, token });

        await rtmClient.addOrUpdateLocalUserAttributes({ name: displayName });

        channel = await rtmClient.createChannel(roomId);
        await channel.join();

        channel.on("MemberJoined", handleMemberJoined);
        channel.on("MemberLeft", handleMemberLeft);
        channel.on("ChannelMessage", handleChannelMessage);

        getMembers();
        addBotMessageToDom(`Welcome to the room ${displayName}!👋`);

        client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        await client.join(APP_ID, roomId, token, uid);
        console.log("Joined room successfully");

        client.on("user-published", handleUserPublished);
        client.on("user-left", handleUserLeft);
    } catch (error) {
        console.error("Error initializing room:", error);
    }
};

let joinStream = async () => {
    try {
        document.getElementById("join-btn").style.display = "none";
        document.getElementsByClassName("stream__actions")[0].style.display = "flex";

        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks({}, {
            encoderConfig: {
                width: { min: 640, ideal: 1920, max: 1920 },
                height: { min: 480, ideal: 1080, max: 1080 },
            },
        });

        console.log("Microphone and camera tracks created:", localTracks);

        let player = `<div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}"></div>
                      </div>`;
        document.getElementById("streams__container").insertAdjacentHTML("beforeend", player);
        document.getElementById(`user-container-${uid}`).addEventListener("click", expandVideoFrame);

        localTracks[1].play(`user-${uid}`);
        await client.publish([localTracks[0], localTracks[1]]);
        console.log("Successfully published local tracks");

    } catch (error) {
        console.error("Error joining stream:", error);
    }
};

let handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    let player = document.getElementById(`user-container-${user.uid}`);
    if (player === null) {
        player = `<div class="video__container" id="user-container-${user.uid}">
                    <div class="video-player" id="user-${user.uid}"></div>`;
        document.getElementById("streams__container").insertAdjacentHTML("beforeend", player);
        document.getElementById(`user-container-${user.uid}`).addEventListener("click", expandVideoFrame);
    }
    if (mediaType === "video") {
        user.videoTrack.play(`user-${user.uid}`);
    }
    if (mediaType === "audio") {
        user.audioTrack.play();
    }
};

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
};

let toggleMic = async (e) => {
    let button = e.currentTarget;
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false);
        button.classList.add("active");
    } else {
        await localTracks[0].setMuted(true);
        button.classList.remove("active");
    }
};

let toggleCamera = async (e) => {
    let button = e.currentTarget;
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false);
        button.classList.add("active");
    } else {
        await localTracks[1].setMuted(true);
        button.classList.remove("active");
    }
};
 
// let captureVideoFrameForTrack = (videoTrack, userId) => {
//     if (!videoTrack || !videoTrack.getMediaStreamTrack) {
//         console.log(`Video track not found for user ${userId}`);
//         return null;
//     }

//     let canvas = document.createElement('canvas');
//     let context = canvas.getContext('2d');

//     let stream = new MediaStream([videoTrack.getMediaStreamTrack()]);
//     let videoElement = document.createElement('video');
//     videoElement.srcObject = stream;

//     videoElement.onloadedmetadata = () => {
//         if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
//             canvas.width = videoElement.videoWidth;
//             canvas.height = videoElement.videoHeight;

//             // Draw the current video frame onto the canvas
//             context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//             // Convert the canvas content to a base64 string (JPEG format)
//             let frameData = canvas.toDataURL('image/jpeg').split(',')[1]; // Strip metadata

//             console.log(`Captured frame from user ${userId}`);
//             return { userId, frameData }; // Return the captured frame
//         }
//     };

//     videoElement.play();
// };

// // Capture frames from all participants
// let captureVideoFramesFromAll = async () => {
//     let frames = [];

//     if (isHost) {
//         let localFrame = captureVideoFrameForTrack(localTracks[1], uid);
//         if (localFrame) frames.push(localFrame);

//         for (let userId in remoteUsers) {
//             let user = remoteUsers[userId];
//             if (user && user.videoTrack) {
//                 let remoteFrame = captureVideoFrameForTrack(user.videoTrack, userId);
//                 if (remoteFrame) frames.push(remoteFrame);
//             } else {
//                 console.log(`Video track not available for user ${userId}`);
//             }
//         }
//     } else {
//         let participantFrame = captureVideoFrameForTrack(localTracks[1], uid);
//         if (participantFrame) frames.push(participantFrame);
//     }

//     if (frames.length > 0) {
//         console.log(`Sending ${frames.length} frames to the backend`);
//         fetch('http://localhost:5000/upload_frame', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ frames })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Backend response:', data);
//         })
//         .catch((error) => {
//             console.error('Error sending frames to backend:', error);
//         });
//     }
// };

let captureVideoFrameForTrack = (videoTrack, userId) => {
    return new Promise((resolve, reject) => {
        if (!videoTrack || !videoTrack.getMediaStreamTrack) {
            console.log(`Video track not found for user ${userId}`);
            return reject(`Video track not found for user ${userId}`);
        }

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        let stream = new MediaStream([videoTrack.getMediaStreamTrack()]);
        let videoElement = document.createElement('video');
        videoElement.srcObject = stream;

        videoElement.onloadedmetadata = () => {
            if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                // Draw the current video frame onto the canvas
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to a base64 string (JPEG format)
                let frameData = canvas.toDataURL('image/jpeg').split(',')[1]; // Strip metadata
                console.log(`Captured frame from user ${userId}`);
                resolve({ userId, frameData }); // Resolve with the captured frame
            } else {
                reject(`Failed to capture frame for user ${userId}`);
            }
        };

        videoElement.onerror = (error) => {
            reject(`Error capturing frame for user ${userId}: ${error}`);
        };

        videoElement.play();
    });
};
let captureVideoFramesFromAll = async () => {
    let frames = [];

    try {
        if (isHost) {
            // Capture host frame
            let localFrame = await captureVideoFrameForTrack(localTracks[1], uid);
            frames.push(localFrame);

            // Capture remote users' frames
            let framePromises = Object.values(remoteUsers).map(user => {
                if (user && user.videoTrack) {
                    return captureVideoFrameForTrack(user.videoTrack, user.uid);
                } else {
                    console.log(`Video track not available for user ${user.uid}`);
                    return null;
                }
            });

            // Wait for all remote user frames to be captured
            let capturedFrames = await Promise.all(framePromises);
            frames.push(...capturedFrames.filter(frame => frame !== null));
        } else {
            // Capture participant's own frame
            let participantFrame = await captureVideoFrameForTrack(localTracks[1], uid);
            frames.push(participantFrame);
        }

        // Send frames to backend if any were captured
        if (frames.length > 0) {
            console.log(`Sending ${frames.length} frames to the backend`);
            const response = await fetch('http://localhost:5000/upload_frame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ frames })
            });

            const result = await response.json();
            console.log('Frames sent to backend successfully:', result);

            // Log the image URLs from the backend
            if (result.saved_files) {
                result.saved_files.forEach(url => {
                    console.log(`Frame saved and accessible at: ${url}`);
                });
            }
        }
    } catch (error) {
        console.error('Error capturing frames:', error);
    }
};

// Capture and send frames every second
setInterval(captureVideoFramesFromAll, 1000);


document.getElementById("camera-btn").addEventListener("click", toggleCamera);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("join-btn").addEventListener("click", joinStream);

joinRoomInit();

