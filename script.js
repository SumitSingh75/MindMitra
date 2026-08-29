/* =========================================
   MINDMITRA JAVASCRIPT
========================================= */


/* =========================================
   GLOBAL VARIABLES
========================================= */

let hindiMode = false;

let completedReminders = 0;

let gamesCompleted = 0;
let totalScore = 0;
let difficulty = 1;

let watchID = null;
let lastPosition = null;
let totalDistance = 0;

let selectedPlace = "";


/* =========================================
   SECTION NAVIGATION
========================================= */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   LANGUAGE SYSTEM
========================================= */

function setLanguage(language) {

    hindiMode = language === "hi";

    document.documentElement.lang =
        hindiMode ? "hi" : "en";


    document.querySelectorAll("[data-en]").forEach(element => {

        const text = hindiMode
            ? element.getAttribute("data-hi")
            : element.getAttribute("data-en");

        if (text) {
            element.innerText = text;
        }

    });


    const input =
        document.getElementById("aiQuestion");

    if (input) {

        input.placeholder =
            hindiMode
                ? "MindMitra से पूछें..."
                : "Ask MindMitra...";
    }


    const welcomeTitle =
        document.getElementById("welcomeTitle");

    if (welcomeTitle) {

        welcomeTitle.innerText =
            hindiMode
                ? "MindMitra में आपका स्वागत है"
                : "Welcome to MindMitra";
    }


    const welcomeText =
        document.getElementById("welcomeText");

    if (welcomeText) {

        welcomeText.innerText =
            hindiMode
                ? "AI आधारित संज्ञानात्मक सहायता, स्मृति सहायक और दैनिक स्वास्थ्य"
                : "AI-powered cognitive support, memory assistance & daily wellness";
    }


    const homeGreeting =
        document.getElementById("homeGreeting");

    if (homeGreeting) {

        homeGreeting.innerText =
            hindiMode
                ? "सुप्रभात 👋"
                : "Good Morning 👋";
    }


    const homeDescription =
        document.getElementById("homeDescription");

    if (homeDescription) {

        homeDescription.innerText =
            hindiMode
                ? "आज अपने मन और शरीर को सक्रिय रखें।"
                : "Let's keep your mind and body active today.";
    }


    updateAIStatus();
    updateAIRecommendation();
}


/* =========================================
   AI STATUS
========================================= */

function updateAIStatus() {

    const status =
        document.querySelector(".status-card");

    if (!status) {
        return;
    }

    status.innerHTML = `

        <span class="online-dot"></span>

        ${
            hindiMode
                ? "AI सहायक सक्रिय"
                : "AI Assistant Active"
        }

    `;
}


/* =========================================
   REMINDERS
========================================= */

function completeReminder(button) {

    if (button.dataset.done === "true") {
        return;
    }

    button.dataset.done = "true";

    button.innerText =
        hindiMode
            ? "पूरा ✓"
            : "Done ✓";

    completedReminders++;


    const reminderDone =
        document.getElementById("reminderDone");

    if (reminderDone) {
        reminderDone.innerText =
            completedReminders;
    }


    const dashboardReminders =
        document.getElementById("dashboardReminders");

    if (dashboardReminders) {
        dashboardReminders.innerText =
            completedReminders + "/5";
    }
}


/* =========================================
   EMERGENCY / CONTACT
========================================= */

function emergencyHelp() {

    alert(
        hindiMode
            ? "🆘 आपातकालीन सहायता सक्रिय की गई है। यह अभी एक demo feature है।"
            : "🆘 Emergency assistance activated. This is currently a demo feature."
    );
}


function contactDoctor() {

    alert(
        hindiMode
            ? "👨‍⚕️ यह demo है। वास्तविक ऐप में सुरक्षित डॉक्टर कॉल या वीडियो कॉल जोड़ी जा सकती है।"
            : "👨‍⚕️ This is a demo. A secure doctor call or video call can be integrated in the real application."
    );
}


function contactCaregiver() {

    alert(
        hindiMode
            ? "👨‍👩‍👧 यह demo है। वास्तविक ऐप में caregiver से संपर्क किया जा सकता है।"
            : "👨‍👩‍👧 This is a demo. A real application can connect the user with a caregiver."
    );
}


/* =========================================
   AI DIFFICULTY SYSTEM
========================================= */

