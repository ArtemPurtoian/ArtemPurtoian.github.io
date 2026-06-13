// DOM Element References
const input = document.getElementById('input');
const terminal = document.getElementById('terminal');
const inputLine = document.getElementById('input-line');
const historyContainer = document.getElementById('history');

// Helper function to create a delay (in milliseconds) using Promises
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates a terminal boot sequence with an animated ellipsis
 */
async function runBootSequence() {
  // Создаем элемент для текста загрузки
  const loaderDiv = document.createElement('div');
  loaderDiv.className = 'output';
  loaderDiv.textContent = 'Entering command line';
  historyContainer.appendChild(loaderDiv);

  // Append 3 dots sequentially with a 300ms delay between each
  for (let i = 0; i < 3; i++) {
    await delay(300);
    loaderDiv.textContent += '.';
  }

  // Short pause after the final dot for a smoother visual transition
  await delay(300);

  // Render the initial welcome messages
  addLine("Welcome to my interactive CV!");
  addLine('Type <code>help</code> to see a list of commands and learn more about me😊');

  // Reveal the command line prompt and transfer focus to the input field
  inputLine.style.display = 'flex';
  input.focus();
}

// Initialize the boot sequence immediately upon script load
runBootSequence();

// Command history tracking
const commandHistory = [];
let historyIndex = -1;

// Command registry containing data arrays for terminal output
const commands = {
  help: [
    "Available commands:",
    "info        - Short summary",
    "exp         - Work history",
    "skills      - Tech stack",
    "edu         - Education",
    "cert        - Certifications",
    "contact     - Contact me",
    "clear       - Clear terminal"
  ],
  info: [
    "QA Engineer with overall <b>5 years</b> of experience in the following domains:",
    "<li>E-commerce</li>",
    "<li>Telecom</li>",
    "<li>Healthcare/MedTech</li>",
    "With solid knowledge of QA and test automation processes.",
    "Confident in evaluating AI LLM outputs."
  ],
  exp: [
    "<b>GlobalLogic</b> — Test Engineer, QA — Healthcare / MedTech:",
    "Embedded / Desktop / Cloud – US largest medical equipment manufacturer",
    "<li>analyzing software requirements and design specifications, implementing traceability matrixes</li>",
    "<li>collaborating with BAs to translate regulatory requirements into testable technical specifications</li>",
    "<li>creating, reviewing and approving test documentation; reporting defects and verifying fixes</li>",
    "<li>performing code inspections, functional, API, integration, and regression testing</li>",
    "<li>implementing environment maintenance scripts, API and DB test automation with Python</li>",
    "<li>BLE embedded devices setup and testing, sniffing traffic packets",
    "<b>Achievements:</b>",
    "<li>reduced regression time by <b>70%</b>, implementing a Risk-based approach for regulated medical devices</li>",
    "<br>",
    "<b>AB Soft</b> — Manual QA Engineer — Telecom / E-commerce:",
    "Web / Mobile / Desktop – world leader in enterprise cloud VoIP solutions",
    "<li>performed static analysis, functional, UI, API, integration, and regression testing</li>",
    "<li>performed Defect Escape Analysis and post-release verifications</li>",
    "<li>validated integrations between web, desktop, and SIP devices</li>",
    "<li>analyzed Kibana and Linux server logs</li>",
    "<b>Achievements:</b>",
    "<li>developed a unified Postman collection for a team of <b>30+ engineers</b>, accelerating API testing for 3 core products;</li>",
    "<li>redesigned <b>2000+ test cases</b></li>"
  ],
  skills: [
    "<li><b>Testing:</b> Static, Code Inspections, Functional, Integration, Risk-based, Regression</li>",
    "<li><b>API:</b> Web – REST, GraphQL, Websockets; Embedded – BLE</li>",
    "<li><b>Healthcare compliance standards:</b> HIPAA, familiar with FHIR, HL7</li>",
    "<li><b>Databases:</b> Relational (MySQL, Oracle SQL Developer); NoSQL (MongoDB)</li>",
    "<li><b>SQL:</b> data manipulation and definition, DB design and backup</li>",
    "<li><b>Cloud & Integrations:</b> AWS (Lambda, S3, CloudWatch), Kafka</li>",
    "<li><b>Mobile testing:</b> ADB, Android Studio emulators, iOS real devices</li>",
    "<li><b>Programming languages:</b> Python</li>",
    "<li><b>Test Automation:</b> Pytest, Playwright, Robot</li>",
    "<li><b>AI LLMs:</b> confident in validating outputs for business needs (Gemini, ChatGPT)</li>",
    "<li><b>Version control & CI:</b> Git, TeamCity</li>"
  ],
  edu: [
    "<li>Odesa State Academy of Civil Engineering and Architecture: B.Sc. Construction (2014)</li>",
    "<li>Saint George Theological University: Philosophy, Theology, Exegesis, Hermeneutics (2017)</li>"
  ],
  cert: [
    '<li><a href="https://certificate.ithillel.ua/view/66226705" target="_blank">>> QA Manual (2021) <<</a><span> Hillel IT School</span></li>',
    '<li><a href="https://certificate.ithillel.ua/view/47096727" target="_blank">>> QA Automation Python (2023) <<</a><span> Hillel IT School</span></li>',
    '<li><a href="https://verify.w3schools.com/1P1MHB80Z7" target="_blank">>> SQL Developer (2024) <<</a><span> W3Schools</span></li>'
  ],
  contact: [
    '<li><span>Email: </span><a href="mailto:artemios.od@gmail.com" target="_blank">artemios.od@gmail.com</a></li>',
    '<li><span>LinkedIn: </span><a href="https://linkedin.com/in/artem-purtoian" target="_blank">Artem Purtoian</a></li>',
    '<li><span>GitHub: </span><a href="https://github.com/ArtemPurtoian?tab=repositories" target="_blank">ArtemPurtoian</a></li>'
  ],
};

// Global click event to restore focus to the input field whenever the terminal area is clicked
terminal.addEventListener('click', () => input.focus());

// Keydown event listener handling input submission and history navigation
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const rawInput = event.target.value;
    const command = rawInput.trim().toLowerCase();

    if (rawInput.trim()) {
      // Echo the executed command back to the terminal layout, preserving original case
      addLine(`[artem.purtoian@cv]$ ${rawInput}`, 'prompt-echo');

      // Append the command to tracking arrays and reset the history traversal pointer
      commandHistory.push(rawInput.trim());
      historyIndex = commandHistory.length;

      runCommand(command);
    }

    // Reset input state and enforce bottom alignment scrolling
    event.target.value = '';
    scrollToBottom();
  }
  // Navigate history backwards (Arrow Up)
  else if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      event.target.value = commandHistory[historyIndex];
    }
  }
  // Navigate history forwards (Arrow Down)
  else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      event.target.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      event.target.value = ''; // Reset to blank input if passing the latest entry
    }
  }
});

// Router evaluating and rendering command outputs
function runCommand(cmd) {
  if (cmd === 'clear') {
    historyContainer.innerHTML = '';
  } else if (commands[cmd]) {
    commands[cmd].forEach(line => addLine(line));
  } else {
    addLine(`${cmd} - command not found. Type <code>help</code> for available commands.`);
  }
}

// Appends a new text element into the historical container block
function addLine(text, customClass = '') {
  const div = document.createElement('div');
  div.className = `output ${customClass}`;
  div.innerHTML = text;
  historyContainer.appendChild(div);
}

// Forces the terminal scrolling wrapper layout down to the absolute bottom line
function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}