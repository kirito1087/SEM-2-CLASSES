let abcd = document.querySelector("#input");
let btn = document.querySelector("#butto");
let iconImg = document.querySelector(".weather-status .icon img");

// Icon URLs (royalty-free PNGs)
const ICONS = {
    sun: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-sunny.svg",
    moon: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-night-clear.svg",
    cloud: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloudy.svg",
    rain: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-rain.svg",
    snow: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-snow.svg"
};

function pickIcon(temp, hour, conditionText) {
    // Prioritize precipitation
    const cond = conditionText.toLowerCase();
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower")) return ICONS.rain;
    if (cond.includes("snow") || cond.includes("sleet") || cond.includes("ice")) return ICONS.snow;
    if (cond.includes("cloud") || cond.includes("overcast")) return ICONS.cloud;
    // Night or day
    if (hour >= 20 || hour < 6) {
        if (temp < 5) return ICONS.snow;
        return ICONS.moon;
    }
    if (temp >= 30) return ICONS.sun;
    if (temp < 5) return ICONS.snow;
    return ICONS.sun;
}

// Translate weather messages to Japanese
function translateToJapanese(text) {
    // Remove emojis first for cleaner translation
    let cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u2600-\u27B0]/gu, '').trim();
    
    // Japanese translation dictionary for weather messages
    const translations = {
        "It's LIT out there! Time to hit the beach~": "めっちゃ暑い！ビーチに行きましょう~",
        "UwU so hot I'm melting! Literally": "あつい...私溶けちゃう！本当に～",
        "Perfect thigh-highs weather! ": "太もも上げ天気最高！",
        "Sun so bright, almost as bright as my love!": "太陽がキラキラ...私の恋のように～",
        "Time to get that tan, desu!": "日焼けの時間ですね～",
        "Yo this is a SIZZLER! Stay hydrated babe": "むっちゃ暑い！水を飲んでね～",
        "It's dark and mysterious... like my feelings": "暗くて神秘的...私の気持ちみたい～",
        "Yami yami... time for stargazing!": "暗い暗い...星を見ましょう！",
        "Moonlight makes everything romantic~": "月の光は...ロマンチック～",
        "Perfect for late-night shenanigans!": "夜中のいたずら時間！",
        "Sleep tight don't let the bed bugs bite!": "おやすみなさい！",
        "Cloudy but make it fashion!": "曇りだけど...ファッション！",
        "Gray skies = perfect indoor anime time!": "アニメ見る時間最高！",
        "Moody weather = moody vibes, let's goooo!": "気分がいい！頑張ろう！",
        "Cloud cover = less sun damage! Smart nature~": "紫外線が少ない...賢い自然ね～",
        "BROOOOO IT'S HOTTER THAN ME!": "めっちゃ熱い...私より熱い！",
        "This heatwave = instant sweat look. Not cute.": "暑波が来ました...汗かいちゃった",
        "It's FREEZING! Time for hot cocoa together~": "冷たい！ココアを飲みましょう～",
        "My teeth are chattering! Is that cute??": "歯がガタガタ...かわいい？",
        "Bundle up! This is sweater season baby!": "セーターを着てね～",
        "THUNDERSTORM MODE! SUPER SAIYAN ACTIVATED!": "雷ストーム！スーパーサイヤ人モード！",
        "This energy is INSANE! I'm PUMPED!": "このエネルギー...最高！",
        "PIKA PIKA?!": "ピカピカ？！"
    };
    
    // Try to find a matching translation
    for (let key in translations) {
        if (cleanText.includes(key)) {
            return translations[key];
        }
    }
    
    // If no translation found, try a simple English-to-Japanese conversion
    // For messages about weather conditions
    if (cleanText.includes("sunny") || cleanText.includes("sunny")) {
        return "晴れている！すごい天気ですね～";
    } else if (cleanText.includes("rain")) {
        return "雨が降っています...濡れちゃった！";
    } else if (cleanText.includes("snow")) {
        return "雪が降ってる！きれいですね～";
    } else if (cleanText.includes("cloud")) {
        return "曇っていますね...";
    }
    
    // Fallback: return original text if no translation available
    return text;
}

