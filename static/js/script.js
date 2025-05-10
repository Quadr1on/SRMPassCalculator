document.addEventListener('DOMContentLoaded', function() {
    const marksInput = document.getElementById('marks');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    
    calculateBtn.addEventListener('click', calculatePassMarks);
    
    // Also allow pressing Enter to submit
    marksInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculatePassMarks();
        }
    });
    
    function calculatePassMarks() {
        const marks = parseFloat(marksInput.value);
        
        // Input validation
        if (isNaN(marks) || marks < 0 || marks > 60) {
            showResult('Please enter a valid mark between 0 and 60.');
            return;
        }
        
        // Make API call to calculate pass marks
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ marks: marks })
        })
        .then(response => response.json())
        .then(data => {
            let resultMessage = '';
            
            if (data.passed) {
                resultMessage = `<div class="result-message">${data.message}</div>`;
            } else {
                if(data.pass_marks > 70){
                    resultMessage = '<div class="result-message">Can\'t pass now-aim higher next time!</div>';
                } else {
                    resultMessage = `<div class="result-message">You need <span class="highlight">${data.pass_marks}</span> marks more in end sem to pass this subject.</div>`;
                }
            }
            
            // Add grade table if there are grades to achieve and pass marks isn't greater than 70
            if (data.grade_marks && (!data.pass_marks || data.pass_marks <= 70)) {
                resultMessage += createGradeTable(data.grade_marks);
            }
            
            resultContainer.innerHTML = resultMessage;
            resultContainer.classList.add('active');
        })
        .catch(error => {
            console.error('Error:', error);
            showResult('An error occurred. Please try again.');
        });
    }
    
    function createGradeTable(gradeMarks) {
        // Create table HTML
        let tableHtml = `
        <div class="grade-table-container">
            <h3 class="grade-table-title">Marks needed for higher grades*:</h3>
            <table class="grade-table">
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Min Marks Needed</th>
                    </tr>
                </thead>
                <tbody>`;
        
        // Define the correct grade order
        const gradeOrder = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        
        // Add rows for each grade in the correct order
        gradeOrder.forEach(grade => {
            if (grade in gradeMarks) {
                const marks = gradeMarks[grade];
                // Show "N/A" or similar for very high marks requirements
                const displayMarks = marks > 70 ? "Not possible" : marks;
                
                tableHtml += `
                <tr>
                    <td>${grade}</td>
                    <td>${displayMarks}</td>
                </tr>`;
            }
        });
        
        tableHtml += `
                </tbody>
            </table>
            <span class="condition">*These marks are only assumed estimates, so please don't rely on them completely. <b>Not possible</b> means calculated marks for that grade<b> > 75</b> i.e highest marks possible for that exam</span>
            
        </div>`;
        
        return tableHtml;
    }
    
    function showResult(message) {
        resultContainer.innerHTML = `<div class="result-message">${message}</div>`;
        resultContainer.classList.add('active');
    }
});