// Immediately Invoked Function Expression (IIFE)
(function(){
    console.log("Inside of the IIFE.");

    // Access HTML elements
    const dataDisplay = document.getElementById('DataDisplay');
    const errorDisplay = document.getElementById('ErrorDisplay');
    const filterCSAgeGreaterThan20Btn = document.getElementById('filterCSAgeGreaterThan20');
    const calculateAverageAgeBtn = document.getElementById('calculateAverageAge');
    const filterOddIndexStudentsBtn = document.getElementById('filterOddIndexStudents');

    // Function to fetch data
    function fetchData() {
        return new Promise((resolve, reject) => {
            fetch('Students.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(students => {
                resolve(students);
            })
            .catch(error => {
                reject(error.message);
            });
        });
    }

    // Button click event for filtering Computer Science students with age > 20
    filterCSAgeGreaterThan20Btn.addEventListener('click', () => {
        fetchData()
        .then(students => {
            const filteredStudents = students.filter(student => student.major === "Computer Science" && student.age > 20);
            displayStudents(filteredStudents);
        })
        .catch(error => {
            displayError(error);
        });
    });

    // Button click event for calculating average age
    calculateAverageAgeBtn.addEventListener('click', () => {
        fetchData()
        .then(students => {
            const totalAge = students.reduce((acc, student) => acc + student.age, 0);
            const averageAge = totalAge / students.length;
            dataDisplay.innerHTML = `Average Age: ${averageAge.toFixed(2)}`;
        })
        .catch(error => {
            displayError(error);
        });
    });

    // Button click event for filtering students with odd index values
    filterOddIndexStudentsBtn.addEventListener('click', () => {
        fetchData()
        .then(students => {
            const filteredStudents = students.filter((student, index) => index % 2 !== 0);
            displayStudents(filteredStudents);
        })
        .catch(error => {
            displayError(error);
        });
    });

    // Function to display students
    function displayStudents(students) {
        dataDisplay.innerHTML = '';
        students.forEach(student => {
            dataDisplay.innerHTML += `Student Name: ${student.name}, Age: ${student.age}, Gender: ${student.gender}, Major: ${student.major}<br>`;
        });
    }

    // Function to display error
    function displayError(error) {
        errorDisplay.innerHTML = `Error: ${error}`;
    }

})();
