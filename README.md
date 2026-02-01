<a id="readme-top"></a>

<h1 align="center">Mixpanel Query Builder</h1>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

---

## About The Project

Live URL: https://mixpanelquery.vercel.app

A lightweight React/Node.js application for filtering and querying user data, inspired by Mixpanel's query builder feature. Build dynamic queries using rules and nested groups, with support for both text and date-based filters.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Built With

![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![React Query Builder](https://img.shields.io/badge/React_Query_Builder-ff69b4?style=for-the-badge)
![date-fns](https://img.shields.io/badge/date-fns-3178c6?style=for-the-badge)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm, yarn, pnpm, or bun

### Installation

Clone the repo:

```bash
git clone https://github.com/janrusell-dev/mixpanelquery.git
cd mixpanelquery
npm install
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
## Usage

1. Add a filter — Click the  + Filter button and select a property (e.g. Name, Country, City)
2. Set a value — Set value selector from the button with the Select Value... placeholder. Pick one or more values
3. Change the operator — Use the operator dropdown to switch between Is, Contains, Last X days, etc.
4. Group rules — Click + Group to create a nested group. Switch between AND / OR to control logic
5. Preview results — The user table updates in real time as you build your query
6. Clear filters — Click Clear All to reset everything

### Example Queries
#### Users in Georgia OR Hong Kong:
``` bash
Country  Is  Georgia
  OR
Country  Is  Hong Kong
```
#### US users in Atlanta updated in the last 7 days:
``` bash
Country   Is      United States
  AND
City      Is      Atlanta
  AND
Updated at  Last  7 days
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