function recordGame(score) {

    gamesCompleted++;

    totalScore += score;


    const average =
        Math.round(totalScore / gamesCompleted);


    const dashboardGames =
        document.getElementById("dashboardGames");

    if (dashboardGames) {
        dashboardGames.innerText =
            gamesCompleted;
    }


    const dashboardScore =
        document.getElementById("dashboardScore");

    if (dashboardScore) {
        dashboardScore.innerText =
            average + "%";
    }


    const homeScore =
        document.getElementById("homeScore");

    if (homeScore) {
        homeScore.innerText =
            average + "%";
    }


    if (score >= 80 && difficulty < 5) {

        difficulty++;

    } else if (score < 50 && difficulty > 1) {

        difficulty--;
    }


    const difficultyLevel =
        document.getElementById("difficultyLevel");

    if (difficultyLevel) {
        difficultyLevel.innerText =
            difficulty;
    }


    const dashboardLevel =
        document.getElementById("dashboardLevel");

    if (dashboardLevel) {

        dashboardLevel.innerText =
            hindiMode
                ? "स्तर " + difficulty
                : "Level " + difficulty;
    }


    let recommendation;
    let memoryStatus;


    if (score >= 80) {

        recommendation =
            hindiMode
                ? "प्रदर्शन अच्छा है — AI ने कठिनाई थोड़ी बढ़ाई।"
                : "Good performance — AI increased the difficulty slightly.";

        memoryStatus =
            hindiMode
                ? "अच्छा"
                : "Good";

    } else if (score >= 50) {

        recommendation =
            hindiMode
                ? "प्रदर्शन सामान्य है — वर्तमान स्तर जारी रखें।"
                : "Performance is moderate — keep the current level.";

        memoryStatus =
            hindiMode
                ? "सामान्य"
                : "Moderate";

    } else {

        recommendation =
            hindiMode
                ? "AI ने अभ्यास को आसान किया।"
                : "AI reduced the difficulty for easier practice.";

        memoryStatus =
            hindiMode
                ? "अभ्यास आवश्यक"
                : "Needs Practice";
    }


    const memoryElement =
        document.getElementById("memoryStatus");

    if (memoryElement) {
        memoryElement.innerText =
            memoryStatus;
    }


    const recommendationElement =
        document.getElementById("dashboardRecommendation");

    if (recommendationElement) {
        recommendationElement.innerText =
            recommendation;
    }


    const aiMessage =
        document.getElementById("aiHomeMessage");

    if (aiMessage) {
        aiMessage.innerText =
            recommendation;
    }
}


function updateAIRecommendation() {

    if (gamesCompleted === 0) {

        const message =
            document.getElementById("aiHomeMessage");

        if (message) {

            message.innerText =
                hindiMode
                    ? "व्यक्तिगत सुझाव प्राप्त करने के लिए कोई cognitive game खेलें।"
                    : "Complete a cognitive game to receive a personalized recommendation.";
        }
    }
}


/* =========================================
   MEMORY GAME
========================================= */

