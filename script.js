/* =========================================
   MINDMITRA JAVASCRIPT
========================================= */


/* =========================================
   GLOBAL
========================================= */

let hindiMode = false;

let completedReminders = 0;

let gamesCompleted = 0;
let totalScore = 0;
let difficulty = 1;

let watchID = null;
let lastPosition = null;
let totalDistance = 0;

let yogaIndex = 0;
let yogaInterval = null;

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

    document.documentElement.lang = hindiMode ? "hi" : "en";

    document.querySelectorAll("[data-en]").forEach(element => {

        const text = hindiMode
            ? element.getAttribute("data-hi")
            : element.getAttribute("data-en");

        if (text) {
            element.innerText = text;
        }

    });


    const input = document.getElementById("aiQuestion");

    if (input) {

        input.placeholder = hindiMode
            ? input.getAttribute("data-placeholder-hi")
            : input.getAttribute("data-placeholder-en");
    }


    document.getElementById("welcomeTitle").innerText =
        hindiMode
            ? "MindMitra में आपका स्वागत है"
            : "Welcome to MindMitra";


    document.getElementById("welcomeText").innerText =
        hindiMode
            ? "AI आधारित संज्ञानात्मक सहायता, स्मृति सहायक और दैनिक स्वास्थ्य"
            : "AI-powered cognitive support, memory assistance & daily wellness";


    document.getElementById("homeGreeting").innerText =
        hindiMode
            ? "सुप्रभात 👋"
            : "Good Morning 👋";


    document.getElementById("homeDescription").innerText =
        hindiMode
            ? "आज अपने मन और शरीर को सक्रिय रखें।"
            : "Let's keep your mind and body active today.";


    updateAIStatus();

    updateYoga();

    updateAIRecommendation();

}


/* =========================================
   AI STATUS
========================================= */

function updateAIStatus() {

    document.getElementById("aiStatus").innerText =
        hindiMode
            ? "AI सहायक सक्रिय"
            : "AI Assistant Active";
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

    document.getElementById("reminderDone").innerText =
        completedReminders;

    document.getElementById("dashboardReminders").innerText =
        completedReminders + "/5";
}


/* =========================================
   EMERGENCY / CONTACT
========================================= */

function emergencyHelp() {

    alert(
        hindiMode
            ? "🆘 आपातकालीन सहायता सक्रिय की गई है। यह अभी एक demo feature है। वास्तविक ऐप में caregiver या emergency service से जोड़ा जा सकता है।"
            : "🆘 Emergency assistance activated. This is currently a demo feature. A real application can connect this to a caregiver or emergency service."
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
            ? "👨‍👩‍👧 यह demo है। वास्तविक ऐप में caregiver को संपर्क किया जा सकता है।"
            : "👨‍👩‍👧 This is a demo. A real application can connect the user with a caregiver."
    );
}


/* =========================================
   AI DIFFICULTY
========================================= */

function recordGame(score) {

    gamesCompleted++;

    totalScore += score;

    const average =
        Math.round(totalScore / gamesCompleted);


    document.getElementById("dashboardGames").innerText =
        gamesCompleted;

    document.getElementById("dashboardScore").innerText =
        average + "%";

    document.getElementById("homeScore").innerText =
        average + "%";


    /*
       PERFORMANCE BASED DIFFICULTY

       Good performance:
       increase difficulty.

       Low performance:
       reduce difficulty.
    */

    if (score >= 80 && difficulty < 5) {

        difficulty++;

    } else if (score < 50 && difficulty > 1) {

        difficulty--;
    }


    document.getElementById("difficultyLevel").innerText =
        difficulty;

    document.getElementById("dashboardLevel").innerText =
        hindiMode
            ? "स्तर " + difficulty
            : "Level " + difficulty;


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

    }

    else if (score >= 50) {

        recommendation =
            hindiMode
                ? "प्रदर्शन सामान्य है — वर्तमान स्तर जारी रखें।"
                : "Performance is moderate — keep the current level.";

        memoryStatus =
            hindiMode
                ? "सामान्य"
                : "Moderate";

    }

    else {

        recommendation =
            hindiMode
                ? "AI ने अभ्यास को आसान किया।"
                : "AI reduced the difficulty for easier practice.";

        memoryStatus =
            hindiMode
                ? "अभ्यास आवश्यक"
                : "Needs Practice";
    }


    document.getElementById("memoryStatus").innerText =
        memoryStatus;

    document.getElementById("dashboardRecommendation").innerText =
        recommendation;

    document.getElementById("aiHomeMessage").innerText =
        recommendation;
}


