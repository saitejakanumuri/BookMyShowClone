# BookMyShowClone

Developed a full-stack replica of BookMyShow, a popular movie ticket booking platform. Implemented end-to-end features including:

🎬 Movie & Show Management – browse movies, view show timings, theatre details.

🎟 Seat Selection System – interactive UI to select/deselect available seats.

💳 Payment Integration – integrated Stripe for secure online payments.

📧 Email Notifications – auto-generated booking confirmation emails with ticket details.

👤 User Authentication – login/signup/admin/partner with JWT token-based authentication.

📊 Admin Dashboard – manage movies, theatres, shows, and bookings

Tech Stack: MERN (MongoDB, Express.js, React.js, Node.js), Redux, Stripe API, Resend API for emails, Ant Design (UI), Moment.js.

/admin - have permission to add movies/ Approve theatres/ add shows to the site.
/partner - have permissions to add theatres/shows to the site.
/user - can only book movies in the site.

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# to initialize CRA: npx create-react-app .

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



----------------------------------------------------------------------

1.create a main folder (project -name).
2. create a two folder client,server for fullstack application
3. initialized the react application with CRA command which initializes the custom react templates and requirements like react,react-dom etc..
  npx create-react-app ./
  ./ tells to initailze in the current folder itself

  npm start

4. goto index.js observe ready serve create-react app template wrapped App component inside strictMode 
StrictMode is a development only tool
i. it helps detect unsafe lifecycle methods depreceated API's, accidental side effects etc.

ii. some times need to remove because it cause functions to run twice in dev mode, which breaks and confuses

iii. In this project App component is wrapped by Provider- a special component.
It makes the redux store available to your entire React app.

Any component inside Provider can use
1. useSelector() - to read state from store
2. useDispatch() - to dispatch actions to the store.

Example from your App.js:
const { loading } = useSelector((store) => store.loaders);
👉 This only works because the <App /> (and all its children) are inside <Provider store={store}>.

Without <Provider>, useSelector and useDispatch would throw errors because they wouldn’t know which store to connect to.


?? what is redux why is it

every client has their own session maintained by the browsers.
>redux is used so your react app has one central "single source of truth" for shared state.

>>saying will share the same data when updated?

> exactly, Local react state (useState,props)
useState belongs to one component  only.
only children that receive it as props can see it.
if you update it, only that component subtree sees the update.

Redux store(Provider+useSelector / useDispatch)
> the whole app shares one centralized store (inside one browser tab).
Any component wrapped under <Provider> can read same piece of state with useSelector.
> If one component dispatches an action or update the store, all components that depend on that data will re-render with the new value automatically.
⚡ Example with your app
Suppose you keep the logged-in user info in Redux store:
// store slice
{
  user: { name: "Sai", role: "admin" }
}
<Profile /> can read user.name and display "Sai".

<Admin /> can read user.role and show admin-only features.

<Navbar /> can read user.name and show "Hi, Sai" in the header.
Now if the user logs out:
dispatch(logoutUser());
👉 Instantly, Profile, Admin, Navbar, etc. all get updated at once because they are all reading from the same global store.

[User clicks Login button]
        |
        v
  dispatch(loginUser)
        |
        v
   [Reducer updates store.user]
        |
        v
   [Redux Store]
        |
   ---------------------------
   |      |       |         |
 Navbar  Profile Admin  ProtectedRoute
   |       |       |         |
  show   show    allow     check
 "Hi Sai" profile admin   auth
✅ This is why Redux is powerful: one update → all subscribers (components) react automatically.

ProtectedRoute  - its a wrapper component around your pages that checks if user is loggedin before rendering.

ex:
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { user } = useSelector((store) => store.user);  // read user from Redux store

  if (!user) {
    // if no user, redirect to login
    return <Navigate to="/login" />;
  }

  // otherwise, render the page
  return children;
}