function memoryGame() {

    const levelItems =
        difficulty >= 4
            ? "🍎 🏠 🐘 🌳 🚲 ⭐"
            : difficulty >= 2
                ? "🍎 🏠 🐘 🌳 ⭐"
                : "🍎 🏠 🐘 🌳";


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🃏
            ${hindiMode ? "स्मृति कार्ड" : "Memory Cards"}
        </h2>

        <p>
            ${
                hindiMode
                    ? "इन वस्तुओं को ध्यान से याद करें:"
                    : "Remember these objects:"
            }
        </p>

        <div class="sequence-box">
            ${levelItems}
        </div>

        <p>
            ${
                hindiMode
                    ? "ध्यान से देखें और फिर आगे बढ़ें।"
                    : "Look carefully and continue."
            }
        </p>

        <button onclick="memoryQuestion()">
            ${
                hindiMode
                    ? "छिपाएं और जारी रखें"
                    : "Hide & Continue"
            }
        </button>
    `;
}


function memoryQuestion() {

    document.getElementById("gameArea").innerHTML = `

        <h2>
            ${
                hindiMode
                    ? "आपने कौन सी वस्तु देखी?"
                    : "Which object did you see?"
            }
        </h2>

        <div class="game-options">

            <button onclick="memoryAnswer(true)">
                🍎 ${hindiMode ? "सेब" : "Apple"}
            </button>

            <button onclick="memoryAnswer(false)">
                🚗 ${hindiMode ? "कार" : "Car"}
            </button>

            <button onclick="memoryAnswer(false)">
                ⚽ ${hindiMode ? "गेंद" : "Ball"}
            </button>

            <button onclick="memoryAnswer(false)">
                📱 ${hindiMode ? "फोन" : "Phone"}
            </button>

        </div>
    `;
}


function memoryAnswer(correct) {

    const score =
        correct ? 100 : 25;

    showGameResult(score);
}


/* =========================================
   COLOR MEMORY
========================================= */

let colorSequence = [];


function colorGame() {

    const colors = [

        {
            name: "red",
            emoji: "🔴",
            en: "Red",
            hi: "लाल"
        },

        {
            name: "green",
            emoji: "🟢",
            en: "Green",
            hi: "हरा"
        },

        {
            name: "blue",
            emoji: "🔵",
            en: "Blue",
            hi: "नीला"
        },

        {
            name: "yellow",
            emoji: "🟡",
            en: "Yellow",
            hi: "पीला"
        }

    ];


    const length =
        difficulty >= 4
            ? 6
            : difficulty >= 2
                ? 5
                : 4;


    colorSequence = [];


    for (let i = 0; i < length; i++) {

        const random =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        colorSequence.push(random);
    }


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🎨
            ${hindiMode ? "रंग स्मृति" : "Color Memory"}
        </h2>

        <p>
            ${
                hindiMode
                    ? "इस रंग क्रम को याद करें:"
                    : "Remember this color sequence:"
            }
        </p>

        <div class="sequence-box">
            ${colorSequence.map(c => c.emoji).join(" ")}
        </div>

        <p>
            ${
                hindiMode
                    ? "क्रम याद होने के बाद नीचे क्लिक करें।"
                    : "Remember the sequence and continue."
            }
        </p>

        <button onclick="colorQuestion()">
            ${hindiMode ? "जारी रखें" : "Continue"}
        </button>
    `;
}


function colorQuestion() {

    const targetIndex =
        difficulty >= 3 ? 2 : 1;


    const target =
        colorSequence[targetIndex];


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🎨
            ${
                hindiMode
                    ? "रंग स्मृति प्रश्न"
                    : "Color Memory Question"
            }
        </h2>

        <p>
            ${
                hindiMode
                    ? `कौन सा रंग ${targetIndex + 1} नंबर पर था?`
                    : `Which color was ${targetIndex + 1}${targetIndex === 1 ? "nd" : "rd"}?`
            }
        </p>

        <div class="game-options">

            <button onclick="colorAnswer('red')">
                🔴 ${hindiMode ? "लाल" : "Red"}
            </button>

            <button onclick="colorAnswer('green')">
                🟢 ${hindiMode ? "हरा" : "Green"}
            </button>

            <button onclick="colorAnswer('blue')">
                🔵 ${hindiMode ? "नीला" : "Blue"}
            </button>

            <button onclick="colorAnswer('yellow')">
                🟡 ${hindiMode ? "पीला" : "Yellow"}
            </button>

        </div>
    `;
}


function colorAnswer(answer) {

    const targetIndex =
        difficulty >= 3 ? 2 : 1;


    const correct =
        colorSequence[targetIndex].name === answer;


    const score =
        correct ? 100 : 25;


    showGameResult(score);
}


/* =========================================
   NUMBER GAME
========================================= */

function numberGame() {

    let sequence;

    if (difficulty >= 4) {

        sequence =
            "2 → 4 → 6 → 8 → ?";

    } else {

        sequence =
            "2 → 4 → 6 → ?";
    }


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🔢
            ${hindiMode ? "संख्या क्रम" : "Number Sequence"}
        </h2>

        <p>
            ${
                hindiMode
                    ? "लुप्त संख्या खोजें:"
                    : "Find the missing number:"
            }
        </p>

        <h1>
            ${sequence}
        </h1>

        <button onclick="numberAnswer(8)">
            8
        </button>

        <button onclick="numberAnswer(7)">
            7
        </button>

        <button onclick="numberAnswer(10)">
            10
        </button>

    `;
}


function numberAnswer(answer) {

    const score =
        answer === 8 ? 100 : 25;

    showGameResult(score);
}


/* =========================================
   PICTURE GAME
========================================= */

