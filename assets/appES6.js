// Course Class
class Course {
    constructor(title, instrcutor, image){
        this.courseID = Math.floor(Math.random()*100000);
        this.title = title;
        this.instrcutor = instrcutor;
        this.image = image;
    }
}

// UI Class
class UI {
    addCourseToList(course) {
        const courseList = document.getElementById("course-list");

        var html = `
        <tr>
          <td><img class="img-fluid" width="150" src="assets/images/${course.image}"></td>
          <td>${course.title}</td>
          <td>${course.instrcutor}</td>
          <td><a href="#" data-id="${course.courseID}" class="btn btn-sm btn-danger delete">Delete</a></td>
        </tr>
        `
        courseList.innerHTML += html;
    }

    clearControl() {
        let title = document.getElementById("title").value = "";
        let instrcutor = document.getElementById("instrcutor").value = "";
        let image = document.getElementById("image").value = "";
    }

    deleteCourse(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }
    }

    showAlert(message, className) {
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
}

// Local Stroge Class
class Stroge {

    static getCourses() {
        let courses;
        
        if(localStorage.getItem('courses') === null) {
            courses=[];
        }else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }

        return courses;
    }
    
    static displayCourse() {
        const courses = Stroge.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static addCourse(course) {
        const courses = Stroge.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static deleteCourse(element) {
        if(element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');
            
            const courses = Stroge.getCourses();

            courses.forEach((course, index) => {

                if(course.courseID == id) {
                    courses.splice(index,1);
                }

            });

            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }

}

document.addEventListener('DOMContentLoaded', Stroge.displayCourse);

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

         // Save to Local Stroge
         Stroge.addCourse(course);

        // Clear control
        ui.clearControl();

    }

    e.preventDefault();
})

document.getElementById("course-list").addEventListener('click', function(e) {
    const ui = new UI();

    // delete course
    if(ui.deleteCourse(e.target) === true) {
        // Delete from Local Stroge
        Stroge.deleteCourse(e.target);

        ui.showAlert("The course has deleted.", "danger");
    };
});

