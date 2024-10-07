<div align="center">
  <h1>Certificate Manager</h1>
  <p>An application to manage certificates efficiently with a clean and intuitive interface.</p>
</div>

---

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

**Backend**:
- Java with Quarkus
- Maven
- PostgreSQL (Database)

**Frontend**:
- ReactJS with TypeScript
- Webpack

---

## 📊 Database Structure <a name="erd-diagram"></a>

![drawSQL-image-export-2024-10-07 (1)](https://github.com/user-attachments/assets/448ee11e-0992-47d8-a683-42ba2fbc6864)


---

## 🚀 Getting Started <a name="getting-started"></a>

### Prerequisites

To run this project locally, you will need the following tools installed on your machine:

- **Java 11+**
- **Node.js**
- **Maven**
- **PostgreSQL**

### Setting Up Environment Variables

To manage your database configuration more efficiently, you can create a `.env` file in your project root directory.

1. **Create a `.env` file**:
   In the root of your project, create a file named `.env` and add the following contents:

   ```plaintext
   DB_USERNAME=
   DB_PASSWORD=
   DB_URL=jdbc:postgresql://localhost:5433/{YOUR-DATABASE-NAME}
   ```

⚠️ 
` Before running the application, ensure that the PostgreSQL database is created and properly configured 
  `

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/certificate-manager.git
   cd certificate-manager

2. First build application:
```shell script
mvn clean 
mvn quarkus:build
```

3. then inside the `backend` module:
```shell script
java -jar target/quarkus-app/quarkus-run.jar
```

> **_NOTE:_**  The Quarkus backend now serves the frontend at http://localhost:8080.
 
---

<!-- AUTHORS -->

## 👤 Author <a name="authors"></a>

👤 **Levy Ukwishaka**

- GitHub: [@levy002](https://github.com/levy002)
- Twitter: [@levy_ukwishaka](https://twitter.com/levy_ukwishaka)
- LinkedIn: [@levy-ukwishaka](https://www.linkedin.com/in/levy-ukwishaka/)

---

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

---

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project, please leave a ⭐️ to show your support!

---

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank CoA & DCCS for offering me the guidance.
