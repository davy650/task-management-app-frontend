# TaskManagement Frontend Application

This project contains a React project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), with [Tailwind CSS](https://tailwindcss.com/). This project is a front end interface to this [.NET backend API](https://github.com/davy650/task-management-app) project which is part of this project.

## Getting Started

Given that you will already downloaded and set up this [.NET backend Project](https://github.com/davy650/task-management-app), please proceed and clone this project

```
git clone https://github.com/davy650/task-management-app.git
cd to-source-dir
```



then run the development server:

```bash
# first
# ----------
npm install 

# then
# --------
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# then update your environment/.env with this setting, containing url to backend API
NEXT_PUBLIC_BASE_API_URL='http://localhost:5218'
```

Open [http://localhost:3000](http://localhost:3000) with your browser, login with the user created from [this project](https://github.com/davy650/task-management-app.git) and proceed to add/ manage some tasks

have fun :)