function pictureGame() {

    document.getElementById("gameArea").innerHTML = `

        <h2>
            🖼️
            ${
                hindiMode
                    ? "चित्र पहचान"
                    : "Picture Recognition"
            }
        </h2>

        <div style="font-size:70px;">
            🏔️
        </div>

        <p>
            ${
                hindiMode
                    ? "यह क्या है?"
                    : "What is this?"
            }
        </p>

        <button onclick="pictureAnswer(true)">
            🏔️ ${hindiMode ? "पहाड़" : "Mountain"}
        </button>

        <button onclick="pictureAnswer(false)">
            🚗 ${hindiMode ? "कार" : "Car"}
        </button>

        <button onclick="pictureAnswer(false)">
            📱 ${hindiMode ? "फोन" : "Phone"}
        </button>

    `;
}


function pictureAnswer(correct) {

    const score =
        correct ? 100 : 25;

    showGameResult(score);
}


/* =========================================
   ATTENTION GAME
========================================= */

function attentionGame() {

    const different =
        difficulty >= 3
            ? "🍎 🍎 🍊 🍎 🍎 🍎"
            : "🍎 🍎 🍎 🍊 🍎";


    document.getElementById("gameArea").innerHTML = `

        <h2>
            👀
            ${
                hindiMode
                    ? "ध्यान परीक्षण"
                    : "Attention Test"
            }
        </h2>

        <p>
            ${
                hindiMode
                    ? "अलग वस्तु खोजें:"
                    : "Find the different object:"
            }
        </p>

        <div class="sequence-box">
            ${different}
        </div>

        <button onclick="attentionAnswer(true)">
            🍊
            ${hindiMode ? "संतरा" : "Orange"}
        </button>

        <button onclick="attentionAnswer(false)">
            🍎
            ${hindiMode ? "सेब" : "Apple"}
        </button>

    `;
}


function attentionAnswer(correct) {

    const score =
        correct ? 100 : 25;

    showGameResult(score);
}


/* =========================================
   GAME RESULT
========================================= */

function showGameResult(score) {

    recordGame(score);


    let message;


    if (score >= 80) {

        message =
            hindiMode
                ? "🎉 बहुत अच्छा प्रदर्शन!"
                : "🎉 Excellent performance!";

    } else if (score >= 50) {

        message =
            hindiMode
                ? "👍 अच्छा प्रयास!"
                : "👍 Good try!";

    } else {

        message =
            hindiMode
                ? "💪 अभ्यास करते रहें!"
                : "💪 Keep practicing!";
    }


    document.getElementById("gameArea").innerHTML = `

        <h2>
            ${message}
        </h2>

        <div style="font-size:45px;">
            ${score >= 80 ? "🏆" : "🧠"}
        </div>

        <h3>
            ${hindiMode ? "स्कोर" : "Score"}:
            ${score}%
        </h3>

        <p>
            ${
                hindiMode
                    ? "AI कठिनाई स्तर"
                    : "AI Difficulty Level"
            }:
            ${difficulty}
        </p>

        <button onclick="memoryGame()">
            ${
                hindiMode
                    ? "दूसरा खेल खेलें"
                    : "Play Another Game"
            }
        </button>

    `;
}


/* =========================================
   WALKING TRACKER
========================================= */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;


    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;


    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =
        Math.sin(dLat / 2) ** 2 +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) ** 2;


    return R *
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );
}


function startWalking() {

    if (!navigator.geolocation) {

        alert(
            hindiMode
                ? "इस ब्राउज़र में GPS उपलब्ध नहीं है।"
                : "Location is not supported by this browser."
        );

        return;
    }


    const status =
        document.getElementById("locationStatus");

    if (status) {

        status.innerText =
            hindiMode
                ? "📍 चलने की दूरी ट्रैक की जा रही है..."
                : "📍 Tracking your walking distance...";
    }


    watchID =
        navigator.geolocation.watchPosition(

            position => {

                const current =
                    position.coords;


                if (lastPosition) {

                    const distance =
                        calculateDistance(
                            lastPosition.latitude,
                            lastPosition.longitude,
                            current.latitude,
                            current.longitude
                        );


                    if (
                        distance > 0 &&
                        distance < 0.05
                    ) {

                        totalDistance += distance;

                        updateWalkingData();
                    }
                }


                lastPosition =
                    current;
            },


            () => {

                const status =
                    document.getElementById("locationStatus");

                if (status) {

                    status.innerText =
                        hindiMode
                            ? "⚠️ GPS अनुमति दें।"
                            : "⚠️ Please allow location permission.";
                }
            },


            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 5000
            }
        );
}


function stopWalking() {

    if (watchID !== null) {

        navigator.geolocation.clearWatch(
            watchID
        );

        watchID = null;


        const status =
            document.getElementById("locationStatus");

        if (status) {

            status.innerText =
                hindiMode
                    ? "⏹️ चलने की ट्रैकिंग रोक दी गई।"
                    : "⏹️ Walking tracking stopped.";
        }
    }
}