// Function to perform weather search
function searchWeather() {
    let c = abcd.value.trim();
    if(c != ""){
        alert("i was clicked")
        // Call API
        fetch(`https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=${c}&aqi=no`)
        .then((response) => response.json())
        .then((data) => {
                // update DOM
                document.querySelector(".temperature").textContent = `${data.current.temp_c} °C`;
                document.querySelector(".location").textContent = data.location.name;
                document.querySelector(".time").textContent = data.location.localtime.split(" ")[1];
                document.querySelector(".day").textContent = new Date(data.location.localtime).toLocaleString("en-US", { weekday: "long" });
                document.querySelector(".date").textContent = data.location.localtime.split(" ")[0];
                // Set icon based on temp and time
                if (iconImg) {
                    let temp = data.current.temp_c;
                    let localtime = data.location.localtime;
                    let hour = 12;
                    if (localtime) {
                        let t = localtime.split(" ")[1];
                        if (t) hour = parseInt(t.split(":")[0], 10);
                    }
                    let iconUrl = pickIcon(temp, hour, data.current.condition.text || "");
                    iconImg.src = iconUrl;
                    iconImg.alt = data.current.condition.text || "weather icon";
                }
                // Waifu reacts to weather!
                waifuReactToWeather(data);
                abcd.value = "";
        })
        .catch((error) => {
                console.error("Error fetching weather data:", error);
        });
    }
}

// Click event on search button
btn.addEventListener("click", searchWeather);

// Enter key in input field
abcd.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        searchWeather();
    }
});

/* 💖 WAIFU MASCOT INTERACTIONS 💖 */
const waifuMessages = {
    sunny: [
        "☀️ It's LIT out there! Time to hit the beach~ �",
        "UwU so hot I'm melting! Literally 🌡️",
        "Perfect thigh-highs weather! 😏✨",
        "Sun so bright, almost as bright as my love! ☀️💕",
        "Time to get that tan, desu! 🏖️",
        "Yo this is a SIZZLER! Stay hydrated babe 💧",
    ],
    night: [
        "🌙 It's dark and mysterious... like my feelings �",
        "Yami yami... time for stargazing! ⭐",
        "Moonlight makes everything romantic~ 🥰🌙",
        "Perfect for late-night shenanigans! 👀✨",
        "Sleep tight don't let the bed bugs bite! 😴",
        "Spooky! Perfect horror movie weather! �",
    ],
    cloudy: [
        "☁️ Cloudy but make it fashion! 😌",
        "Gray skies = perfect indoor anime time! 📺",
        "Moody weather = moody vibes, let's goooo! 🎭",
        "Cloud cover = less sun damage! Smart nature~ 🧠",
        "Overcast and OVERRATED! Just kidding it's nice 😊",
        "Fluffy clouds = fluffy hair day! ☁️💇‍♀️",
    ],
    rainy: [
        "🌧️ *Poggers in rain sounds* 💧",
        "Rainy day = anime marathon day! Perfect! 📚",
        "This weather hits different... literally! 💦",
        "Bring an umbrella or get SOAKED! �",
        "Pitter patter! My heart goes pitter patter! 💕",
        "Rain check? Nah, let's GO OUT! �‍♀️💨",
    ],
    snowy: [
        "❄️ WINTER WAIFU MODE ACTIVATED! ❄️😍",
        "So beautiful... makes me wanna build a snowman! ⛄",
        "Snowball fight later?? 👀❄️",
        "This is giving PURE AESTHETIC energy! 📸✨",
        "Cold outside but my heart is WARM for you! 💖❄️",
        "Snowflakes are kawaii af! ❄️🥺",
    ],
    hot: [
        "🔥 BROOOOO IT'S HOTTER THAN ME! (barely possible) 🔥😏",
        "This heatwave = instant sweat look. Not cute. 😅",
        "Stay inside with me? I mean... AC! 😳💨",
        "Hydration check! Drink water or else! 💧💪",
        "Too hot to handle! Wait that's just me~ 😉",
    ],
    cold: [
        "❄️ It's FREEZING! Time for hot cocoa together~ ☕😊",
        "My teeth are chattering! Is that cute?? 🥶",
        "Bundle up! This is sweater season baby! 🧣",
        "Jack Frost ain't got NOTHING on this chill! ❄️",
        "So cold even my personality is frozen! 🧊😶",
    ],
};

