# Welcome to Apollo!

A website to help people of all age practice their music skills by bringing interactive flashcards to the lessons!
This repository holds a backend for B2B-Music-Lesson that leverages AWS CDK for better deployment process and maintainability. 

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`BackendStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Frontend Repository
https://github.com/B2B-Music-Lesson/Frontend

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## Other Information

* [Website Link](https://frontend-3zi.pages.dev/)

### Org Chart

![org-chart](https://ricardopdffiles.s3.us-west-1.amazonaws.com/Blank+diagram.png)

### 🚀 Technologies

- [Reactjs](https://reactjs.org/)
- [Nodejs](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/)

### Github Repos

- [Frontend](https://github.com/B2B-Music-Lesson/Frontend)
- [Backend](https://github.com/B2B-Music-Lesson/Backend)

### 🧑‍💻 Project Description

This service is the solution to a combination of three problems/factors

1) companies (especially medium to large tech companies) often have a relatively _enormous_ budget for employee perks and amenities
2) many adults want music lessons, but the primary reason to not have them is time, followed by money, mostly time though.
3) music teachers have a hard time finding enough students, especially students whose schedules line up perfectly back to back.

Thus, the proposed solution is to provide a service where a business can pay to have a music teacher come (say once per week) and a certain number of employees will be able to take advantage of this company perk.

The goal of this project would be to implement a website that would manage this exchange

### 🏆 Team:

- Connor Jensen 
- Ryan Hill
- Jaeyoung Park - [@andhim](https://github.com/andhim)
- Ammon Warnick - [@AmmonWarnick](https://github.com/AmmonWarnick)
- Ricardo Leite - [@ricardo-ljr](https://github.com/ricardo-ljr)
- Camila Ngo - [@camyngo](https://github.com/camyngo)

### ❓ Questions: 

- Overview for the project 
- Is there any work or repository made for this project? 
- Have you decided on any MVP features/Project structure?

### 📝 Project Requirements

<details>
<summary>Core Requirements</summary>
</br>
<dl>
<dt>Front End</dt>
  <dd>Sign Up Page/Login Page (Student and Teacher)</dd>
  <dd>Page with flashcard for students</dd>
  <dd>Dashboard for teachers to keep track of students progress</dd>
</br>
<dt>Back End</dt>
  <dd>Handle API calls to sign up/login and complete flashcards</dd>
  <dd>Database to store students, teachers and flashcards</dd>
</ul>
</dl>
</details>

<details>
<summary>Prototype Demo Requirements</summary>
<br>
<ul>
  <li>Student logs in, and sees a page of flashcards</li>
</ul>
</details>

<details>
<summary>Work-In-Progress Demo Requirements</summary>
<br>
<ul>
  <li>Create dashboards for teachers to keep track of students progress</li>
  <li>Two different views - Students can see their cards and teachers can see their student's progress</li>
</ul>
</details>

<details>
<summary>Final Demo Requirements</summary>
<br>
<ul>
  <li>Student can log in, take flashcard test, get a score, and teacher gets score reported in dashboard.</li>
</ul>
</details>

### 📈 PERT and Gantt Charts

- [PERT Chart](https://ricardopdffiles.s3.us-west-1.amazonaws.com/PERT+chart.pdf)
- [Gantt Chart](https://docs.google.com/spreadsheets/d/1pfCczUx53x30TGa4dokcQQEcF2aSefhNgE7zCUnD4eY/edit#gid=0)

### 🏢 Architecture and Design Document

- [Architecture Document](https://docs.google.com/document/d/1VmYnAYqMQDeMobS7aSynBdL2bUEuenbd-h3ZwUHF1Cg/edit)

### 📅 Testing and SQA Plan

- [Test/SQA Plan](https://docs.google.com/document/d/1AsGjSyMuDRRgW74VLGHby_H1I_3t4of-eQGxR7wKyQQ/edit

