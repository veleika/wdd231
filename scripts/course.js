const courses = [
  { code: "CSE 110", credits: 2, completed: false },
  { code: "WDD 130", credits: 2, completed: false },
  { code: "CSE 111", credits: 2, completed: false },
  { code: "CSE 210", credits: 2, completed: false },
  { code: "WDD 131", credits: 2, completed: false },
  { code: "WDD 231", credits: 2, completed: false }
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(filter = "all") {
  if (!courseList || !creditTotal) {
    return;
  }

  const filteredCourses = courses.filter(course => {
    return filter === "all" || course.code.startsWith(`${filter} `);
  });

  courseList.replaceChildren();

  filteredCourses.forEach(course => {
    const card = document.createElement("article");
    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
    }

    const heading = document.createElement("h3");
    heading.textContent = course.code;

    const credits = document.createElement("p");
    credits.textContent =
      `${course.credits} ${course.credits === 1 ? "credit" : "credits"}`;

    const status = document.createElement("p");
    status.classList.add("course-status");
    status.textContent = course.completed ? "✓ Completed" : "Not completed";

    card.append(heading, credits, status);
    courseList.appendChild(card);
  });

  const totalCredits = filteredCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  creditTotal.textContent =
    `${filteredCourses.length} courses | ${totalCredits} credits`;

  filterButtons.forEach(button => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === filter)
    );
  });

  if (filteredCourses.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No courses match this selection.";
    courseList.appendChild(message);
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayCourses(button.dataset.filter);
  });
});

displayCourses();