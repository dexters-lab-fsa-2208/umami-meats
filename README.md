# untitled - steak/sushi vendor
Concise intro to our e-commerce project; selling *x* product with *y* and *z* functionality.
## Overview
**Project description:**
Final project details. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

**Features**
* User authentication
* Really nice looking carousels

**Learning outcomes from working on this project:**
Problems we faced, things we learned. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Technologies used
_Later we might want to go into detail here about what we used these technologies for_
* Next.js
* React
* Redux
* styled components
* Sequelize
* axios
* JWT
* bcrypt

 ## Setup this repository locally
* Clone and setup the repository with the following commands:
```
git clone git@github.com:dexters-lab-fsa-2208/dexter.git
cd dexter
npm install
createdb dexter
npm run seed
```
*This installs all necessary packages, creates a postgres database, and seeds it with products, orders, and users.*
* *Note: we should change the database name once we have an actual name*
* Create a `.env.local` file containing an environment variable `JWT` (it can be any arbitrary string) 
	* Example: `JWT="someStringForGeneratingTokens"`
	* Example: `JWT="JGg98aLB9fh98Hf3NIFN9nhdLS092"`
* Run `npm run dev` *Note: this should probably be `npm start` eventually*
* View the project on http://localhost:3000
