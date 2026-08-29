/* ========================================= 
   MINDMITRA - COMPLETE JAVASCRIPT 
========================================= */


/* ========================================= 
   GLOBAL VARIABLES 
========================================= */

let hindiMode = false;

let completedReminders = 0;

let gamesCompleted = 0;
let totalScore = 0;

/* 
   Level 1 = very easy 
   Level 2 = easy 
   Level 3 = moderate 
   Level 4 = challenging 
   Level 5 = advanced 
*/
let difficulty = 1;

let watchID = null;
let lastPosition = null;
let totalDistance = 0;

let selectedPlace = "";

let colorSequence = [];
let patternAnswerValue = null;


/* ========================================= 
   TRANSLATION 
========================================= */

function t(en, hi) {
    return hindiMode ? hi : en;
}


/* ========================================= 
   COMPLETE WEBSITE LANGUAGE SWITCH 
========================================= */

function setLanguage(language) {

    hindiMode = language === "hi";

    document.documentElement.lang =
        hindiMode ? "hi" : "en";


    /*
       This is the important part.

       Every element containing data-en and data-hi
       will automatically change.
    */

    document.querySelectorAll("[data-en]").forEach(element => {

        const english = element.getAttribute("data-en");
        const hindi = element.getAttribute("data-hi");

        if (english && hindi) {
            element.innerText =
                hindiMode ? hindi : english;
        }

    });


    /* Header / Hero */

    const welcomeTitle =
        document.getElementById("welcomeTitle");

    if (welcomeTitle) {

        welcomeTitle.innerText =
            t(
                "Welcome to MindMitra",
                "MindMitra में आपका स्वागत है"
            );
    }


    const welcomeText =
        document.getElementById("welcomeText");

    if (welcomeText) {

        welcomeText.innerText =
            t(
                "AI-powered cognitive support, memory assistance & daily wellness",
                "AI आधारित संज्ञानात्मक सहायता, स्मृति सहायक और दैनिक स्वास्थ्य"
            );
    }


    updateAIStatus();


    /* Home */

    /*
       Update the time-based greeting whenever
       the language is changed.
    */

    updateGreeting();


    const homeDescription =
        document.getElementById("homeDescription");

    if (homeDescription) {

        homeDescription.innerText =
            t(
                "Let's keep your mind and body active today.",
                "आज अपने मन और शरीर को सक्रिय रखें।"
            );
    }


    /*
       Change input placeholder.
    */

    const input =
        document.getElementById("aiQuestion");

    if (input) {

        input.placeholder =
            t(
                "Ask MindMitra...",
                "MindMitra से पूछें..."
            );
    }


    /*
       Rebuild any currently running game
       so its text also changes language.
    */

    updateDifficultyUI();

    updateAIRecommendation();

    updateWalkingText();

    updateNearbyText();

}


/* ========================================= 
   AI STATUS 
========================================= */

function updateAIStatus() {

    const status =
        document.getElementById("aiStatus");

    if (!status) {
        return;
    }

    status.innerHTML = `

        <span class="online-dot"></span>

        ${t(
            "AI Assistant Active",
            "AI सहायक सक्रिय"
        )}

    `;
}


/* ========================================= 
   HOME TIME GREETING
========================================= */

function updateGreeting() {

    const greeting =
        document.getElementById("homeGreeting");

    if (!greeting) {
        return;
    }


    const hour =
        new Date().getHours();


    let englishGreeting;
    let hindiGreeting;


    if (hour >= 5 && hour < 12) {

        englishGreeting = "Good Morning 👋";
        hindiGreeting = "सुप्रभात 👋";

    }

    else if (hour >= 12 && hour < 17) {

        englishGreeting = "Good Afternoon 👋";
        hindiGreeting = "नमस्कार 👋";

    }

    else if (hour >= 17 && hour < 21) {

        englishGreeting = "Good Evening 👋";
        hindiGreeting = "शुभ संध्या 👋";

    }

    else {

        englishGreeting = "Good Night 👋";
        hindiGreeting = "शुभ रात्रि 👋";

    }


    greeting.innerText =
        hindiMode
            ? hindiGreeting
            : englishGreeting;
}


