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
            if (data.passed) {
                showResult(data.message);
            } else {
                showResult(`You need <span class="highlight">${data.pass_marks}</span> marks more to pass the exam.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showResult('An error occurred. Please try again.');
        });
    }
    
    function showResult(message) {
        resultContainer.innerHTML = `<div class="result-message">${message}</div>`;
        resultContainer.classList.add('active');
    }
});