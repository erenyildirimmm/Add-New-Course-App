// Course Constructor
function Course(title, instrcutor, image) {
    this.title = title;
    this.instrcutor = instrcutor;
    this.image = image;
}

// UI Constructor
function UI(){ };

UI.prototype.addCourseToList = function(course) {
    const courseList = document.getElementById("course-list");

    var html = `
    <tr>
      <td><img class="" src="images/${course.image}"></td>
      <td>${course.title}</td>
      <td>${course.instrcutor}</td>
      <td><a href="#" class="btn btn-sm btn-danger delete">Delete</a></td>
    </tr>
    `
    courseList.innerHTML += html;
}

UI.prototype.clearControl = function() {
    let title = document.getElementById("title").value = "";
    let instrcutor = document.getElementById("instrcutor").value = "";
    let image = document.getElementById("image").value = "";
}

UI.prototype.deleteCourse = function(element) {
    if(element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message, className) {
    var alert = `
    <div class="alert alert-${className}">
        ${message}
    </div>
    `;
    const row = document.querySelector(".row");

    row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    },3000);
}


document.querySelector(".new-course").addEventListener("submit", function(e) {
    let title = document.getElementById("title").value;
    let instrcutor = document.getElementById("instrcutor").value;
    let image = document.getElementById("image").value;

    let ui = new UI();

    // Create course object
    const course = new Course(title, instrcutor, image);

    if(title==="" || instrcutor==="" || image==="") {
        ui.showAlert("Please complete the form.", "warning");
    }else {
         // Add course to list
         ui.addCourseToList(course);
         ui.showAlert("The course has been added.", "success");

        // Clear control
        ui.clearControl();
    }

    e.preventDefault();
})

document.getElementById("course-list").addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert("Kurs silindi.", "danger");
});