/*
   Automatically check the time every minute.

   This means if the website is already open and
   the time changes from morning to afternoon,
   the greeting will update automatically.
*/

setInterval(() => {

    updateGreeting();

}, 60000);


/* ========================================= 
   SECTION NAVIGATION 
========================================= */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {

        section.classList.remove("active");

    });


    const section =
        document.getElementById(sectionId);

    if (section) {

        section.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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
        t(
            "Done ✓",
            "पूरा ✓"
        );


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
        t(
            "🆘 Emergency assistance activated. This is currently a demo feature.",
            "🆘 आपातकालीन सहायता सक्रिय की गई है। यह अभी एक डेमो सुविधा है।"
        )
    );
}


function contactDoctor() {

    alert(
        t(
            "👨‍⚕️ This is a demo. A secure doctor call or video call can be integrated into the real application.",
            "👨‍⚕️ यह एक डेमो है। वास्तविक ऐप में सुरक्षित डॉक्टर कॉल या वीडियो कॉल जोड़ी जा सकती है।"
        )
    );
}


function contactCaregiver() {

    alert(
        t(
            "👨‍👩‍👧 This is a demo. A real application can connect the user with a caregiver.",
            "👨‍👩‍👧 यह एक डेमो है। वास्तविक ऐप में उपयोगकर्ता को देखभालकर्ता से जोड़ा जा सकता है।"
        )
    );
}


/* ========================================= 
   AI DIFFICULTY SYSTEM 
========================================= */

function recordGame(score) {

    gamesCompleted++;

    totalScore += score;


    const average =
        Math.round(
            totalScore / gamesCompleted
        );


    /*
       Difficulty logic.

       Good performance repeatedly increases
       difficulty.

       Low performance decreases it.

       Moderate performance keeps it.
    */

    if (score >= 80 && difficulty < 5) {

        difficulty++;

    }

    else if (score < 50 && difficulty > 1) {

        difficulty--;

    }


    updateDashboard(average);

    updateDifficultyUI();


    let recommendation;
    let memoryStatus;


    if (score >= 80) {

        recommendation =
            t(
                "Excellent work! The AI has increased the challenge for the next activity.",
                "बहुत अच्छा! AI ने अगले अभ्यास की कठिनाई बढ़ा दी है।"
            );


        memoryStatus =
            t(
                "Strong",
                "अच्छा"
            );

    }

    else if (score >= 50) {

        recommendation =
            t(
                "Good effort. The current difficulty will continue.",
                "अच्छा प्रयास। वर्तमान कठिनाई स्तर जारी रहेगा।"
            );


        memoryStatus =
            t(
                "Moderate",
                "सामान्य"
            );

    }

    else {

        recommendation =
            t(
                "The AI has reduced the challenge to provide gentler practice.",
                "AI ने अभ्यास को थोड़ा आसान कर दिया है।"
            );


        memoryStatus =
            t(
                "Needs Practice",
                "अधिक अभ्यास आवश्यक"
            );
    }


    const memoryElement =
        document.getElementById("memoryStatus");

    if (memoryElement) {

        memoryElement.innerText =
            memoryStatus;

    }


    const recommendationElement =
        document.getElementById(
            "dashboardRecommendation"
        );

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


    updateDifficultyUI();
}


/* ========================================= 
   DASHBOARD 
========================================= */

function updateDashboard(average) {

    const games =
        document.getElementById("dashboardGames");

    if (games) {
        games.innerText = gamesCompleted;
    }


    const score =
        document.getElementById("dashboardScore");

    if (score) {
        score.innerText = average + "%";
    }


    const homeScore =
        document.getElementById("homeScore");

    if (homeScore) {
        homeScore.innerText = average + "%";
    }
}


/* ========================================= 
   DIFFICULTY UI 
========================================= */

