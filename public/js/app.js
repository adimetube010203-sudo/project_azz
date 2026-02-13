const API = "/api/students";

const table = document.getElementById("studentsTable");

if (table) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            data.forEach(student => {
                table.innerHTML += `
          <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>
              <a href="edit.html?id=${student._id}">Edit</a>
              <button onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
          </tr>
        `;
            });
        });
}

function deleteStudent(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => location.reload());
}

const form = document.getElementById("studentForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value
    };

    const response = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });

    const message = document.getElementById("message");

    if (response.ok) {
      message.innerText = "✅ Student added successfully!";
      form.reset();
    } else {
      const error = await response.json();
      message.innerText = "❌ " + error.message;
    }
  });
}


const editForm = document.getElementById("editForm");

if (editForm) {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // جلب بيانات الطالب الحالية
  fetch(`/api/students`)
    .then(res => res.json())
    .then(data => {
      const student = data.find(s => s._id === id);
      if (student) {
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("age").value = student.age;
      }
    });

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value
    };

    const response = await fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent)
    });

    const message = document.getElementById("message");

    if (response.ok) {
      message.innerText = "✅ Student updated successfully!";
    } else {
      message.innerText = "❌ Update failed.";
    }
  });
}
