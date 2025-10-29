# TODO: Implement Date Picker with Disabled TUT Important Dates

## Overview
Modify the CreateEvent.jsx form to use react-datepicker that disables important TUT dates (public holidays, recess periods, examination periods) to prevent event date clashes.

## Steps
- [x] Define disabled dates and ranges based on TUT 2025 Academic Calendar
- [x] Import DatePicker component and CSS from react-datepicker
- [x] Create isDateDisabled function to check if a date should be disabled
- [x] Replace dateOfCommencement input with DatePicker component
- [x] Replace endingDate input with DatePicker component (with minDate validation)
- [x] Test the date picker functionality to ensure dates are properly disabled