export default ProtectedRoute;
🔹 Why use it?
It centralizes your auth check logic. Instead of repeating “if not logged in → redirect” in every page, you just wrap pages with <ProtectedRoute> in your Routes.
ProtectedRoute is the gatekeeper. It looks at the Redux store (user state), and only allows access to routes if the user is logged in. Otherwise, it kicks them back to login.

 Why you can’t write 
 import React, useEffect, useState from "react";
Because JavaScript import syntax doesn’t allow mixing them like that.

The rule is:

If you want both default and named → you must put the default first, then named inside { }.

The correct syntax is exactly: import defaultName, { named1, named2 } from "module";


>>>>
Tree-shaking optimization

With named imports ({ useState }), modern bundlers (Webpack, Vite, Rollup) can include only what you use in the final bundle.

With React.useState, the entire React object is pulled in, even if you don’t use most of it.
This can make your build larger.                    

In protectedRoute.js
Link vs Navigate
link will convert into <a>tag and it is declarative navigation
navigate is an imperative function will call directly inside event handlers, conditions or effects. - it redirects.

>>> import Home from './pages/Home'
but folder structure follows pages/Home/index.js
why does index.js created instead of Home.js
some folders inside Home is required may be css, other js files.

Node/webpack will automatically look for index.js inside the folder.
That’s why it works without needing ./pages/Home/index.js.

>>>> reduxToolKit

store.js is the global redux store

Actions- (showLoading,hideLoading) are the things that happen.
Reducer- (bananaSlice.reducer) describes how the state changes when those actions happen.
store- (configureStore) combines mulitiple reducers into one state tree. 
ex: servicePerson
useSelector - lets components read from the state tree (store.loaders.loading).

ex:
useSelector((store)=>store.loaders) - {loading:false} then current state of loading.

export const{showLoading,hideLoading} - gives the ready-made action creators.

export default bananaSlice.reducer - gives the reducer function that updates the loaders state.

refer store.js
ex:
export {showLoading,hideLoading} = bananaSlice.actions
*** follows destructuring***
bananaSlice.actions - {
    showLoading: ()=>({type:"loader/showLoading"}),
    hideLoading: ()=>({type:"loader/hideLoading"})
}

when export default bananaSlice.reducers;
reducer function will know how to handle the actions.
inner functionality of reducer not shown in code.(traditionalway)
function reducer(state = { loading: false }, action) {
  switch (action.type) {
    case "loader/showLoading":
      return { ...state, loading: true };
    case "loader/hideLoading":
      return { ...state, loading: false };
    default:
      return state;
  }
}
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
so in traditionally in normal redux reducers are written like this below-


function loaderReducer(state = { loading: false }, action) {
  switch (action.type) {
    case "loader/showLoading":
      return { ...state, loading: true };   // return new object
    case "loader/hideLoading":
      return { ...state, loading: false };
    default:
      return state;
  }
}

with redux Tool Kit
reducers: {
  showLoading: (state) => {
    state.loading = true;
  },
  hideLoading: (state) => {
    state.loading = false;
  }
}

anyways redux toolkit says it allows to perform mutablility seen in toolkit directly updating states ex: state.loading=true but under the hood reduxToolkit uses Immer lib to first wrap the state in a draft object ,, mutate the draft and produce brand-new immutable state object behind the scenes.
So in reality, your reducer is executing the function logic you wrote and Immer ensures Redux immutability rules are still followed.

when you call 
dispatch(showLoading());
1. Redux sees { type: "loader/showLoading" }
2. Finds the showLoading reducer
3. runs the function
(state) => { state.loading = true; } immer produces new state obj { loading: true }

Redux updates store.loaders with that new state
### Any components using useSelector((s) => s.loaders.loading) re-render

Each reducer in your slice is just a function with your logic. Redux Toolkit will:

Pick the right function based on action.type.

Run the function logic.

Use Immer to turn your “mutations” into a new immutable state.

Update the store and notify React components.

js functions:

movies arr
movies && movies.filter((movie)=> movie.name.toLowerCase().includes(searchText.toLowerCase())).map((movie)=>(
    <col>movie</col>
))

