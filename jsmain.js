// Object to store meetings
const meetings = {}; // Format: { "2026-01-11": [ {name, time, type} ] }

// References to DOM
const calendarContainer = document.getElementById("calendar");
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

// Generate full year calendar (Dec 2025 → Dec 2026)
function generateYearCalendar() {
  const months = [
    "December 2025","January 2026","February 2026","March 2026",
    "April 2026","May 2026","June 2026","July 2026",
    "August 2026","September 2026","October 2026","November 2026","December 2026"
  ];

  months.forEach((monthName, idx) => {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    const monthTitle = document.createElement("h3");
    monthTitle.textContent = monthName;
    monthDiv.appendChild(monthTitle);

    const monthGrid = document.createElement("div");
    monthGrid.className = "month-grid";

    const year = idx === 0 ? 2025 : 2026;
    const monthNum = idx === 0 ? 11 : idx - 1; // December 2025 = 11, Jan 2026 = 0

    const daysInMonth = new Date(year, monthNum + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement("div");
      const dateStr = `${year}-${String(monthNum+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      dayDiv.className = "day";
      dayDiv.id = `day-${dateStr}`;
      dayDiv.textContent = day;
      dayDiv.addEventListener("click", () => openModal(dateStr));
      monthGrid.appendChild(dayDiv);
    }

    monthDiv.appendChild(monthGrid);
    calendarContainer.appendChild(monthDiv);
  });
}

// Open modal for a date
let currentDate;
function openModal(dateStr) {
  currentDate = dateStr;
  modal.classList.remove("hidden");
  modalDate.textContent = `Meetings on ${dateStr}`;
  updateMeetingList();
}

// Update modal list
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

// Add meeting to a date
addMeetingBtn.addEventListener("click", () => {
  const selected = meetingOptions.find(m => m.name === meetingSelect.value);
  if (!meetings[currentDate]) meetings[currentDate] = [];
  meetings[currentDate].push(selected);
  updateMeetingList();
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Update day color based on number of meetings
function updateDateColor(date) {
  const count = meetings[date]?.length || 0;
  const dayDiv = document.getElementById(`day-${date}`);
  let color = "#fff";
  switch(count) {
    case 1: color = "red"; break;
    case 2: color = "blue"; break;
    case 3: color = "green"; break;
    default: if(count >= 4) color="yellow"; break;
  }
  dayDiv.style.backgroundColor = color;
}

generateYearCalendar();
