const meetings = {}; // { "2026-01-11": [ {name, time, type} ] }

const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modal-date");
const meetingDayList = document.getElementById("meeting-day-list");
const meetingSelect = document.getElementById("meeting-select");
const addMeetingBtn = document.getElementById("add-meeting");
const closeBtn = document.getElementById("close");

// Sample meeting options
const meetingOptions = [
  { name: "Team Sync", time: "12:00 PM", type: "online" },
  { name: "Project Meeting", time: "3:00 PM", type: "in-person" },
  { name: "Client Call", time: "5:30 PM", type: "online" }
];

// Populate dropdown
meetingOptions.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.name;
  opt.textContent = `${m.name} (${m.type} at ${m.time})`;
  meetingSelect.appendChild(opt);
});

// Generate calendar for Dec 2025 → Dec 2026
function generateCalendar() {
  const start = new Date(2025, 11, 1); // Dec 2025
  const end = new Date(2026, 11, 31);  // Dec 2026
  let current = new Date(start);

  while (current <= end) {
    const day = document.createElement("div");
    const dateStr = current.toISOString().split("T")[0];
    day.className = "day";
    day.id = `day-${dateStr}`;
    day.textContent = current.getDate();
    day.addEventListener("click", () => openModal(dateStr));
    calendar.appendChild(day);
    current.setDate(current.getDate() + 1);
  }
}

// Open modal for a date
let currentDate;
function openModal(dateStr) {
  currentDate = dateStr;
  modal.classList.remove("hidden");
  modalDate.textContent = `Meetings on ${dateStr}`;
  updateMeetingList();
}

// Update list in modal
function updateMeetingList() {
  meetingDayList.innerHTML = "";
  const dayMeetings = meetings[currentDate] || [];
  dayMeetings.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.name} (${m.type} at ${m.time})`;
    meetingDayList.appendChild(li);
  });
  updateDateColor(currentDate);
}

// Add meeting
addMeetingBtn.addEventListener("click", () => {
  const selected = meetingOptions.find(m => m.name === meetingSelect.value);
  if (!meetings[currentDate]) meetings[currentDate] = [];
  meetings[currentDate].push(selected);
  updateMeetingList();
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Update calendar date color
function updateDateColor(date) {
  const count = meetings[date]?.length || 0;
  const dayDiv = document.getElementById(`day-${date}`);
  let color = "white";
  switch(count) {
    case 1: color = "red"; break;
    case 2: color = "blue"; break;
    case 3: color = "green"; break;
    default: if(count >= 4) color="yellow"; break;
  }
  dayDiv.style.backgroundColor = color;
}

generateCalendar();