function updateWalkingData() {

    const distance =
        document.getElementById("distance");

    if (distance) {

        distance.innerText =
            totalDistance.toFixed(2);
    }


    const homeDistance =
        document.getElementById("homeDistance");

    if (homeDistance) {

        homeDistance.innerText =
            totalDistance.toFixed(2);
    }


    const dashboardWalk =
        document.getElementById("dashboardWalk");

    if (dashboardWalk) {

        dashboardWalk.innerText =
            totalDistance.toFixed(2) + " km";
    }


    const steps =
        Math.round(totalDistance * 1300);


    const stepsElement =
        document.getElementById("steps");

    if (stepsElement) {

        stepsElement.innerText =
            steps;
    }


    const progress =
        Math.min(
            (totalDistance / 4) * 100,
            100
        );


    const progressElement =
        document.getElementById("walkingProgress");

    if (progressElement) {

        progressElement.style.width =
            progress + "%";
    }
}


/* =========================================
   NEARBY HELP
========================================= */

function findNearby(place) {

    selectedPlace =
        place;


    const mapResult =
        document.getElementById("mapResult");

    if (mapResult) {

        mapResult.innerHTML =
            hindiMode
                ? `🔎 नज़दीकी <strong>${place}</strong> खोजी जा रही है...`
                : `🔎 Searching for nearby <strong>${place}</strong>...`;
    }


    getLocation();
}


function getLocation() {

    if (!navigator.geolocation) {

        const mapResult =
            document.getElementById("mapResult");

        if (mapResult) {

            mapResult.innerText =
                hindiMode
                    ? "आपके ब्राउज़र में GPS उपलब्ध नहीं है।"
                    : "Your browser does not support GPS.";
        }

        return;
    }


    const mapResult =
        document.getElementById("mapResult");

    if (mapResult) {

        mapResult.innerText =
            hindiMode
                ? "📍 आपकी लोकेशन प्राप्त की जा रही है..."
                : "📍 Getting your location...";
    }


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;


            const place =
                selectedPlace ||
                (
                    hindiMode
                        ? "सहायता सेवाएं"
                        : "help services"
                );


            if (mapResult) {

                mapResult.innerHTML = `

                    📍
                    ${
                        hindiMode
                            ? "लोकेशन मिल गई।"
                            : "Your location detected."
                    }

                    <br><br>

                    ${
                        hindiMode
                            ? "नज़दीकी खोज:"
                            : "Searching nearby:"
                    }

                    <strong>
                        ${place}
                    </strong>

                    <br><br>

                    Latitude:
                    ${lat.toFixed(4)}

                    <br>

                    Longitude:
                    ${lon.toFixed(4)}

                    <br><br>

                    <small>
                        ${
                            hindiMode
                                ? "वास्तविक ऐप में इन coordinates को map/place-search service से जोड़ा जा सकता है।"
                                : "A complete application can connect these coordinates to a real map/place-search service."
                        }
                    </small>

                `;
            }
        },


        () => {

            if (mapResult) {

                mapResult.innerText =
                    hindiMode
                        ? "⚠️ Nearby Help इस्तेमाल करने के लिए GPS अनुमति दें।"
                        : "⚠️ Please allow location permission to use Nearby Help.";
            }
        }
    );
}


/* =========================================
   MINDMITRA AI DEMO
========================================= */

function askMindMitra() {

    const input =
        document.getElementById("aiQuestion");


    if (!input) {
        return;
    }


    const question =
        input.value.trim();


    const replyElement =
        document.getElementById("aiReply");


    if (!question) {

        if (replyElement) {

            replyElement.innerText =
                hindiMode
                    ? "कृपया अपना प्रश्न लिखें।"
                    : "Please type your question.";
        }

        return;
    }


    let reply;


    if (hindiMode) {

        reply =
            "मैं MindMitra का demo AI सहायक हूं। वास्तविक AI backend जोड़कर मैं सामान्य प्रश्नों को समझकर उत्तर दे सकता हूं।";

    } else {

        reply =
            "I am the MindMitra demo AI assistant. A real AI backend can be connected to understand and answer general questions.";
    }


    if (replyElement) {

        replyElement.innerText =
            "🤖 " + reply;
    }


    input.value = "";
}


/* =========================================
   PAGE START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAIStatus();

        updateAIRecommendation();

    }
);