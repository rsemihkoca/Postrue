# Postrue: Correcting Body Posture and Data Collection

Postrue is a Python-based application that helps users improve their body posture by providing real-time feedback and warnings about incorrect postures. Additionally, it collects valuable posture data for further analysis, which is stored in a PostgreSQL database.

## Features
- **Real-time Posture Correction**: Postrue utilizes the Mediapipe and OpenCV libraries to detect the user's body posture in real-time. It provides warnings and guidance to help users maintain correct postures.

- **Data Collection**: The application offers three different data retrieval endpoints: `GET /daily/`, `GET /weekly/`, and `GET /monthly/`. Users can access their posture data on a daily, weekly, or monthly basis, allowing them to track their progress over time.

- **Database Storage**: All collected posture data is securely stored in a PostgreSQL database, ensuring that users can review their historical posture information and gain insights into their posture improvement journey.

## Technology Stack
- **Language**: Python
- **Libraries**: 
  - Mediapipe and OpenCV for real-time posture detection.
  - FastAPI for creating the API endpoints.
  - SQLAlchemy for interacting with the PostgreSQL database.

## Live Demo
Check out the live demo of Postrue in action: [Watch Demo](https://www.youtube.com/watch?v=PwMzpxKCctk&ab_channel=R%C4%B1zaSemihKoca)

## Screenshots
![Screenshot 1](backend%2Fassets%2F4.jpg)
![Screenshot 2](backend%2Fassets%2Fcbimage.png)

![Screenshot 3](backend%2Fassets%2F1.jpg)
![Screenshot 4](backend%2Fassets%2Fresultgood.png)
![Screenshot 5](backend%2Fassets%2F65cde025.png)

## Getting Started
To set up and run docker-compose, follow these steps:
1. Clone the repository.
2. Create a `.env` file in the `backend` directory and add the following environment variables(Values can be changed as needed):
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
POSTGRES_HOST=127.0.0.1
POSTGRESQL_CON_STR=postgresql+psycopg2://postgres:postgres@127.0.0.1:5432/postgres
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
3. Run `docker-compose up --build` to build the images and start the containers.
4. Navigate to `http://localhost:8000/docs` to access the Swagger UI and test the API endpoints.
5. Navigate to `http://localhost:8081` to access the pgAdmin dashboard and view the database.

## Usage
1. Start the application and allow access to your camera for real-time posture detection.
2. Maintain correct posture, and Postrue will provide feedback and warnings if any incorrect postures are detected.
3. Use the data retrieval endpoints (`GET /daily/`, `GET /weekly/`, and `GET /monthly/`) to track your posture improvement progress.

## Contribution
We welcome contributions from the open-source community to make Postrue even better. Feel free to create issues, submit pull requests, or provide feedback.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Special thanks to 
- @rabiaelifcelik for the logo design.
- @bunyaminkorkut for the analytics design and application.
- @feyyum for the frontend application.


Improve your posture with Postrue, and start your journey towards better health and well-being!