function updateAIRecommendation() {

    if (gamesCompleted === 0) {

        document.getElementById("aiHomeMessage").innerText =
            hindiMode
                ? "व्यक्तिगत सुझाव प्राप्त करने के लिए कोई cognitive game खेलें।"
                : "Complete a cognitive game to receive a personalized recommendation.";
    }
}


/* =========================================
   MEMORY GAME
========================================= */

function memoryGame() {

    const levelItems = difficulty >= 4
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

    const score = correct ? 100 : 25;

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
        difficulty >= 4 ? 6 :
        difficulty >= 2 ? 5 : 4;


    colorSequence = [];


    for (let i = 0; i < length; i++) {

        const random =
            colors[Math.floor(Math.random() * colors.length)];

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
            ${
                hindiMode
                    ? "जारी रखें"
                    : "Continue"
            }
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

    let start = 2;

    let sequence;

    if (difficulty >= 4) {

        sequence = `${start} → 4 → 6 → 8 → ?`;

    } else if (difficulty >= 2) {

        sequence = `${start} → 4 → 6 → ?`;

    } else {

        sequence = "2 → 4 → 6 → ?";
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
            ${
                hindiMode
                    ? "स्कोर"
                    : "Score"
            }:
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
   YOGA
========================================= */

const yogaExercises = [

    {
        name: "Tadasana",
        hindi: "ताड़ासन",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Tadasana.jpg/640px-Tadasana.jpg",
        instructionEn:
            "Stand straight, keep your feet together and breathe slowly.",
        instructionHi:
            "सीधे खड़े रहें, पैरों को साथ रखें और धीरे-धीरे सांस लें।"
    },

    {
        name: "Vrikshasana",
        hindi: "वृक्षासन",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vrksasana.jpg/640px-Vrksasana.jpg",
        instructionEn:
            "Stand carefully and practice balance comfortably.",
        instructionHi:
            "सावधानी से खड़े होकर आराम से संतुलन का अभ्यास करें।"
    },

    {
        name: "Sukhasana",
        hindi: "सुखासन",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Sukhasana.jpg/640px-Sukhasana.jpg",
        instructionEn:
            "Sit comfortably with crossed legs and keep your back straight.",
        instructionHi:
            "आराम से बैठें, पैरों को क्रॉस करें और पीठ सीधी रखें।"
    },

    {
        name: "Bhujangasana",
        hindi: "भुजंगासन",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bhujangasana.jpg/640px-Bhujangasana.jpg",
        instructionEn:
            "Practice gently and stop if you feel discomfort.",
        instructionHi:
            "धीरे-धीरे अभ्यास करें और असुविधा होने पर रुक जाएं।"
    },

    {
        name: "Vajrasana",
        hindi: "वज्रासन",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Vajrasana.jpg/640px-Vajrasana.jpg",
        instructionEn:
            "Sit comfortably and keep your back straight.",
        instructionHi:
            "आराम से बैठें और अपनी पीठ सीधी रखें।"
    }

];


function updateYoga() {

    const yoga =
        yogaExercises[yogaIndex];


    document.getElementById("yogaName").innerText =
        yoga.name;

    document.getElementById("yogaHindi").innerText =
        yoga.hindi;

    document.getElementById("yogaImage").src =
        yoga.image;


    document.getElementById("yogaInstruction").innerText =
        hindiMode
            ? yoga.instructionHi
            : yoga.instructionEn;


    document.getElementById("postureNumber").innerText =
        yogaIndex + 1;
}


function nextYoga() {

    yogaIndex++;

    if (yogaIndex >= yogaExercises.length) {
        yogaIndex = 0;
    }

    updateYoga();
}


function previousYoga() {

    yogaIndex--;

    if (yogaIndex < 0) {
        yogaIndex = yogaExercises.length - 1;
    }

    updateYoga();
}


function startYoga() {

    let seconds = 30;

    clearInterval(yogaInterval);

    document.getElementById("yogaTimer").innerText =
        seconds;


    yogaInterval = setInterval(() => {

        seconds--;

        document.getElementById("yogaTimer").innerText =
            seconds;


        if (seconds <= 0) {

            clearInterval(yogaInterval);

            document.getElementById("yogaTimer").innerText =
                "✓";
        }

    }, 1000);
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


    document.getElementById("locationStatus").innerText =
        hindiMode
            ? "📍 चलने की दूरी ट्रैक की जा रही है..."
            : "📍 Tracking your walking distance...";


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


                    /*
                       Ignore large GPS jumps.
                    */

                    if (
                        distance > 0 &&
                        distance < 0.05
                    ) {

                        totalDistance += distance;

                        updateWalkingData();
                    }
                }


                lastPosition = current;

            },

            () => {

                document.getElementById("locationStatus").innerText =
                    hindiMode
                        ? "⚠️ GPS अनुमति दें।"
                        : "⚠️ Please allow location permission.";
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

        document.getElementById("locationStatus").innerText =
            hindiMode
                ? "⏹️ चलने की ट्रैकिंग रोक दी गई।"
                : "⏹️ Walking tracking stopped.";
    }
}


function updateWalkingData() {

    document.getElementById("distance").innerText =
        totalDistance.toFixed(2);

    document.getElementById("homeDistance").innerText =
        totalDistance.toFixed(2);

    document.getElementById("dashboardWalk").innerText =
        totalDistance.toFixed(2) + " km";


    /*
       Approximate step estimate.
       Real apps can use phone sensors for better accuracy.
    */

    const steps =
        Math.round(totalDistance * 1300);


    document.getElementById("steps").innerText =
        steps;


    const progress =
        Math.min(
            (totalDistance / 4) * 100,
            100
        );


    document.getElementById("walkingProgress").style.width =
        progress + "%";
}


/* =========================================
   NEARBY HELP
========================================= */

function findNearby(place) {

    selectedPlace = place;

    document.getElementById("mapResult").innerHTML =

        hindiMode
            ? `🔎 नज़दीकी <strong>${place}</strong> खोजी जा रही है...`
            : `🔎 Searching for nearby <strong>${place}</strong>...`;

    getLocation();
}


function getLocation() {

    if (!navigator.geolocation) {

        document.getElementById("mapResult").innerText =
            hindiMode
                ? "आपके ब्राउज़र में GPS उपलब्ध नहीं है।"
                : "Your browser does not support GPS.";

        return;
    }


    document.getElementById("mapResult").innerText =
        hindiMode
            ? "📍 आपकी लोकेशन प्राप्त की जा रही है..."
            : "📍 Getting your location...";


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


            document.getElementById("mapResult").innerHTML = `

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
        },

        () => {

            document.getElementById("mapResult").innerText =
                hindiMode
                    ? "⚠️ Nearby Help इस्तेमाल करने के लिए GPS अनुमति दें।"
                    : "⚠️ Please allow location permission to use Nearby Help.";
        }
    );
}


/* =========================================
   SMALL MINDMITRA AI DEMO
========================================= */

function askMindMitra() {

    const input =
        document.getElementById("aiQuestion");

    const question =
        input.value.trim();


    if (!question) {

        document.getElementById("aiReply").innerText =
            hindiMode
                ? "कृपया अपना प्रश्न लिखें।"
                : "Please type your question.";

        return;
    }


    /*
       This is a FRONTEND DEMO.
       A real AI chatbot requires backend/API integration.
    */


    let reply;


    if (hindiMode) {

        reply =
            "मैं MindMitra का demo AI सहायक हूं। आपके प्रश्न को समझने के लिए वास्तविक AI backend जोड़ा जा सकता है।";

    } else {

        reply =
            "I am the MindMitra demo AI assistant. A real AI backend can be connected to understand and answer general questions.";

    }


    document.getElementById("aiReply").innerText =
        "🤖 " + reply;


    input.value = "";
}


/* =========================================
   ENTER KEY FOR AI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const input =
        document.getElementById("aiQuestion");


    if (input) {

        input.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                askMindMitra();
            }

        });
    }


    updateYoga();

    updateAIStatus();

});