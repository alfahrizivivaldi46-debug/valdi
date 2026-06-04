// quiz.js - Versi Perbaikan Total Koneksi & Parsing Data CheatNetwork
(async () => {
  console.log(
    "🚀 Menyuntikkan Engine Valdi Terbuka (Anti-Cheat & Auto-Fetch)...",
  );

  // ==========================================
  // 1. BYPASS SYSTEM & ANTI-DETECTION ENGINE
  // ==========================================
  const forcePageActive = () => {
    Object.defineProperty(document, "visibilityState", {
      get: () => "visible",
      configurable: true,
    });
    Object.defineProperty(document, "hidden", {
      get: () => false,
      configurable: true,
    });
    Object.defineProperty(document, "webkitVisibilityState", {
      get: () => "visible",
      configurable: true,
    });
  };
  forcePageActive();

  const bypassEvents = [
    "visibilitychange",
    "webkitvisibilitychange",
    "blur",
    "focus",
    "resize",
    "mouseleave",
    "contextmenu",
    "copy",
    "paste",
    "selectstart",
  ];

  bypassEvents.forEach((eventName) => {
    window.addEventListener(
      eventName,
      (e) => e.stopImmediatePropagation(),
      true,
    );
    document.addEventListener(
      eventName,
      (e) => e.stopImmediatePropagation(),
      true,
    );
  });

  const originalSetInterval = window.setInterval;
  window.setInterval = function (handler, timeout) {
    return originalSetInterval(function () {
      forcePageActive();
      handler();
    }, timeout);
  };

  Object.defineProperty(document, "fullscreenElement", {
    get: () => document.documentElement,
    configurable: true,
  });
  document.addEventListener(
    "fullscreenchange",
    (e) => e.stopImmediatePropagation(),
    true,
  );
  window.addEventListener(
    "fullscreenchange",
    (e) => e.stopImmediatePropagation(),
    true,
  );
  document.hasFocus = () => true;

  let gameDatabasePayload = null;

  // ==========================================
  // 2. KONEKSI LINK DATA CHEATNETWORK (FIXED & DEBUGGED)
  // ==========================================
  async function loadCheatNetworkData(pinGame, tipePlatform) {
    let targetEndpoint = "";

    // Memetakan opsi game ke endpoint CheatNetwork yang sesuai permintaan kamu
    if (tipePlatform === "kahoot") {  
      targetEndpoint = `https://cheatnetwork.eu/services/kahoot?pin=${encodeURIComponent(pinGame)}`;  
    } else if (tipePlatform === "wayground" || tipePlatform === "quizizz") {  
      targetEndpoint = `https://cheatnetwork.eu/services/quizizz?pin=${encodeURIComponent(pinGame)}`;  
    } else {
      // Fallback untuk autoJawab atau opsi tak terduga
      targetEndpoint = `https://cheatnetwork.eu/services/quizizz?pin=${encodeURIComponent(pinGame)}`;
    }  

    try {  
      console.log(`📡 Mencoba sinkronisasi PIN [${tipePlatform.toUpperCase()}]: ${pinGame}...`);  
      console.log(`🔗 Target URL: ${targetEndpoint}`);

      const response = await fetch(targetEndpoint, {  
        method: "GET",  
        headers: { Accept: "application/json" },  
      });  

      if (!response.ok) return false;  

      const rawData = await response.json();  

      // Validasi apakah data dari CheatNetwork kosong atau tidak  
      if (  
        !rawData ||  
        (Array.isArray(rawData) && rawData.length === 0) ||  
        rawData.success === false  
      ) {  
        return false;  
      }  

      gameDatabasePayload = rawData;  
      return true;  
    } catch (error) {  
      console.error("❌ Error Fetching dari CheatNetwork:", error);  
      return false;  
    }
  }

  // Parser Pintar: Membaca segala jenis perubahan struktur objek JSON CheatNetwork
  function ekstraktorKunciJawaban(teksSoal) {
    if (!gameDatabasePayload) return "Database Game Kosong.";
    if (!teksSoal) return "Menunggu deteksi soal aktif...";

    const soalBersih = teksSoal.toLowerCase().trim();  

    // Auto-detect apakah data berbentuk array langsung, atau dibungkus dalam properti tertentu  
    let listPertanyaan = [];  
    if (Array.isArray(gameDatabasePayload)) {  
      listPertanyaan = gameDatabasePayload;  
    } else if (gameDatabasePayload.questions) {  
      listPertanyaan = gameDatabasePayload.questions;  
    } else if (gameDatabasePayload.data) {  
      listPertanyaan =  
        gameDatabasePayload.data.questions || gameDatabasePayload.data;  
    } else if (gameDatabasePayload.answers) {  
      listPertanyaan = gameDatabasePayload.answers;  
    }  

    if (Array.isArray(listPertanyaan)) {  
      for (let item of listPertanyaan) {  
        // Cari teks pertanyaan di berbagai kemungkinan nama properti objek  
        const textPembanding = (  
          item.text ||  
          item.question ||  
          item.title ||  
          item.questionText ||  
          ""  
        ).toLowerCase();  

        if (  
          textPembanding.includes(soalBersih) ||  
          soalBersih.includes(textPembanding)  
        ) {  
          // Cari teks jawaban benar di berbagai kemungkinan nama properti objek  
          return (  
            item.correctAnswer ||  
            item.answer ||  
            item.textAnswer ||  
            item.correct ||  
            "Kunci ditemukan, cek opsi browser."  
          );  
        }  
      }  
    }  
    return "Soal tidak ditemukan di database CheatNetwork.";
  }

  // ==========================================
  // 3. UI GENERATOR: INTERFACE MENU KONTROL (FIXED TYPO)
  // ==========================================
  function createModalOverlay(htmlContent) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(5px)",
      zIndex: "999999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
    });
    overlay.innerHTML = htmlContent;
    document.body.appendChild(overlay);
    return overlay;
  }

  async function getConfiguration() {
    return new Promise((resolve) => {
      // FIXED: Memperbaiki tag </option> pada Quizizz/Wayground yang rusak sebelumnya
      const modalHTML = `
        <div style="background:#ffffff; padding:30px; border-radius:16px; width:360px; text-align:center; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3);">
          <h2 style="margin-top:0; margin-bottom:6px; color:#1e293b; font-size:24px; font-weight:800;">ValdiHack</h2>
          <p style="color:#64748b; font-size:13px; margin-bottom:24px;">Bypass Token & Terintegrasi ke cheatnetwork.eu</p>

          <div style="text-align:left; margin-bottom:14px;">  
            <label style="font-weight:700; color:#475569; font-size:13px;">Game PIN / PINClass:</label>  
            <input id="gamePin" placeholder="Masukkan Kode PIN Game" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:6px; box-sizing:border-box; font-size:14px;">  
          </div>  

          <div style="text-align:left; margin-bottom:24px;">  
            <label style="font-weight:700; color:#475569; font-size:13px;">Jenis / Opsi Game:</label>  
            <select id="gamePlatform" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; margin-top:6px; box-sizing:border-box; font-size:14px; background:#fff;">  
              <option value="default" disabled selected>-- Pilih Platform --</option>  
              <option value="wayground">Quizizz / Wayground</option>  
              <option value="kahoot">Kahoot</option>  
              <option value="autoJawab">Auto Jawab (Semua Game)</option>  
            </select>  
          </div>  
            
          <div id="statusLog" style="margin-bottom:16px; font-size:13px; color:#ef4444; font-weight:600;"></div>  

          <button id="executeBtn" style="width:100%; padding:14px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:700; font-size:15px; cursor:pointer;">  
            Hubungkan & Ambil Jawaban  
          </button>  
        </div>  
      `;  

      const overlay = createModalOverlay(modalHTML);  
      const gamePinInput = overlay.querySelector("#gamePin");  
      const gamePlatformSelect = overlay.querySelector("#gamePlatform");  
      const executeBtn = overlay.querySelector("#executeBtn");  
      const statusLog = overlay.querySelector("#statusLog");  

      executeBtn.addEventListener("click", async () => {  
        const pinValue = gamePinInput.value.trim();  
        const platformValue = gamePlatformSelect.value;  

        if (!pinValue || platformValue === "default") {  
          statusLog.textContent = "⚠️ Mohon isi KODE dan Pilih Platform Game!";  
          return;  
        }  

        statusLog.style.color = "#2563eb";  
        statusLog.textContent =  
          "⏳ Memverifikasi KODE ke Server CheatNetwork...";  

        const isLoaded = await loadCheatNetworkData(pinValue, platformValue);  

        if (isLoaded) {  
          statusLog.style.color = "#16a34a";  
          statusLog.textContent = "✅ Sukses! Membuka Dashboard Jawaban...";  
          setTimeout(() => {  
            overlay.remove();  
            resolve({ pin: pinValue, platform: platformValue });  
          }, 800);  
        } else {  
          statusLog.style.color = "#ef4444";  
          statusLog.textContent =  
            "❌ KODE tidak valid di CheatNetwork / Room Belum Mulai.";  
        }  
      });  
    });
  }

  const appConfig = await getConfiguration();

  // ==========================================
  // 4. FLOATING CONTROL PANEL (WIDGET JAWABAN)
  // ==========================================
  function launchFloatingWidget(pin, platform) {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "boyhack-floating-frame";
    Object.assign(widgetContainer.style, {
      position: "fixed",
      top: "60px",
      right: "30px",
      width: "350px",
      height: "460px",
      zIndex: "999999",
      border: "2px solid #1e293b",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      fontFamily: "sans-serif",
    });

    const widgetHeader = document.createElement("div");  
    Object.assign(widgetHeader.style, {  
      padding: "14px",  
      background: "#1e293b",  
      color: "#f8fafc",  
      fontWeight: "700",  
      cursor: "move",  
      display: "flex",  
      justifyContent: "space-between",  
      alignItems: "center",  
      fontSize: "14px",  
    });  
    widgetHeader.innerHTML = `<span>BoyHack Panel [${platform.toUpperCase()}]</span>`;  

    const closeWidget = document.createElement("span");  
    closeWidget.textContent = "✕";  
    closeWidget.style.cursor = "pointer";  
    closeWidget.addEventListener("click", () => {  
      clearInterval(domWatcherLoop);  
      widgetContainer.remove();  
    });  
    widgetHeader.appendChild(closeWidget);  
    widgetContainer.appendChild(widgetHeader);  

    const widgetBody = document.createElement("div");  
    Object.assign(widgetBody.style, {  
      padding: "15px",  
      flex: "1",  
      overflowY: "auto",  
      background: "#f8fafc",  
    });  
    widgetContainer.appendChild(widgetBody);  
    document.body.appendChild(widgetContainer);  

    // SYSTEM DRAG AND DROP  
    let draggingActive = false,  
      startMouseX = 0,  
      startMouseY = 0;  
    widgetHeader.addEventListener("mousedown", (e) => {  
      draggingActive = true;  
      startMouseX = e.clientX - widgetContainer.offsetLeft;  
      startMouseY = e.clientY - widgetContainer.offsetTop;  
    });  
    document.addEventListener("mousemove", (e) => {  
      if (draggingActive) {  
        widgetContainer.style.left = e.clientX - startMouseX + "px";  
        widgetContainer.style.top = e.clientY - startMouseY + "px";  
        widgetContainer.style.right = "auto";  
      }  
    });  
    document.addEventListener("mouseup", () => (draggingActive = false));  

    // ==========================================  
    // 5. DOM WATCHER LOOP (REALTIME DETECTOR)  
    // ==========================================  
    const domWatcherLoop = setInterval(() => {  
      let currentQuestionText = "";  
      let interactiveButtons = [];  

      // Scraper Elemen Halaman Game  
      if (  
        platform === "kahoot" ||  
        window.location.hostname.includes("kahoot")  
      ) {  
        const queryEl = document.querySelector(  
          '[data-functional-selector="question-block-title"]',  
        );  
        if (queryEl) currentQuestionText = queryEl.innerText;  
        interactiveButtons = Array.from(  
          document.querySelectorAll(  
            '[data-functional-selector="answer-block"]',  
          ),  
        );  
      } else {  
        const queryEl = document.querySelector(  
          '.question-title, [class*="question"], [data-theme="question-text"], h1',  
        );  
        if (queryEl) currentQuestionText = queryEl.innerText;  
        interactiveButtons = Array.from(  
          document.querySelectorAll(  
            '.answer-option, [class*="answer"], [class*="control-button"]',  
          ),  
        );  
      }  

      if (currentQuestionText) {  
        const finalAnswerKey = ekstraktorKunciJawaban(currentQuestionText);  

        widgetBody.innerHTML = `  
          <div style="margin-bottom:14px;">  
            <span style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase;">Soal Aktif Terdeteksi:</span>  
            <div style="background:#ffffff; border:1px solid #e2e8f0; padding:12px; border-radius:8px; margin-top:4px; font-weight:600; color:#0f172a; line-height:1.4;">${currentQuestionText}</div>  
          </div>  
          <div>  
            <span style="font-size:11px; font-weight:700; color:#2563eb; text-transform:uppercase;">Kunci Jawaban (CheatNetwork):</span>  
            <div style="background:#eff6ff; border:1px solid #bfdbfe; padding:14px; border-radius:8px; margin-top:4px; font-size:15px; font-weight:800; color:#1e40af;">  
              🔑 ${finalAnswerKey}  
            </div>  
          </div>  
        `;  

        if (  
          platform === "autoJawab" &&  
          interactiveButtons.length > 0 &&  
          !finalAnswerKey.includes("tidak ditemukan")  
        ) {  
          const matchedTarget = interactiveButtons.find((btn) =>  
            btn.innerText.toLowerCase().includes(finalAnswerKey.toLowerCase()),  
          );  
          if (matchedTarget && !matchedTarget.disabled) {  
            widgetBody.innerHTML += `<div style="text-align:center; color:#16a34a; font-weight:700; margin-top:12px; font-size:13px;">🤖 Auto Clicker Sedang Menjawab...</div>`;  
            matchedTarget.click();  
          }  
        }  
      } else {  
        widgetBody.innerHTML = `  
          <div style="text-align:center; padding-top:60px; color:#94a3b8;">  
            <div style="font-size:32px; margin-bottom:10px;">📡</div>  
            <p style="font-weight:700; margin:0; color:#475569;">Mencari Sesi Pertanyaan...</p>  
            <p style="font-size:12px; margin-top:4px; padding:0 20px;">Silakan tunggu sampai soal muncul di layar untuk mencocokkan kunci.</p>  
          </div>  
        `;  
      }  
    }, 1000);
  }

  launchFloatingWidget(appConfig.pin, appConfig.platform);
})();