antd Form.Item

<Form.Item
  label="Register as a Partner"
  name="role"
  rules={[{ required: true, message: "Please select an option!" }]}
>
  <Radio.Group>
    <Radio value="partner">Yes</Radio>
    <Radio value="user">No</Radio>
  </Radio.Group>
</Form.Item>

In Ant Design, Form.Item is like a wrapper that binds a form field (input, select, radio, etc.) to the form’s state and validation system.

label="Register as a Partner makes <label> element
It automatically associates the label with the child field (Radio.Group) because Form.Item handles it.

Because of name="role", the form knows:
“whatever value this Radio.Group selects → store it in form’s values under key role.”

Example: If the user selects Yes → form values become { role: "partner" }

### Why it assumes the label belongs to Radio.Group
Because Form.Item is a controlled wrapper:

It looks at its child (here Radio.Group).

Hooks it up with the form state via the name property (role).

Associates the generated label with that child.

##### difference between import vs require

const { axiosInstance } = require("./index");
🔹 1. What’s happening here
This is CommonJS syntax (require) instead of ES Modules (import).

require("./index") loads whatever is exported from index.js.

Your index.js had:
export const axiosInstance = axios.create({ ... });

When compiled/bundled, that becomes something like:

module.exports = { axiosInstance };

So require("./index") gives an object:

{ axiosInstance: <the configured axios object> }

That’s why you destructure it:
const { axiosInstance } = require("./index");

🔹2. Why both import and require can exist
Front-end React code (in client/) usually uses ES Modules (import/export).

Node.js backend code (in server/ or calls/ if it’s running in Node) often still uses CommonJS (require/module.exports).

Tools like Babel or Webpack handle the conversion when bundling.

🔹 3. Why not just import { axiosInstance } from "./index";?
If this file is executed in Node.js (without ESM enabled), you can’t use import directly.

So people stick to require.

If it’s in React frontend, you normally use import.

Your project might be mixing them depending on whether the code runs in the client (browser) or the server (Node.js API calls).

✅ Answer
const { axiosInstance } = require("./index") is just CommonJS syntax to import the named export (axiosInstance) from index.js.
It works because index.js ultimately exports an object containing { axiosInstance }.

 So what is loaderSlice.reducer?
 It’s the reducer function automatically generated by Redux Toolkit for that slice.

In plain Redux, you would have written something like:
function loadersReducer(state = { loading: false }, action) {
  switch (action.type) {
    case "loader/showLoading":
      return { ...state, loading: true };
    case "loader/hideLoading":
      return { ...state, loading: false };
    default:
      return state;
  }
}

reducer is a function generated from your loaderSlice. it knows how to handle the actions showLoading,hideLoading and maintains the state loading:true/false inside store.loaders.

store.loaders - will contain the current state 
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer
  },
});
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
{
  loaders: { loading: false },  // managed by loadersReducer
  users: { ... }                // managed by usersReducer
}

this means redux state tree looks like 

dispatch -> reducer -> store.update -> component re-render.

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
antd design --

<Form onFinish={onFinish}>
  <Form.Item name="email" rules={[{ required: true }]}>
    <Input />
  </Form.Item>

  <Form.Item name="password" rules={[{ required: true }]}>
    <Input.Password />
  </Form.Item>

  <Button htmlType="submit">Login</Button>
</Form>


const onFinish = async (values) => { ... }

values paramter in onFinish is an object containing all form fields, key as Form.Item

{
    'username':"saiTeja",
    "password":'123edd"
}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


BACKEND node+ Express+DB


client/ , server/ folder both have their own package.json to mention their dependencies. 

two independent Node projects:

client/package.json = React frontend.

server/package.json = Node/Express backend.

but, how both work together?
Axios is the feature that client makes API call to proxy server setup and server responds reverse.

usually setup a proxy in client/package.json
"proxy":"http://localhost:8082"
 react will automatically forwards request to the backend.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 Why this split is useful

