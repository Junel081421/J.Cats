// CV text
const cvText = `
Name: Junel Cataquiz
Title: Virtual Assistant | Data Entry | Appointment Setter

Contact:
Email: jhunellecataquiz@gmail.com
Phone: +63 950 269 4799
Website:

Skills:
Fast & Accurate Typing (40+ WPM)
Database Management & Record Keeping
Canva Editing (Creative, Photo, Video)
Scheduling & Calendar Management
Professional Email & Follow-up Communication
Client Coordination & Relationship Building
Microsoft Office Suite (Excel, Word, Outlook)
System Installation & Configuration
Preventive & Corrective Maintenance
Root Cause Analysis (RCA)
Documentation & Reporting

`;

// Parse CV
function parseCV(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(l => l);
  const data = { skills: [] };
  let section = "";
  lines.forEach(line => {
    if (line.startsWith("Name:")) data.name = line.replace("Name:", "").trim();
    else if (line.startsWith("Title:")) data.title = line.replace("Title:", "").trim();
    else if (line.startsWith("Email:")) data.email = line.replace("Email:", "").trim();
    else if (line.startsWith("Phone:")) data.phone = line.replace("Phone:", "").trim();
    else if (line.startsWith("Website:")) data.website = line.replace("Website:", "").trim();
    else if (line.startsWith("Skills:")) section = "skills";
    else if (section === "skills") data.skills.push(line);
  });
  return data;
}

const cvData = parseCV(cvText);

// Populate header + contact
document.getElementById("name").textContent = cvData.name;
document.getElementById("title").textContent = cvData.title;
document.getElementById("email").innerHTML = 
  `<a href="mailto:${cvData.email}" class="underline">${cvData.email}</a>`;
document.getElementById("phone").textContent = cvData.phone;
document.getElementById("website").textContent = cvData.website || "N/A";

// Skill descriptions
const skillDescriptions = {
  "Fast & Accurate Typing (40+ WPM)": "Efficient typing with high accuracy for data entry tasks.",
  "Database Management & Record Keeping": "Organizing, updating, and maintaining records with precision.",
  "Canva Editing (Creative, Photo, Video)": "Designing visually appealing graphics and videos using Canva.",
  "Scheduling & Calendar Management": "Coordinating meetings and appointments to keep teams on track.",
  "Professional Email & Follow-up Communication": "Crafting clear, professional emails and timely follow-ups.",
  "Client Coordination & Relationship Building": "Maintaining strong communication and rapport with clients.",
  "Microsoft Office Suite (Excel, Word, Outlook)": "Proficient in creating reports, documents, and managing communications.",
  "System Installation & Configuration": "Setting up and configuring systems for optimal performance.",
  "Preventive & Corrective Maintenance": "Ensuring systems run reliably through proactive and reactive maintenance.",
  "Root Cause Analysis (RCA)": "Identifying underlying issues to prevent recurrence.",
  "Documentation & Reporting": "Maintaining clear records and reports for technical and administrative processes."
};

// Skills with progress bars + dropdown description
const skillsList = document.getElementById("skillsList");
cvData.skills.forEach(skill => {
  const skillDiv = document.createElement("div");
  skillDiv.className = "skill border p-3 rounded cursor-pointer";

  skillDiv.innerHTML = `
    <p class="font-semibold">${skill}</p>
    <div class="w-full bg-gray-300 dark:bg-gray-700 rounded h-2 mb-2">
      <div class="progress-bar bg-blue-600 h-2 rounded"></div>
    </div>
    <div class="skill-desc text-sm text-gray-600 dark:text-gray-300 hidden">
      ${skillDescriptions[skill] || "No description available."}
    </div>
  `;

  const desc = skillDiv.querySelector(".skill-desc");
  skillDiv.addEventListener("click", () => {
    desc.classList.toggle("hidden");
  });

  skillsList.appendChild(skillDiv);
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".progress-bar").forEach(bar => {
        bar.style.width = Math.floor(Math.random() * 50 + 50) + "%";
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-slide").forEach(el => observer.observe(el));

// Smooth scroll with offset
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    const offset = 55; // adjust if navbar height changes
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Dark/Light mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleMode");
  const toggleIcon = document.getElementById("toggleIcon");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      toggleIcon.textContent = "🌙"; // dark mode → crescent moon
    } else {
      toggleIcon.textContent = "☀️"; // light mode → sun
    }
  });
});
