def pass_calculator(marks):
    # Define grade thresholds
    grade_thresholds = {
        'O': 91.00,
        'A+': 81.00,
        'A': 71.00,
        'B+': 61.00,
        'B': 56.00,
        'C': 50.00
    }
    
    # Check if already passed
    if marks >= 50:
        result = {"message": "Chillout you have already passed! Enjoy :)", "passed": True}
        
        # Calculate marks needed for each grade
        grade_marks_needed = {}
        for grade, threshold in grade_thresholds.items():
            marks_needed = (threshold - marks) * 1.875
            # Only include grades where additional marks are needed
            if marks_needed > 0:
                grade_marks_needed[grade] = round(marks_needed, 2)
        
        result["grade_marks"] = grade_marks_needed
        return result
    else:
        diff = 50 - marks
        pass_marks = 1.875 * diff
        
        # Calculate marks needed for each grade
        grade_marks_needed = {}
        for grade, threshold in grade_thresholds.items():
            marks_needed = (threshold - marks) * 1.875
            grade_marks_needed[grade] = round(marks_needed, 2)
        
        return {"pass_marks": round(pass_marks, 2), "passed": False, "grade_marks": grade_marks_needed}
    
for i,j in pass_calculator(34).items():
    if i == "grade_marks":
        for l,k in j.items():
            print(f"{l}:{k}")
        