Each part can be deployed separately (frontend → Netlify/Vercel, backend → Render/Heroku).

Keeps frontend (UI code) and backend (API/DB code) cleanly separated.

Different dependencies don’t get mixed up (React doesn’t need mongoose, Express doesn’t need antd).

cant do code fixes release without impacting frontend
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


to initialize backend 

npm init -y

create a server.js
init helment xPoweredBy:false
Helmet is a security middleware that sets HTTP headers to help protect your app from common vulnerabilites(xss,clickjacking etc)

by default X-Powered-By:Express

 what will happen if X-Powered-By : Express it just tell server is express right?
it simply tells the outside world that your backend is built with Express.js.
It’s like telling an attacker what locks you’re using on your house. information leakage

secure apps do remove header completely or mask it with something fake.
say res.header("X-Powered-By","PHP/7.4.99");
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
MIDDLEWARES - are functions sit inbetween incoming request and outgoing response.

Express Middleware	                        Spring Interceptors/Filters
JavaScript functions	                     Java classes implementing HandlerInterceptor or Filter
Simple chain via next()              	    Lifecycle methods: preHandle, postHandle, afterCompletion
No built-in separation between pre/post	    Clear distinction between pre/post/after completion
Runs in Node event loop (single-threaded)	Runs in Java multi-threaded environment

abilities - 
1. modify the request or response
2. run some logic (auth,logging,validation etc)
3. or pass control to the next middleware using next
like a pipeline
incoming reqest -> [middleware1] -> [middleware2] -> [route handler]-> response.

types of middleware
1. Built-in (provided by express)
express.json() -> parses JSON request bodies/
express.urlencoded() -> parses URL-encoded data from forms.
express.static() -> serves static files(HTML,CSS,JS,images)
2. Third-party middleware(install via npm)
helmet -> sets  secure HTTP headers
cors -> enables cross-origin-resources-sharing
morgan -> logs HTTP requests
cookie-parser -> parses cookies
express-session -> manages sessions.
3. Custom middleware (own functions)
app.use((req, res, next) => {
  console.log("Request Time:", Date.now());
  next();
});

Commonly used middleware in real projects

Security

helmet() → prevent attacks by setting headers

express-mongo-sanitize() → prevent NoSQL injection

express-rate-limit() → limit repeated requests

Parsing

express.json() and express.urlencoded() → handle incoming body data

cookie-parser → handle cookies

CORS

cors() → allow frontend (e.g., React) to talk to backend on another port

Logging

morgan("dev") → logs every request in dev-friendly format

Sessions/Auth

express-session, passport for user sessions & authentication

Error handling

A custom error-handling middleware with err, req, res, next.

server/middleware/authMiddleware.js- written for route protection using JWT. it is called before-action methods(route handlers) to ensure authentication.

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

mongoose - >

.populate() - method is used to replace the specified path in a document with documents from another collection.

for example: if you have references between collection (using objectID with ref).populate() will fetch the actual referenced documents instead of just returning the IDs.

populate() itself returns a query object(not the final data immediately)
when you execute the query(using.exec(),await or callback) the result  will be your documents with the populated fields replaced by the actual referenced documents.

ex: 
const mongoose = require("mongoose")
const authorSchema = new mongoose.schema({
    name:String
})

const bookSchema = new mongoose.schema({
    title:String,
    author:{type:mongoose.Schema.Types.ObjectId, ref: 'Author'}
})

const Author = mongoose.model('Author',authorSchema)
const Book = mongoose.model("Boook",bookSchema)

without populate
const book = await book.findOne({title:"My Book"})
console.log(book);

o/p:
{
    _id:...,
    title:"My Book",
    author: objectId("64d..")
}

