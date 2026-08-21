# AI Workplace Companion

Build a modern, professional, responsive web application called AI Workplace Assistant.

PROJECT PURPOSE

The application should be an AI-powered workplace productivity assistant that helps users complete common workplace tasks efficiently and responsibly.

The main features must be:

Email Generation

Meeting Summarization

Task Planning

Research Assistance

AI Chatbot Interaction

DESIGN

Create a clean, modern professional dashboard suitable for workplace use.

Use:

Professional blue/purple accent colours

White/light background

Modern cards

Rounded corners

Subtle shadows

Clear typography

Responsive design for desktop, tablet and mobile

Simple navigation

Accessible buttons and form fields

Professional icons

The application should look like a real SaaS productivity product.

MAIN DASHBOARD

Create a dashboard with:

Application name: AI Workplace Assistant

Short description: "Your intelligent assistant for everyday workplace productivity."

Sidebar navigation

Dashboard

Email Generator

Meeting Summarizer

Task Planner

Research Assistant

AI Chat

Settings

The dashboard should contain five feature cards:

📧 Email Generator
"Create professional workplace emails in seconds."

📝 Meeting Summarizer
"Turn meeting notes into clear summaries and action items."

✅ Task Planner
"Organize tasks, priorities and deadlines."

🔎 Research Assistant
"Structure research questions and generate useful research summaries."

💬 AI Chat
"Ask questions and get assistance with workplace tasks."

Each card should have an icon, description and functional button.

EMAIL GENERATOR

Create a functional interface where the user can enter:

Recipient/role

Email purpose

Key points

Tone

Length

Tone options:

Professional

Friendly

Formal

Concise

Persuasive

When the user clicks "Generate Email", create a professional email based on the information provided.

Include:

Generated email area

Copy button

Regenerate button

Clear button

MEETING SUMMARIZER

Create an interface where the user can paste meeting notes or a transcript.

Include:

Meeting title

Meeting date

Participants

Meeting notes/transcript

When the user clicks "Summarize Meeting", generate:

Meeting summary

Key discussion points

Decisions made

Action items

Responsible person

Deadlines

Follow-up items

Include Copy and Clear buttons.

TASK PLANNER

Create a task management interface.

Users should be able to:

Add a task

Add description

Select priority

Select deadline

Assign a category

Mark tasks as completed

Delete tasks

Priority options:

High

Medium

Low

Categories:

Work

Meetings

Research

Administration

Personal

Display tasks using attractive task cards.

Include filters for:

All

Pending

Completed

High Priority

RESEARCH ASSISTANT

Create a research assistance interface.

Users should be able to enter:

Research question

Topic

Research objectives

Keywords

The assistant should help generate:

Research question refinement

Key themes

Suggested search terms

Research outline

Summary of supplied research information

Possible sources to investigate

IMPORTANT:
The application must clearly distinguish between AI-generated suggestions and verified sources. Do not present invented references as real academic sources.

AI CHAT

Create a conversational AI interface.

The user should be able to:

Type a question

Send the message

Receive an AI response

Continue the conversation

Include:

Chat history

User messages

Assistant messages

Loading indicator

Clear conversation button

Provide suggested prompts such as:

"Draft a professional email."

"Summarize these meeting notes."

"Help me prioritize my tasks."

"Help me structure my research."

"Create a weekly work plan."

RESPONSIBLE AI

Add a small "Responsible AI" section explaining that:

AI-generated content should be reviewed before use.

AI may produce inaccurate information.

Users should not enter confidential or sensitive workplace information.

Research claims and references should be verified.

AI should support human decision-making rather than replace professional judgement.

TECHNICAL REQUIREMENTS

Use a clean component-based architecture.

Use:

HTML

CSS

JavaScript/TypeScript as appropriate

React if supported by the project

Responsive design

Create reusable components for:

Navigation

Cards

Buttons

Forms

Chat messages

Task cards

Loading states

Notifications

Store task data locally so tasks remain available when the page is refreshed.

AI INTEGRATION

Structure the application so that an AI API can be connected securely.

Do NOT expose API keys in frontend code.

Use environment variables and a secure backend/server-side function for API requests.

If an AI API is not yet configured, create realistic demo responses so that all interface features can still be demonstrated.

Make it obvious in the code where the real AI API can later be connected.

USER EXPERIENCE

Add:

Loading states

Empty states

Error messages

Success notifications

Copy-to-clipboard functionality

Form validation

Responsive navigation

Smooth interactions

The application should feel polished and production-ready.

GITHUB PROJECT

Create the project with a clear structure suitable for GitHub.

Include:

README.md

Clear project description

Features

Technologies used

Installation instructions

How to configure AI API

Responsible AI section

Future improvements

The final application should demonstrate strong AI tool usage, prompt engineering, practical workplace automation, responsible AI use and good web development practices.

Do not create only a visual mockup. Make the buttons, forms, navigation and core functionality actually work.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://workday-helper-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f44e8c6d-f6dc-486a-9b2c-cfe49ff4cb5a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
