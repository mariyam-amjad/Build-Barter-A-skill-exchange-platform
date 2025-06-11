![Skill Swap222](https://github.com/Wellitsabhi/Skillswap/assets/63799853/9e597edd-7a40-4a03-b7d8-0cdeaf1b792f)

[Skill Swap↗️](https://skillswap-seven.vercel.app/) is an innovative platform where users can register, list their skills and interests, and find others on the platform to teach and learn from each other. It's a community-driven skill exchange network designed to foster collaborative learning and personal growth.

## Table of Contents
- [Skill Swap](#skill-swap)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Usage](#usage)
    - [Register](#register)
    - [Profile Setup](#profile-setup)
    - [Finding a Match](#finding-a-match)
    - [Skill Exchange](#skill-exchange)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Contributing](#contributing)
  - [Future Plans](#future-plans)
  - [Contributors](#contributors)
  - [License](#license)
  - [Contact](#contact)

## Features
- **User Registration**: Easy signup process to create an account.
- **Profile Setup**: Users can list their skills and interests.
- **Matchmaking**: Find users with complementary skills.
- **Skill Exchange**: Connect with others to teach and learn new skills.

## Usage

### Register
1. Open the app and click on the 'Get started' button.
2. Fill in the required details and create your account.

### Profile Setup
1. After registration, log in to your account.
2. Navigate to the 'Profile' section.
3. Add your skills and interests to your profile.

### Finding a Match
1. Use the `swipe` functionality to find users with the skills you're interested in.
2. Browse profiles and send connection requests to potential matches.

### Skill Exchange
1. Once connected, you can find contact info in `matches` section, arrange a skill exchange session.
2. Give feedback to us after the session to help improve the community.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v20.0+)
- Express.js (v4.19.2+)
- React.js (v18.2.0+)
- MongoDB Atlas

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Wellitsabhi/Skillswap
   ```
2. Navigate to the project directory:
   ```bash
   cd Skillswap
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create two `.env` files (seperate for backend and frontend) and add the following variables-
   Backend env :
   ```plaintext
    DATABASE_USERNAME=your_mongodb_database_username
    DB_PASSWORD=your_mongodb_database_username
    SECRET_KEY=your_secret_key
    PORT=3000
    FRONTEND_URL=http://localhost
   ```
   Frontend env :
   ```plaintext
    VITE_BACKEND_URL=http://localhost:3000/
   ```

5. Start the application:
   ```bash
   npm run dev
   ```

The app should now be running on `http://localhost:5173`.

## Contributing
We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## Future Plans
- **Messaging**: In-app messaging to communicate with matches.
- **Mobile App**: Develop a mobile application for iOS and Android.
- **Group Skill Swaps**: Allow users to join group sessions for skill exchanges.
- **Video Tutorials**: Integrate video tutorials for popular skills.
- **Gamification**: Introduce badges and rewards to motivate users.
- **Advanced Matchmaking**: Implement AI-based matchmaking to find the best skill exchange partners.

## Contributors
- **Himanshu Lilhore** - [GitHub](https://github.com/Himanshu-Lilhore) | [Twitter](https://x.com/HimanshuLilhore)
- **Abhishek Singh** - [GitHub](https://github.com/Wellitsabhi) | [Twitter](https://x.com/wellitsabhi)
- **Khushi** - [GitHub](https://github.com/KodaKodama) | [Twitter](https://x.com/DevQueen146223)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or suggestions, feel free to reach out to us:
- Email: skillswap.in@gmail.com
- GitHub Issues: [https://github.com/Wellitsabhi/Skillswap/issues](https://github.com/Wellitsabhi/Skillswap/issues)