function updateDifficultyUI() {

    const level =
        document.getElementById("difficultyLevel");

    if (level) {
        level.innerText = difficulty;
    }


    const dashboardLevel =
        document.getElementById("dashboardLevel");

    if (dashboardLevel) {

        dashboardLevel.innerText =
            t(
                "Level " + difficulty,
                "स्तर " + difficulty
            );
    }


    const title =
        document.getElementById("difficultyTitle");

    const description =
        document.getElementById(
            "difficultyDescription"
        );


    const descriptions = {

        1: [
            "Current Level",
            "Starting with gentle cognitive exercises.",
            "वर्तमान स्तर",
            "हल्के संज्ञानात्मक अभ्यास से शुरुआत।"
        ],

        2: [
            "Easy Level",
            "The exercises now require a little more attention.",
            "आसान स्तर",
            "अब अभ्यास में थोड़ा अधिक ध्यान देना होगा।"
        ],

        3: [
            "Moderate Level",
            "The AI is giving you more challenging memory tasks.",
            "मध्यम स्तर",
            "AI अब थोड़े कठिन स्मृति अभ्यास दे रहा है।"
        ],

        4: [
            "Challenging Level",
            "Sequences are longer and require stronger attention.",
            "चुनौतीपूर्ण स्तर",
            "क्रम लंबे हैं और अधिक ध्यान की आवश्यकता है।"
        ],

        5: [
            "Advanced Level",
            "The activities require sustained attention and memory.",
            "उन्नत स्तर",
            "इन अभ्यासों में लगातार ध्यान और स्मृति की आवश्यकता है।"
        ]

    };


    const data =
        descriptions[difficulty];


    if (title) {

        title.innerText =
            hindiMode
                ? data[2]
                : data[0];

    }


    if (description) {

        description.innerText =
            hindiMode
                ? data[3]
                : data[1];

    }


    const progress =
        document.getElementById("levelProgress");

    if (progress) {

        progress.style.width =
            (difficulty * 20) + "%";

    }
}


/* ========================================= 
   MEMORY GAME 
========================================= */

function memoryGame() {

    let items;


    if (difficulty === 1) {

        items =
            ["🍎", "🏠", "🐘"];

    }

    else if (difficulty === 2) {

        items =
            ["🍎", "🏠", "🐘", "🚲"];

    }

    else if (difficulty === 3) {

        items =
            ["🍎", "🏠", "🐘", "🚲", "⭐"];

    }

    else if (difficulty === 4) {

        items =
            ["🍎", "🏠", "🐘", "🚲", "⭐", "🌳"];

    }

    else {

        items =
            ["🍎", "🏠", "🐘", "🚲", "⭐", "🌳", "🎁"];

    }


    const target =
        items[
            Math.floor(
                Math.random() * items.length
            )
        ];


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🃏 ${t(
                "Memory Cards",
                "स्मृति कार्ड"
            )}
        </h2>

        <p>
            ${t(
                "Remember these objects carefully:",
                "इन वस्तुओं को ध्यान से याद करें:"
            )}
        </p>

        <div class="sequence-box">
            ${items.join(" ")}
        </div>

        <p>
            ${t(
                "Try to remember all the objects.",
                "सभी वस्तुओं को याद करने की कोशिश करें।"
            )}
        </p>

        <button onclick='memoryQuestion("${target}")'>
            ${t(
                "Hide & Continue",
                "छिपाएँ और जारी रखें"
            )}
        </button>
    `;
}


function memoryQuestion(target) {

    let options =
        ["🍎", "🚗", "⚽", "📱", "🌸", "🐶", "🎁"];


    options =
        options
            .sort(() => Math.random() - .5)
            .slice(
                0,
                Math.min(
                    difficulty + 2,
                    5
                )
            );


    if (!options.includes(target)) {

        options[0] = target;

    }


    document.getElementById("gameArea").innerHTML = `

        <h2>
            ${t(
                "Which object did you remember?",
                "आपको कौन सी वस्तु याद है?"
            )}
        </h2>

        <div class="game-options">

            ${options.map(
                item => `
                    <button onclick='memoryAnswer("${item}","${target}")'>
                        ${item}
                    </button>
                `
            ).join("")}

        </div>
    `;
}


function memoryAnswer(answer, target) {

    const correct =
        answer === target;


    showGameResult(
        correct ? 100 : 25
    );
}


/* ========================================= 
   COLOR MEMORY 
========================================= */

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
        Math.min(
            3 + difficulty,
            7
        );


    colorSequence = [];


    for (
        let i = 0;
        i < length;
        i++
    ) {

        colorSequence.push(
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ]
        );

    }


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🎨 ${t(
                "Color Memory",
                "रंग स्मृति"
            )}
        </h2>

        <p>
            ${t(
                "Remember this color sequence:",
                "इस रंग क्रम को याद करें:"
            )}
        </p>

        <div class="sequence-box">
            ${colorSequence.map(
                c => c.emoji
            ).join(" ")}
        </div>

        <button onclick="colorQuestion()">
            ${t(
                "Continue",
                "जारी रखें"
            )}
        </button>
    `;
}