with populate
const book = await Book.findOne({title:My Book"}).populate("author");
console.log(book)
o/p:
{
    _id:...,
    title:"My Book",
    author:{_id:...,name:"John Doe"}
}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

1. route parameters(req.params)
when you define a route with :paramName, you can access it via req.params
bookingRouter.get("/booking/:id",(req,res)=>{
  const bookingId = req.params.id;
  res.json({bookingId})
});

GET /booking/123

{"bookingId":"123"}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
2. query parameters(req.query)

bookingRouter.get("/search", (req,res) =>{
  const {date, status} = req.query;
  res.json({date,status});
});

GET /search?date=2025-08-27&status=confirmed
{"date":"2025-08-27", "status":"confirmed"}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
3. Body parameters(req.body)
for POST,PUT,PUTCH you usually use JSON in the request body.
making sure you add middleware:
app.use(express.json());

bookingRouter.post("/make-payment", (req,res) =>{
  const {amount, method} = req.body;
  res.json({message: "payment Recieved", amount,method});
})

POST /make-payment
Content-Type: application/json
{
  amount: 5000,
  method: "card"
}

response: {"message":"payment recieved","amount":5000, "method":"card"}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Headers (req.headers)
sometimes tokens or API keys are passed in headers

bookingRouter.get("/secure", (req,res) =>{
  const token = req.headers["authorization"];
  res.json({token});
})

GET /secure
Authorization: Bearer my-secret-token

req.params -> /route/:id
req.query => /route?key=value
req.body => JSON or form data in req body
req.headers => HTTP headers
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
multiple route parameters
bookingRouter.get("/user/:userId/booking/:bookingId", (req,res)=>{
  const {userId,bookingId} = req.params;
  res.json({userId,bookingId});
});
Request: GET /user/42/booking/987
Response : {"userId":"42", "bookingId":"987"
}
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Mixing Route params + Query Params
bookingRouter.get("/user/:userId/bookings", (req,res)=>{
  const {userId} = req.params;
  const { status, date } = req.query
  res.json({userId,status,date});
})
Request: GET /user/42/bookings?status=confirmed&date=2025-08-27
Response: { "userId": "42", "status": "confirmed", "date": "2025-08-27" }
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Body+Params (common in POST/PUT)
bookingRouter.post("/user/:userId/booking/:bookingId/pay", (req,res)=>{
 const {userId,bookingId} = req.params
 const {amount, method} = req.body;
 res.json({userId, bookingId, amount, method});

});

Request:
POST /user/42/booking/987/pay
Content-Type: application/json
{
  "amount":5000,
  "method":"card"
}
Response:
{
  "userId":"42",
  "bookingId":"987",
  "amount":5000,
  "method":"card"
}

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

DB connection error:

MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/

Ans: to allow requests from backend server to DB we have to whitelist the IP address of the backend server.
you mostly having dynamic IP address as ISP will allocate dynamic so goto Atlas and under Network access add IP Address 0.0.0.0/0 to all requests from any IP.


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

navigate( /movie/${movie._id}?date=${moment().format( "YYYY-MM-DD" )} ); 
where does navigate look for url?

In React Router, navigate("/something") does not make a network request.
It only updates the browser’s address bar and tells React Router to render the route that matches the new URL.
EXample:
navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
Browser URL becomes something like:

http://localhost:3000/movie/66dbf23c7f9c4a1234abcd?date=2025-09-06

React Router then looks at your <Routes> setup in your app.
For example:

<Routes>
  <Route path="/movie/:id" element={<MoviePage />} />
</Routes>


If you have /movie/:id defined, it will match, and React Router renders <MoviePage />.

Inside MoviePage, you can grab:

const { id } = useParams();       // movie._id
const [searchParams] = useSearchParams();
const date = searchParams.get("date"); // "2025-09-06"
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
authMiddleWare.js
token should be updated for every request. the below way token dynamically updates on every request.  
axiosInstance.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem("token");
    if(token){
      config.headers.authorization = `Bearer ${token}`;
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  }
)
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

payment using stripe UML diagram
https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements

sending booking mails
https://resend.com/onboarding 
copy Api key , Api url and make a post request with auth token.