const scenes = [
    {
        image: "02.png", // ตัวละคร ป๋อง
        dialogue: "มายล์: เฮ้ ต้น! สนใจหาเงินง่ายๆ มั้ย? เล่นแค่เกมเล็กๆ เดี๋ยวเราสอนให้!",
        choices: [
            { text: "ไม่ล่ะ ขอบใจนะ แต่เราไม่สนใจ", score: 10 },
            { text: "ไม่เอาดีกว่า เราไม่อยากเสียเงิน เสียเวลา และอาจจะเสียเพื่อนด้วย", score: 10 },
            { text: "เอาสิ เล่นเลย", score: -30 }
        ]
    },
    {
        image: "03.png", // เพื่อนในโซเชียล
        dialogue: "เพื่อนในโซเชียลโพส เว็บนี้แจกเครดิตฟรี แค่สมัครก็ได้เงิน!",
        choices: [
            { text: "เลื่อนผ่านไม่สนใจ", score: 10 },
            { text: "คลิกลิงก์ทันที", score: -30 },
            { text: "แนะนำคนใกล้ชิดให้ระวัง", score: 10 }
        ]
    },
    {
        image: "04.png", // ครู
        dialogue: "ครูที่โรงเรียนประกาศเตือน มีนักเรียนคนหนึ่งติดหนี้จากการพนันออนไลน์ ระวังตัวเองไว้ให้ดี!",
        choices: [
            { text: "คิดว่าไม่ควรยุ่งเกี่ยวกับการพนัน", score: 10 },
            { text: "ถามครูเพิ่มเติมเกี่ยวกับเรื่องนี้", score: 5 },
            { text: "ไม่สนใจคำเตือนของครู", score: -20 }
        ]
    },
      {
        image: "05.png", // ตัวละคร ป๋อง
        dialogue: "มีคนแปลกทักมาชวนเล่นพนันออนไลน์ บอกได้เงินง่าย",
        choices: [
            { text: "ไม่สนใจข้อความ", score: 10 },
            { text: "เลิกติดตามและบล็อคทันที", score: 10 },
            { text: "ตอบตกลง", score: -30 }
        ]
    },
    {
        image: "06.png", // เพื่อนในโซเชียล
        dialogue: "คนที่บ้านพูดคุยกันถึงอันตรายจากการเล่นพนันออนไลน์!",
        choices: [
            { text: "เข้าไปฟังและถามข้อสงสัย", score: 10 },
            { text: "ทำตัวเมินเฉย", score: -30 },
            { text: "เข้าไปพูดปฏิเสธว่าไม่มีอันตราย", score: -30 }
        ]
    },
    {
        image: "07.png", // ครู
        dialogue: "เมื่อมีคนโพสถึงสื่อที่ช่วยแนะนำการป้องกันอันตรายจากการพนันออนไลน์!",
        choices: [
            { text: "กดเข้าไปดู", score: 10 },
            { text: "แชร์ให้รอบตัว", score: 5 },
            { text: "เลื่อนผ่าน และกดรายงาน", score: -20 }
        ]
    }
  
];

let currentScene = 0;
let score = 0;
 
//เริ่มเกม
function startGame() {
  //ซ่อนเนื้อหาแนะนำ
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("game-screen").classList.remove("hidden");
    loadScene(currentScene);
}

function loadScene(sceneIndex) {
    const scene = scenes[sceneIndex];

    // อัปเดตรูปตัวละครและข้อความ
    document.getElementById("character-image").src = scene.image;
    document.getElementById("dialogue-text").textContent = scene.dialogue;

    // สร้างตัวเลือก
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => handleChoice(choice.score);
        choicesContainer.appendChild(button);
    });

    document.getElementById("score").textContent = `คะแนน: ${score}`;
}

function handleChoice(choiceScore) {
    score += choiceScore;

    currentScene++;
    if (currentScene < scenes.length) {
        loadScene(currentScene);
    } else {
        displayEnding();
    }
}

function displayEnding() {
    document.getElementById("dialogue-text").textContent = score >= 0 
        ? "เยี่ยมมาก: ต้นสามารถปฏิเสธคำชวนทั้งหมดได้!"
        : "เกิดความเสี่ยง: ต้นหลงเชื่อคำชวนจนทำให้เกิดปัญหาหนัก!";
    document.getElementById("choices").innerHTML = "";
    const restartButton = document.createElement("button");
    restartButton.textContent = "เริ่มใหม่";
    restartButton.onclick = restartGame;
    document.getElementById("choices").appendChild(restartButton);
}
function restartGame() {
    currentScene = 0;
    score = 0;

    // ซ่อนหน้าจอเกม
    document.getElementById("game-screen").classList.add("hidden");

    // แสดงหน้าแนะนำใหม่
    document.getElementById("intro-screen").style.display = "block";
}