function colorQuestion() {

    const targetIndex =
        Math.floor(
            colorSequence.length / 2
        );


    const target =
        colorSequence[targetIndex];


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🎨 ${t(
                "Color Memory Question",
                "रंग स्मृति प्रश्न"
            )}
        </h2>

        <p>
            ${t(
                "Which color was in position " +
                (targetIndex + 1) + "?",
                "स्थान " +
                (targetIndex + 1) +
                " पर कौन सा रंग था?"
            )}
        </p>

        <div class="game-options">

            <button onclick="colorAnswer('red')">
                🔴 ${t("Red", "लाल")}
            </button>

            <button onclick="colorAnswer('green')">
                🟢 ${t("Green", "हरा")}
            </button>

            <button onclick="colorAnswer('blue')">
                🔵 ${t("Blue", "नीला")}
            </button>

            <button onclick="colorAnswer('yellow')">
                🟡 ${t("Yellow", "पीला")}
            </button>

        </div>
    `;
}


function colorAnswer(answer) {

    const targetIndex =
        Math.floor(
            colorSequence.length / 2
        );


    const correct =
        colorSequence[targetIndex].name === answer;


    showGameResult(
        correct ? 100 : 25
    );
}


/* ========================================= 
   NUMBER SEQUENCE 
========================================= */

function numberGame() {

    let start =
        difficulty >= 4
            ? 3
            : 2;


    let step =
        difficulty >= 5
            ? 4
            : difficulty >= 3
                ? 3
                : 2;


    let length =
        difficulty >= 4
            ? 5
            : 4;


    let numbers = [];


    for (
        let i = 0;
        i < length;
        i++
    ) {

        numbers.push(
            start + i * step
        );

    }


    const missing =
        numbers[
            Math.floor(
                numbers.length / 2
            )
        ];


    const shown =
        numbers.map(
            n => n === missing ? "?" : n
        );


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🔢 ${t(
                "Number Sequence",
                "संख्या क्रम"
            )}
        </h2>

        <p>
            ${t(
                "Find the missing number:",
                "लुप्त संख्या खोजें:"
            )}
        </p>

        <h1>
            ${shown.join(" → ")}
        </h1>

        <div class="game-options">

            ${[
                missing,
                missing + step,
                missing - 1,
                missing + 1
            ]
            .sort(() => Math.random() - .5)
            .map(
                n => `
                    <button onclick="numberAnswer(${n},${missing})">
                        ${n}
                    </button>
                `
            ).join("")}

        </div>
    `;
}


function numberAnswer(answer, correctAnswer) {

    showGameResult(
        answer === correctAnswer
            ? 100
            : 25
    );
}


/* ========================================= 
   PICTURE RECOGNITION 
========================================= */

