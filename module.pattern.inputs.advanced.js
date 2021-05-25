(() => {
  var App = {
    values: {
      studentIndex: 0,
    },
    htmlElements: {
      studentForm: document.getElementById("student_form"),
      studentEditForm: document.getElementById("student_edit"),
      studentsList: document.getElementById("students_list"),
      studentEdit: document.getElementById("student_edit"),
      studentId: document.getElementById("student_id"),
      studentName: document.getElementById("student_name"),
      studentAge: document.getElementById("student_age"),
      studentHobbies: document.getElementById("student_hobbies"),
      studentEditName: document.getElementById("student_edit_name"),
      studentEditAge: document.getElementById("student_edit_age"),
      studentEditHobbies: document.getElementById("student_edit_hobbies"),
      studentEditGoBack: document.getElementById("go_back"),
    },
    init: () => {
      // Bind events
      App.htmlElements.studentForm.addEventListener(
        "submit",
        App.events.studentFormOnSubmit
      );
      App.htmlElements.studentEdit.addEventListener(
        "submit",
        App.events.studentEditFormOnSubmit
      );
      App.htmlElements.studentEditGoBack.addEventListener(
        "click",
        App.events.studentGoBack
      );
    },
    events: {
      studentFormOnSubmit: (event) => {
        event.preventDefault();
        const {
          student_name: studentNameInput,
          student_age: studentAgeInput,
          student_hobbies: studentHobbiesInput,
        } = event.target.elements;
        const studentName = studentNameInput.value;
        const studentAge = studentAgeInput.value;
        const studentHobbies = studentHobbiesInput.value;
        App.utils.addStudentToList({
          tableBody: App.htmlElements.studentsList,
          studentName,
          studentAge,
          studentHobbies,
        });
      },
      studentEditFormOnSubmit: (event) => {
        event.preventDefault();
        const {
          student_id: studentIdInput,
          student_edit_name: studentNameInput,
          student_edit_age: studentAgeInput,
          student_edit_hobbies: studentHobbiesInput,
        } = event.target.elements;

        document.getElementById(studentIdInput.value).children[0].innerHTML =
          studentNameInput.value;
        document.getElementById(studentIdInput.value).children[1].innerHTML =
          studentAgeInput.value;
        document.getElementById(studentIdInput.value).children[2].innerHTML =
          studentHobbiesInput.value;
      },
      studentGoBack: (event) => {
        event.preventDefault();
        App.htmlElements.studentForm.hidden = false;
        App.htmlElements.studentEdit.hidden = true;
        document.getElementById(
          App.htmlElements.studentId.value
        ).children[4].children[0].disabled = false;
        App.htmlElements.studentName.value = "";
        App.htmlElements.studentAge.value = "";
        App.htmlElements.studentHobbies.value = "";
      },
    },
    utils: {
      addStudentToList: ({
        tableBody,
        studentName,
        studentAge,
        studentHobbies,
      }) => {
        const newRow = `<tr id="student_${App.values.studentIndex}">
        <td>${studentName}</td>
        <td>${studentAge}</td>
        <td>${studentHobbies}</td>
        <td>
        <button onclick="updateStudentRow(this)">Actualizar</button>
        </td>
        <td>
        <button onclick="deleteStudentRow(this)">Eliminar</button>
        </td></tr>`;
        tableBody.innerHTML += newRow;
        App.values.studentIndex++;
      },
    },
  };
  App.init();
})();

// No se si esto vale, está afuera del App.
function updateStudentRow(element) {
  document.getElementById("student_form").hidden = true;
  document.getElementById("student_edit").hidden = false;
  Array.from(document.getElementsByTagName("button")).map(
    (i) => (i.disabled = false)
  );
  element.parentElement.parentElement.children[4].children[0].disabled = true;
  document.getElementById("student_id").value =
    element.parentElement.parentElement.id;
  document.getElementById("student_edit_name").value =
    element.parentElement.parentElement.children[0].innerHTML;
  document.getElementById("student_edit_age").value =
    element.parentElement.parentElement.children[1].innerHTML;
  document.getElementById("student_edit_hobbies").value =
    element.parentElement.parentElement.children[2].innerHTML;
}

function deleteStudentRow(element) {
  element.parentElement.parentElement.remove();
}