function waifuReactToWeather(data) {
    let temp = data.current.temp_c;
    let cond = data.current.condition.text.toLowerCase();
    let location = data.location.name;
    let humidity = data.current.humidity;
    let windSpeed = data.current.wind_kph;
    let feelsLike = data.current.feelslike_c;
    
    let messages = [];
    let bgClass = "bg-night"; // Default background
    
    if (cond.includes("rain")) {
        messages = waifuMessages.rainy;
        bgClass = "bg-rainy";
    } else if (cond.includes("snow")) {
        messages = waifuMessages.snowy;
        bgClass = "bg-snowy";
    } else if (cond.includes("cloud") || cond.includes("overcast")) {
        messages = waifuMessages.cloudy;
        bgClass = "bg-cloudy";
    } else if (cond.includes("clear") || cond.includes("sunny")) {
        messages = waifuMessages.sunny;
        bgClass = "bg-sunny";
    } else if (cond.includes("thunder")) {
        messages = [
            "⚡ THUNDERSTORM MODE! SUPER SAIYAN ACTIVATED! ⚡🔥",
            "This energy is INSANE! I'm PUMPED! ⚡💪",
            "PIKA PIKA?! 🐭⚡",
        ];
        bgClass = "bg-rainy"; // Use rainy for thunderstorm
    } else {
        messages = waifuMessages.night;
        bgClass = "bg-night";
    }
    
    // Apply background based on time of day if conditions allow
    let localtime = data.location.localtime;
    let hour = 12;
    if (localtime) {
        let t = localtime.split(" ")[1];
        if (t) hour = parseInt(t.split(":")[0], 10);
    }
    
    // If it's night (8 PM to 6 AM) and weather isn't overriding, use night background
    if ((hour >= 20 || hour < 6) && !cond.includes("rain") && !cond.includes("cloud") && !cond.includes("overcast")) {
        bgClass = "bg-night";
    }
    
    // Change the background
    let body = document.querySelector("body");
    body.classList.remove("bg-sunny", "bg-night", "bg-cloudy", "bg-rainy", "bg-snowy");
    body.classList.add(bgClass);
    
    // Add temperature-based commentary
    if (temp > 35) messages = waifuMessages.hot;
    else if (temp < -5) messages = waifuMessages.cold;
    
    let baseMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // Build full report
    let fullReport = `📍 ${location} Weather Report:\n\n`;
    fullReport += `${baseMsg}\n\n`;
    fullReport += `🌡️ Temp: ${temp}°C (feels like ${feelsLike}°C)\n`;
    fullReport += `💧 Humidity: ${humidity}%\n`;
    fullReport += `💨 Wind: ${windSpeed} km/h\n`;
    fullReport += `⛅ Condition: ${cond}\n\n`;
    
    if (temp > 30) fullReport += "🔥 STAY COOL! (unlike me hehe~)\n";
    if (temp < 0) fullReport += "❄️ BUNDLE UP BESTIE!\n";
    if (windSpeed > 30) fullReport += "💨 HOLD YOUR HAT! It's WINDY!\n";
    if (humidity > 80) fullReport += "💧 It's HUMID! Hair might frizz!\n";
    
    showWaifuMessage(baseMsg);
}