function pictureGame() {

    const pictures = [

        {
            emoji: "🏔️",
            en: "Mountain",
            hi: "पहाड़"
        },

        {
            emoji: "🍎",
            en: "Apple",
            hi: "सेब"
        },

        {
            emoji: "🚲",
            en: "Bicycle",
            hi: "साइकिल"
        },

        {
            emoji: "🏠",
            en: "House",
            hi: "घर"
        },

        {
            emoji: "🌳",
            en: "Tree",
            hi: "पेड़"
        }

    ];


    const item =
        pictures[
            Math.min(
                difficulty - 1,
                pictures.length - 1
            )
        ];


    const wrong =
        pictures.filter(
            p => p.en !== item.en
        );


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🖼️ ${t(
                "Picture Recognition",
                "चित्र पहचान"
            )}
        </h2>

        <div style="font-size:80px;">
            ${item.emoji}
        </div>

        <p>
            ${t(
                "What is this?",
                "यह क्या है?"
            )}
        </p>

        <div class="game-options">

            <button onclick='pictureAnswer(true)'>
                ${item.emoji}
                ${hindiMode ? item.hi : item.en}
            </button>

            <button onclick="pictureAnswer(false)">
                ${wrong[0].emoji}
                ${hindiMode ? wrong[0].hi : wrong[0].en}
            </button>

            <button onclick="pictureAnswer(false)">
                ${wrong[1].emoji}
                ${hindiMode ? wrong[1].hi : wrong[1].en}
            </button>

        </div>
    `;
}


function pictureAnswer(correct) {

    showGameResult(
        correct ? 100 : 25
    );
}


/* ========================================= 
   ATTENTION GAME 
========================================= */

function attentionGame() {

    const normal = "🍎";


    const different =
        difficulty >= 4
            ? "🍊"
            : "🍎";


    const length =
        difficulty + 4;


    let objects =
        Array(length).fill(normal);


    const position =
        Math.floor(
            Math.random() * length
        );


    objects[position] =
        different;


    document.getElementById("gameArea").innerHTML = `

        <h2>
            👀 ${t(
                "Attention Test",
                "ध्यान परीक्षण"
            )}
        </h2>

        <p>
            ${t(
                "Find the different object.",
                "अलग वस्तु खोजें।"
            )}
        </p>

        <div class="sequence-box">
            ${objects.join(" ")}
        </div>

        <div class="game-options">

            <button onclick="attentionAnswer(${different === "🍊"})">
                🍊 ${t("Orange", "संतरा")}
            </button>

            <button onclick="attentionAnswer(false)">
                🍎 ${t("Apple", "सेब")}
            </button>

        </div>
    `;
}


function attentionAnswer(correct) {

    showGameResult(
        correct ? 100 : 25
    );
}


/* ========================================= 
   COMPLETE THE PATTERN 
========================================= */

function patternGame() {

    let pattern;
    let answer;
    let choices;


    if (difficulty === 1) {

        pattern = ["🔴", "🔵", "🔴", "?"];
        answer = "🔵";

        choices =
            ["🔵", "🟢", "🟡"];

    }

    else if (difficulty === 2) {

        pattern = ["🍎", "🍌", "🍎", "🍌", "?"];
        answer = "🍎";

        choices =
            ["🍎", "🍊", "🍇"];

    }

    else if (difficulty === 3) {

        pattern =
            ["🔺", "🔵", "🟩", "🔺", "🔵", "?"];

        answer = "🟩";

        choices =
            ["🟩", "🔺", "⭐"];

    }

    else if (difficulty === 4) {

        pattern =
            ["1", "2", "4", "1", "2", "?"];

        answer = "4";

        choices =
            ["3", "4", "5"];

    }

    else {

        pattern =
            ["🔴", "🔵", "🟢", "🔴", "🔵", "🟢", "?"];

        answer = "🔴";

        choices =
            ["🔴", "🟡", "🟣"];

    }


    patternAnswerValue =
        answer;


    document.getElementById("gameArea").innerHTML = `

        <h2>
            🧩 ${t(
                "Complete the Pattern",
                "पैटर्न पूरा करें"
            )}
        </h2>

        <p>
            ${t(
                "Look carefully and choose what comes next:",
                "ध्यान से देखें और चुनें कि अगला क्या आएगा:"
            )}
        </p>

        <div class="sequence-box">
            ${pattern.join(" → ")}
        </div>

        <div class="game-options">

            ${choices.map(
                choice => `
                    <button
                        class="pattern-choice"
                        onclick='patternAnswer("${choice}")'>
                        ${choice}
                    </button>
                `
            ).join("")}

        </div>
    `;
}


function patternAnswer(answer) {

    showGameResult(
        answer === patternAnswerValue
            ? 100
            : 25
    );
}


/* ========================================= 
   GAME RESULT 
========================================= */

function showGameResult(score) {

    recordGame(score);


    let message;


    if (score >= 80) {

        message =
            t(
                "🎉 Excellent performance!",
                "🎉 बहुत अच्छा प्रदर्शन!"
            );

    }

    else {

        message =
            t(
                "💪 Good effort! Keep practicing.",
                "💪 अच्छा प्रयास! अभ्यास करते रहें।"
            );
    }


    document.getElementById("gameArea").innerHTML = `

        <h2>${message}</h2>

        <div style="font-size:45px;">
            ${score >= 80 ? "🏆" : "🧠"}
        </div>

        <h3>
            ${t("Score", "स्कोर")}: ${score}%
        </h3>

        <p>
            ${t(
                "AI Difficulty Level",
                "AI कठिनाई स्तर"
            )}: ${difficulty}
        </p>

        <div class="game-options">

            <button onclick="memoryGame()">
                🃏 ${t(
                    "Memory",
                    "स्मृति"
                )}
            </button>

            <button onclick="patternGame()">
                🧩 ${t(
                    "Pattern",
                    "पैटर्न"
                )}
            </button>

            <button onclick="showSection('games')">
                🎮 ${t(
                    "All Games",
                    "सभी खेल"
                )}
            </button>

        </div>
    `;
}


/* ========================================= 
   WALKING 
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

        Math.cos(
            lat1 * Math.PI / 180
        ) *
        Math.cos(
            lat2 * Math.PI / 180
        ) *

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
            t(
                "Location is not supported by this browser.",
                "इस ब्राउज़र में लोकेशन उपलब्ध नहीं है।"
            )
        );

        return;
    }


    const status =
        document.getElementById(
            "locationStatus"
        );


    if (status) {

        status.innerText =
            t(
                "📍 Tracking your walking distance...",
                "📍 आपके चलने की दूरी ट्रैक की जा रही है..."
            );

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
                        distance < .05
                    ) {

                        totalDistance +=
                            distance;

                        updateWalkingData();

                    }

                }


                lastPosition =
                    current;

            },


            () => {

                if (status) {

                    status.innerText =
                        t(
                            "⚠️ Please allow location permission.",
                            "⚠️ कृपया लोकेशन की अनुमति दें।"
                        );

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
            document.getElementById(
                "locationStatus"
            );


        if (status) {

            status.innerText =
                t(
                    "⏹️ Walking tracking stopped.",
                    "⏹️ चलने की ट्रैकिंग रोक दी गई।"
                );

        }
    }
}


function updateWalkingData() {

    const distance =
        document.getElementById(
            "distance"
        );


    if (distance) {

        distance.innerText =
            totalDistance.toFixed(2);

    }


    const homeDistance =
        document.getElementById(
            "homeDistance"
        );


    if (homeDistance) {

        homeDistance.innerText =
            totalDistance.toFixed(2);

    }


    const dashboardWalk =
        document.getElementById(
            "dashboardWalk"
        );


    if (dashboardWalk) {

        dashboardWalk.innerText =
            totalDistance.toFixed(2) +
            " km";

    }


    const steps =
        Math.round(
            totalDistance * 1300
        );


    const stepsElement =
        document.getElementById(
            "steps"
        );


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
        document.getElementById(
            "walkingProgress"
        );


    if (progressElement) {

        progressElement.style.width =
            progress + "%";

    }
}


function updateWalkingText() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (
        status &&
        !watchID
    ) {

        status.innerText =
            t(
                "📍 Walking tracker is ready.",
                "📍 चलने की ट्रैकिंग तैयार है।"
            );

    }
}


/* ========================================= 
   NEARBY HELP 
========================================= */

function findNearby(place) {

    selectedPlace =
        place;


    const mapResult =
        document.getElementById(
            "mapResult"
        );


    if (mapResult) {

        mapResult.innerHTML =
            t(
                `🔎 Searching for nearby <strong>${place}</strong>...`,
                `🔎 नज़दीकी <strong>${translatePlace(place)}</strong> खोजी जा रही है...`
            );

    }


    getLocation();
}


function translatePlace(place) {

    const translations = {

        "ATM": "ATM",

        "Petrol Pump": "पेट्रोल पंप",

        "Hospital": "अस्पताल",

        "Pharmacy": "फार्मेसी",

        "Police Station": "पुलिस स्टेशन",

        "Restaurant": "रेस्तरां"

    };


    return hindiMode
        ? translations[place] || place
        : place;
}


function getLocation() {

    if (!navigator.geolocation) {

        const mapResult =
            document.getElementById(
                "mapResult"
            );


        if (mapResult) {

            mapResult.innerText =
                t(
                    "Your browser does not support GPS.",
                    "आपके ब्राउज़र में GPS उपलब्ध नहीं है।"
                );

        }

        return;
    }


    const mapResult =
        document.getElementById(
            "mapResult"
        );


    if (mapResult) {

        mapResult.innerText =
            t(
                "📍 Getting your location...",
                "📍 आपकी लोकेशन प्राप्त की जा रही है..."
            );

    }


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;


            const lon =
                position.coords.longitude;


            const place =
                selectedPlace ||
                "help services";


            if (mapResult) {

                mapResult.innerHTML = `

                    📍

                    ${t(
                        "Your location detected.",
                        "आपकी लोकेशन मिल गई।"
                    )}

                    <br><br>

                    ${t(
                        "Searching nearby:",
                        "नज़दीकी खोज:"
                    )}

                    <strong>
                        ${translatePlace(place)}
                    </strong>

                    <br><br>

                    ${t(
                        "Latitude:",
                        "अक्षांश:"
                    )}

                    ${lat.toFixed(4)}

                    <br>

                    ${t(
                        "Longitude:",
                        "देशांतर:"
                    )}

                    ${lon.toFixed(4)}

                    <br><br>

                    <small>
                        ${t(
                            "These coordinates can be connected to a real map and place-search service.",
                            "इन coordinates को वास्तविक मानचित्र और स्थान खोज सेवा से जोड़ा जा सकता है।"
                        )}
                    </small>

                `;

            }

        },


        () => {

            if (mapResult) {

                mapResult.innerText =
                    t(
                        "⚠️ Please allow location permission to use Nearby Help.",
                        "⚠️ Nearby Help इस्तेमाल करने के लिए लोकेशन की अनुमति दें।"
                    );

            }

        }

    );
}


function updateNearbyText() {

    /*
       Nearby results are regenerated when the user
       selects a nearby category, so no stale
       English navigation text remains.
    */

}


/* ========================================= 
   DEMO AI ASSISTANT 
========================================= */

function askMindMitra() {

    const input =
        document.getElementById(
            "aiQuestion"
        );


    if (!input) {
        return;
    }


    const question =
        input.value.trim();


    const replyElement =
        document.getElementById(
            "aiReply"
        );


    if (!question) {

        if (replyElement) {

            replyElement.innerText =
                t(
                    "Please type your question.",
                    "कृपया अपना प्रश्न लिखें।"
                );

        }

        return;
    }


    const reply =
        t(
            "I am the MindMitra demo AI assistant. A real AI backend can be connected to understand and answer general questions.",
            "मैं MindMitra का डेमो AI सहायक हूँ। सामान्य प्रश्नों को समझने और उत्तर देने के लिए वास्तविक AI backend जोड़ा जा सकता है।"
        );


    if (replyElement) {

        replyElement.innerText =
            "🤖 " + reply;

    }


    input.value = "";
}


/* ========================================= 
   INITIAL PAGE LOAD 
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAIStatus();

        updateAIRecommendation();

        updateDifficultyUI();

        updateWalkingText();

        /*
           IMPORTANT:
           Set the greeting immediately when
           the website loads.
        */

        updateGreeting();

    }
);


/* ========================================= 
   INITIAL AI MESSAGE 
========================================= */

function updateAIRecommendation() {

    const message =
        document.getElementById(
            "aiHomeMessage"
        );


    if (!message) {
        return;
    }


    if (gamesCompleted === 0) {

        message.innerText =
            t(
                "Complete a cognitive game to receive a personalized recommendation.",
                "व्यक्तिगत सुझाव प्राप्त करने के लिए कोई संज्ञानात्मक खेल खेलें।"
            );

    }
}