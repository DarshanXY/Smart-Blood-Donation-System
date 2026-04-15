let donors = JSON.parse(localStorage.getItem("donors")) || [];

function saveData() {
  localStorage.setItem("donors", JSON.stringify(donors));
}

function addDonor() {
  let name = document.getElementById("name").value;
  let blood = document.getElementById("blood").value;

  if (!name || !blood) {
    alert("Fill all fields");
    return;
  }

  donors.push({ name, blood, status: "Available" });
  saveData();
  displayDonors();
}

function displayDonors(filtered = donors) {
  let list = document.getElementById("donorList");
  list.innerHTML = "";

  filtered.forEach((donor, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${donor.name} - ${donor.blood} (${donor.status})
      <button class="delete-btn" onclick="deleteDonor(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteDonor(index) {
  donors.splice(index, 1);
  saveData();
  displayDonors();
}

function requestBlood() {
  let blood = document.getElementById("requestBlood").value;

  let filtered = donors.filter(d => d.blood.toLowerCase() === blood.toLowerCase());

  if (filtered.length === 0) {
    alert("No donors found");
  }

  displayDonors(filtered);
}

displayDonors();