function showWaifuMessage(text, shouldSpeak = true) {
    let bubble = document.getElementById("waifuBubble");
    let textEl = bubble.querySelector(".waifu-bubble-text");
    
    // Dynamically adjust bubble size based on text length
    textEl.style.whiteSpace = "normal";
    
    if (text.length > 120) {
        bubble.style.maxWidth = "350px";
        textEl.style.fontSize = "0.8rem";
    } else if (text.length > 70) {
        bubble.style.maxWidth = "300px";
        textEl.style.fontSize = "0.88rem";
    } else if (text.length > 40) {
        bubble.style.maxWidth = "240px";
        textEl.style.fontSize = "0.95rem";
    } else {
        bubble.style.maxWidth = "200px";
        textEl.style.fontSize = "1rem";
    }
    
    textEl.textContent = text;
    bubble.classList.add("active");
    
    // Text-to-speech with SUPER CUTE Japanese anime girl voice speaking English
    if (shouldSpeak && 'speechSynthesis' in window) {
        // Cancel any previous speech
        speechSynthesis.cancel();
        
        // Keep English text, add cute anime filler words
        let cuteText = text;
        if (Math.random() > 0.1) {
            const fillers = ["~", "desu ne~", "uwu", "owo", "yay!", "kawaii!", "sugoi!", "hehe~", "ehehe!", "kyaaaaa~"];
            cuteText += " " + fillers[Math.floor(Math.random() * fillers.length)];
        }
        
        // Remove emojis from speech text (keep them in display)
        let speechText = cuteText.replace(/[\u{1F300}-\u{1F9FF}]|[\u2600-\u27B0]/gu, '').trim();
        
        let utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'en-US'; // Speak English
        utterance.rate = 1.0; // Normal speed for clear pronunciation
        utterance.pitch = 1.5; // High pitch for cute anime girl voice
        utterance.volume = 1;
        
        // Get available voices and pick Japanese or cute female voices
        let voices = speechSynthesis.getVoices();
        
        // Priority: Find Japanese female voices that can speak English with accent
        let selectedVoice = null;
        
        // Try to find Japanese voices first (they'll give Japanese accent to English)
        selectedVoice = voices.find(v => 
            (v.lang === 'ja-JP' || v.lang.includes('ja')) && (
                v.name.includes('female') || 
                v.name.includes('Female') ||
                v.name.includes('女') ||
                v.name.includes('Kyoko') ||
                v.name.includes('Gyro')
            )
        );
        
        // Fallback to cute female voices
        if (!selectedVoice) {
            selectedVoice = voices.find(v => 
                v.name.includes('Samantha') ||
                v.name.includes('Moira') ||
                v.name.includes('Fiona') ||
                v.name.includes('Kyoko') ||
                v.name.includes('Female') ||
                v.name.includes('female')
            );
        }
        
        // Last resort: first available voice
        if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        speechSynthesis.speak(utterance);
    }
}

// Bubble click interactions - show random messages
let bubble = document.getElementById("waifuBubble");
const bubbleMessages = [
    "Kawaii! ⛅✨",
    "How's the weather? 🌤️",
    "Stay safe! 💕",
    "Genki desu! 😊",
    "Arigatou! 🙏",
    "UwU UwU 💕",
    "Weather check! ⛈️",
    "Let's check the weather! 🌈",
    "So kyute! 💖",
    "Daisuki! 💗",
    "Weather update time! 📡",
];

bubble.addEventListener("click", () => {
    let msg = bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)];
    showWaifuMessage(msg, true);
});

// Waifu click interactions
let waifu = document.getElementById("waifu");
const clickMessages = [
    "Huh?! 😳💕",
    "D-Don't touch me like that! 🥰",
    "Kawaii desu ne! 💕✨",
    "Yada...abunai! 😌",
    "E-Ecchi! 😭💦",
    "Sugoi! ⭐🔥",
    "Nani?! 👀😲",
    "B-Baka! 😊💕",
    "Suki desu yo! 💖😍",
    "Kyaaaaa~! 🌸✨",
    "Oishii! 😋🍔",
    "Sugoi kawaii! 🥺💕",
    "Why u bully me?? 😭💔",
    "YAMETE KUDASAI! 😭😆",
    "You're making me blush! 🥰💕",
];

let clickCount = 0;
waifu.addEventListener("click", () => {
    clickCount++;
    let msg = clickMessages[Math.floor(Math.random() * clickMessages.length)];
    showWaifuMessage(msg);
    
    // Extra animation on click
    waifu.style.animation = "none";
    setTimeout(() => {
        waifu.style.animation = "";
    }, 10);
    
    // Easter egg: 10 clicks
    if (clickCount === 10) {
        showWaifuMessage("Stop touching me so much! 😳💦");
    }
    if (clickCount === 20) {
        showWaifuMessage("You're obsessed aren't you? 😏💕");
    }
});

// Random waifu messages every 30 seconds
setInterval(() => {
    const randomMsgs = [
        "Ohayou gozaimasu! ☀️😊",
        "Genki desu! 💫✨",
        "How's the weather treating you? 🌤️",
        "Stay safe out there! 🙏💕",
        "Weather check-in time! ⛅",
        "Arigatou for chilling with me! 🥺�",
        "UwU UwU UwU! 💕😍",
        "Daisuki na kimi! 💖",
        "This app is more fun with me right? 😏✨",
        "Don't forget to hydrate! 💧😊",
    ];
    let msg = randomMsgs[Math.floor(Math.random() * randomMsgs.length)];
    showWaifuMessage(msg);
}, 35000);