const input = document.getElementById('input');
const terminal = document.getElementById('terminal');

const commands = {
  help: [
    "Available commands:",
    "about       - Short summary",
    "exp         - Work history",
    "skill       - Tech stack",
    "edu         - Education",
    "cert        - Certifications",
    "contact     - How to reach me",
    "clear       - Clear screen"
  ],
  about: [
    "Experienced QA Engineer skilled in Web, API, DB, and Cloud testing,",
    "with a good understanding of automation tools.",
    "Clear communicator who works effectively in international teams."
  ],
  exp: [
    "- GlobalLogic - Associate Test Engineer, Quality Assurance:",
    "   Healthcare/MedTech, SaMD - One of the world's largest medical equipment manufacturers.",
    "   Desktop applications, embedded medical systems and devices, Cloud services.",
    "- AB Soft - Manual QA Engineer:",
    "   Telecom, E-commerce - International enterprise cloud-based IP telephony (VoIP) providers.",
    "   Websites, mobile, desktop and web applications."
  ],
  skill: [
    "- Postman, BurpSuite - RESTful API testing.",
    "- SQL - data manipulation, data types definition, database design, backup, creating triggers,",
    "  views, stored procedures. Familiar with SQL functions, operators, constraints and keys (MySQL,",
    "  Oracle SQL Developer).",
    "- NoSQL - MongoDB.",
    "- Linux - CLI, logs analysis.",
    "- Cloud & integrations - AWS (Lambda, S3, CloudWatch), Kafka (Producers, Consumers, Topics).",
    "- Android SDK - basic adb commands, Android Studio emulators.",
    "- Programming languages - Python - primary for automation, Ruby, basic JavaScript.",
    "- Test Automation - Pytest, Playwright, Robot, RSpec, Watir - able to maintain and extend existing",
    "  frameworks with functional and regression scripts.",
    "- Version control & CI/CD - Git, GitHub, GitLab; familiar with triggers, pipelines, builds.",
    "- Project/defect management - Jira."
],
  edu: [
    "Odesa State Academy of Civil Engineering and Architecture: B.Sc. Construction (2014)",
    "Saint George Theological University: Philosophy, Theology, Exegesis, Hermeneutics (2017)"
  ],
  cert: [
    '<span>Hillel IT School - </span><a href="https://certificate.ithillel.ua/view/66226705" target="_blank">>> QA Manual (2021) <<</a>',
    '<span>Hillel IT School - </span><a href="https://certificate.ithillel.ua/view/47096727" target="_blank">>> QA Automation Python (2023) <<</a>',
    '<span>W3Schools - </span><a href="https://verify.w3schools.com/1P1MHB80Z7" target="_blank">>> SQL Developer (2024) <<</a>'
  ],
  contact: [
    '<span>Email: </span><a href="mailto:artemios.od@gmail.com" target="_blank">artemios.od@gmail.com</a>',
    '<span>LinkedIn: </span><a href="https://linkedin.com/in/artem-purtoian" target="_blank">Artem Purtoian</a>',
    '<span>GitHub: </span><a href="https://github.com/ArtemPurtoian?tab=repositories" target="_blank">ArtemPurtoian</a>'
  ],
};

input.addEventListener('keydown', handleInputKeydown);

function handleInputKeydown(event) {
  if (event.key === 'Enter') {
	  const command = event.target.value.trim();
	if (command) {
	  addLine(`[artem@cv]$ ${command}`);
	  runCommand(command);
	  event.target.value = '';
	  scrollToBottom();
	}
  }
}

function runCommand(cmd) {
  if (cmd === 'clear') {
    resetTerminal();
  } else if (commands[cmd]) {
    commands[cmd].forEach(line => addLine(line));
  } else {
    addLine(`Command not found: ${cmd}`);
  }
}

function addLine(text) {
  const div = document.createElement('div');
  div.className = 'output';
  div.innerHTML = text;
  terminal.insertBefore(div, terminal.querySelector('.line'));
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}
	
function resetTerminal() {
  terminal.innerHTML = `
	<div class="output">Command line CV: Artem Purtoian</div>
	<div class="output">Type <code>help</code> to list commands.</div>
	<div class="line">
	  <span class="prompt">[artem@cv]$&nbsp;</span>
	  <input type="text" class="input" autofocus id="input">
	</div>
  `;

  const newInput = document.getElementById('input');
  newInput.addEventListener('keydown', handleInputKeydown);
  newInput.focus();
  input = newInput;
}