# Freelancing Platform

A full-stack web application for clients and freelancers to collaborate, post projects, bid, and manage freelance work. Built with Angular (frontend) and ASP.NET Core (.NET 8) (backend), deployed on Vercel and Render.

---

## 🚀 Features

### For Clients
- **Project Posting:** Create, edit, and delete freelance projects.
- **Proposal Management:** View, accept, or reject proposals from freelancers.
- **Project Tracking:** Monitor project status (Pending, In Progress, Completed, Cancelled).
- **Freelancer Assignment:** Assign projects to selected freelancers.

### For Freelancers
- **Browse Projects:** View available projects and filter by skills or status.
- **Submit Proposals:** Bid on projects with custom amount and duration.
- **Proposal Status:** Track proposal status (Accepted, Rejected, Pending).
- **Profile Management:** Edit profile, update skills, and view dashboard stats.

### Common Features
- **Authentication & Authorization:** Secure login/register for both roles.
- **Real-Time Notifications:** SignalR-powered notifications for project updates and chat.
- **Dashboard & Analytics:** See ongoing, completed, and cancelled projects/proposals.
- **Search & Filter:** Powerful search and filter for projects and proposals.
- **Responsive UI:** Mobile-friendly, modern design with Tailwind CSS and Bootstrap Icons.
- **Cloudinary Integration:** Image upload and management for user profiles.

---

## 🏗️ Architecture

- **Frontend:** Angular 20, RxJS, NgRx, Tailwind CSS, Bootstrap Icons
- **Backend:** ASP.NET Core (.NET 8), Entity Framework Core, PostgreSQL, SignalR
- **Database:** PostgreSQL (hosted on Render)
- **Image Hosting:** Cloudinary
- **Deployment:**  
  - Frontend: Vercel  
  - Backend: Render (Docker-based)

---

## 📦 Folder Structure

```
Freelancing-Platform/
├── Backend/      # ASP.NET Core backend
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── Hubs/                # SignalR hubs
│   ├── appsettings.json
│   ├── Dockerfile.render
│   └── ...
├── Frontend/     # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── Components/
│   │   │   ├── Services/
│   │   │   ├── Models/
│   │   │   └── ...
│   ├── environments/
│   ├── angular.json
│   ├── Dockerfile
│   └── ...
└── README.md
```

---

## 🛠️ Setup & Development

### Backend (.NET)
1. **Install .NET 8 SDK**
2. **Configure PostgreSQL connection in `appsettings.json`**
3. **Run migrations:**  
   ```bash
   dotnet ef database update
   ```
4. **Start server:**  
   ```bash
   dotnet run
   ```

### Frontend (Angular)
1. **Install Node.js & npm**
2. **Install dependencies:**  
   ```bash
   cd Frontend
   npm install
   ```
3. **Start development server:**  
   ```bash
   ng serve
   ```
   Visit [http://localhost:4200](http://localhost:4200)

---

## ⚡ Deployment

- **Frontend:**  
  - Push code to GitHub  
  - Connect repo to Vercel  
  - Vercel auto-builds and deploys Angular app

- **Backend:**  
  - Push code to GitHub  
  - Connect repo to Render  
  - Render builds Docker image, runs migrations, and hosts API

---

## 🔗 API Endpoints

- `/api/v1/auth/login` — User login
- `/api/v1/auth/register` — User registration
- `/api/v1/projects` — Project CRUD
- `/api/v1/proposals` — Proposal CRUD
- `/notificationhub` — SignalR real-time hub

---

## 💡 Technologies Used

- Angular 20
- ASP.NET Core (.NET 8)
- Entity Framework Core
- PostgreSQL
- SignalR
- NgRx
- RxJS
- Tailwind CSS
- Bootstrap Icons
- Cloudinary

---

## 🎉 Functional Highlights

- **Role-based access:** Separate flows for clients and freelancers
- **Real-time updates:** SignalR for notifications and chat
- **Project lifecycle:** From posting to completion/cancellation
- **Proposal workflow:** Submit, accept, reject, and track proposals
- **Profile & dashboard:** Stats, skills, and project history
- **Robust error handling:** User-friendly toasts and messages
- **Secure:** JWT authentication, CORS, HTTPS

---

## 📸 Screenshots

Here are some sample screenshots of the Freelancing Platform in action:

![Dashboard](https://raw.githubusercontent.com/KAVIRAJec/Freelancing-Platform/refs/heads/main/Images/Screenshot%202025-08-11%20at%209.37.08%E2%80%AFAM.png)

<!-- Add more images below as needed -->

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Render Deployment Guide](https://render.com/docs/deploy-dotnet)
- [Vercel Angular Guide](https://vercel.com/guides/deploying-angular-with-vercel)

---

## 🤝 Contributing

Pull requests and issues are welcome!  
Please follow the code style and add tests for new features.

---

## 📝 License

MIT License

---

**Enjoy building and using the Freelancing Platform!**
