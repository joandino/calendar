# Live demo

You can find a live demo of the project here: https://elastic-jepsen-20bd1d.netlify.app/

Note: follow the next instructions so you can make requests to the api, as for development reasons I don't own a SSL certificate to make HTTPS requests from the API.

![calendar-1](src/assets/images/calendar-1.png)
![calendar-2](src/assets/images/calendar-2.png)
![calendar-3](src/assets/images/calendar-3.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## File Structure

calendar
├── build
├── node_modules
├── public
│   ├── calendar.ico
│   ├── index.html
│   └── manifest.json
│   └── robots.txt
├── src
│   ├── actions
│   │   └──reminderActions.tsx
│   ├── assets
│   │   └──icons
│   │   │  └── clear-day.svg
│   │   │  └── ...
│   │   └──app.scss
│   │   └──calendar.scss
│   ├── components
│   │   └── app
│   │       ├── Calendar.tsx
│   │       ├── ReminderDialog.tsx
│   ├── reducers
│   │   └── index.tsx
│   │   └── reindersReducer.tsx
│   ├── types
│   │   └── index.tsx
│   ├── App.tsx
│   ├── Index.tsx
│   ├── reactapp-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setUpTests.ts
│   └── store-js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
