# HADASIM PROJECT

# Project Description

This system is designed to assist teachers of "Bnot Moshe" school in managing and supervising students during the annual school trip.

The system is built using a full-stack architecture:
- **Database**: PostgreSQL (managed via pgAdmin)
- **Backend**: Node.js with NestJS
- **Frontend**: React
- **Language**: TypeScript
- **Development Environment**: VS Code
- **Map Integration**: Leaflet

## Features

### Student
- Register and log in to the system
- View personal details only

### Teacher
- View a list of all students and teachers
- View students by class
- Access details of a specific student or teacher
- Monitor students' locations in real time on a map
- Receive alerts when a student is more than 3 km away
- Visual indication: distant students are marked in red on the map

## Purpose

The system improves organization, safety, and real-time monitoring during school trips, allowing teachers to efficiently track and manage their students.

## Installation

To install the system, download the code to your computer (recommended IDE: VS Code).
Make sure you have the following installed:
PostgreSQL, pgAdmin, Node.js, NestJS, React, and Leaflet.

To configure the database, create a `.env` file based on the `.env.example` file:

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
PORT=3000

Fill in the required values in the `.env` file.
Then run the following commands in the terminal:

npm install

After that, open two terminals — one for the backend and one for the frontend.

In the backend terminal, run:

npm run start

In the frontend terminal, run:

npm run dev

Then, use pgAdmin to insert some records into the database tables.
Finally, open your browser and go to:
http://localhost:5173

## User Instructions

When you open the website, you will see the login page.


<img width="1392" height="1217" alt="loginImg" src="https://github.com/user-attachments/assets/def006a1-7470-4e66-bcb8-3ca54266f0da" />


Enter a student ID and click the button.


<img width="1387" height="1134" alt="studentImg" src="https://github.com/user-attachments/assets/7b9dd847-b9ac-43eb-9e39-1e7a7f1c6bf1" />


Click the "חזרה" button to return to the login page.

Now enter a teacher ID. You will see all the teacher options.


<img width="2322" height="1377" alt="teacherImg1" src="https://github.com/user-attachments/assets/4385d116-7475-4fcc-a884-ff3518a2c9ce" />


<img width="2076" height="1334" alt="teacherImg2" src="https://github.com/user-attachments/assets/76ae6389-2460-48c2-8a40-d37b8165d405" />


Try clicking the buttons to view the teacher’s students, a list of students/teachers, or perform a search.


<img width="1955" height="847" alt="teacher&#39;sStudentsImg" src="https://github.com/user-attachments/assets/a06bca32-5ded-4fd5-abf5-c1b1e60283ea" />


<img width="2057" height="1228" alt="allStudentsImg" src="https://github.com/user-attachments/assets/291e225b-55c2-4a11-9c96-924974fad3a9" />


Then click the button that displays the map.


<img width="3194" height="1282" alt="mapBeforeImg" src="https://github.com/user-attachments/assets/7c587f75-83f3-424c-8ff2-0a0f21521267" />


## Bonus Feature

before you cheke this part:

## Development Note – Map Refresh Rate

The original requirement specifies that the map should update every minute.

However, in order to easily test the real-time behavior during development, the refresh interval can be temporarily reduced.

To do this, navigate to:

`frontend/src/pages/MapPage.tsx`

Inside the `useEffect` function, locate the following line:

const interval = setInterval(getLocations, 60000);

And replace it with:

const interval = setInterval(getLocations, 5000);

This change will make the map update every 5 seconds instead of every minute, allowing faster testing of location updates and alerts.

Now you can start!

Click the button to change students' locations and observe the markers move on the map.

### Before:

<img width="3194" height="1282" alt="mapBeforeImg" src="https://github.com/user-attachments/assets/7c587f75-83f3-424c-8ff2-0a0f21521267" />

### After:

<img width="2334" height="949" alt="locationsAfter" src="https://github.com/user-attachments/assets/ff6fe285-1ce2-48ec-830b-eff812dac4f0" />


Then click the button to move a student to a distant location.
You will receive an alert, and the student's marker will turn red.

### Before:

<img width="2334" height="949" alt="locationsAfter" src="https://github.com/user-attachments/assets/ff6fe285-1ce2-48ec-830b-eff812dac4f0" />

### After:

<img width="847" height="704" alt="farStudentIcon" src="https://github.com/user-attachments/assets/1b44fdb8-99bf-414e-8422-5e337f3fb2ca" />

<img width="1545" height="714" alt="farStudentImg" src="https://github.com/user-attachments/assets/e98cef4e-d736-4ddf-87df-54f1fa3ed2f3" />


## Note about the bonus: 
1. The system randomly selects a student and a location. In some cases, it may appear that nothing has changed because the same location was selected.  

2. Two students may share the same location, causing one marker to be hidden behind another. This will not happen in a real-world scenario.

3. When a distant student returns to a closer range, the marker color changes back.
   
4. Sometimes you'll have to zoom out in order to see students who moved too far.

5. It is possible that two icons will appear in exactly the same location, where one is red and the other is not. This is because each student is checked based only on their distance from their own teacher.

## Notes

- According to the instructions, I assumed that it is not necessary to display teachers' locations, but rather to assume they are located at a fixed point.

- Although I usually write applications in English, this system is intended for a school trip in Jerusalem, so I assumed the interface should be adapted for Hebrew-speaking users.



