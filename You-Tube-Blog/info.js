// npm init
// npm i express
// npm i mongoose
// npm i ejs
// npm i cookie-


// steps of BLOGGING

// 1. blog model schema
// 2. blog ka form (views)
// 3. create a  route (add-new)

// 4. create a post route for blog  (just returning the home page just)

// 5. Now firstly do fileuploading task

// 6. create a post route for blog (blog ko create karre using async and await)  ---> mongodb me ye store hai

// 7. index.js me pure blogs ko display karre
// app.get ("/", async (req,res)=> {
//     const allBlogs = await Blog.find({});  //.sort ("createdAt", -1);
//     res.render ("home", {
//         user: req.user,
//         blogs: allBlogs,
//     });
// });

// 8. home page pe card ke form me using for each loop ek ek ko diplay karre
// problem ye thi ki image nai visible hoti thi card pe , we have to show express that ki tum uploads folder me jo images hai usko statically serve karo

// 9. app.use(express.static(path.join(__dirname, "public")));



// router.get ("/:id", async (req,res) => {             // step 1  create a get route --> step 2--> create blog view
//     const blog = await Blog.findById (req.params.id);
//     return res.render ("blog", {                     // step 3 --> render the blog page
//         user: req.user,                         // req.user isliye likhe ki navbar me hame Add blog icon dikhe (similary as we did previously)
//         blog,                                   // ye blog object hum blog view me istemal karre particular things display kar 
//     });
// });


// <!-- with the help of createdBy (createdBy conatains cmplt user) (populate) in blog schema we made, we can show the current user below the body -->

// blog view page
// <div class = "conatiner mt-4">
//   <img src= "<%= blog.createdBy.profileImageUrl %>" width="50px"> <%= blog.createdBy.fullName %>
// </div>


// how to make comments
// 1. craete a comment schema
// 2. create a route for comments  --> in blog route
// 3. craete a form in blog view


// deployment using .... AWS
// hamari local machine me 8000 available tha to hum us par run kar rahe the
// but aws pe te bahut sare log deploy karte to hum khud se jo hai port choose nai kar sakte

//  *****      what are environment variables --> these are dynamic variables
// eg console.log ("my name is :", process.env.myname);
// in terminal you type : export myname=waseem
// npm start
// my name is waseem (will be printed in terminal)   ******

// here cloud provider will give us a port & we have to use PORT environment variable

// actual start of deployment
// create

// const PORT = process.env.PORT || 8000;
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("mongodb is connected!");
//   })
//   .catch((err) => {
//     console.log("error occurred", err);
//   });

// set MONGO_URL=mongodb://127.0.0.1:27017/blog ---> this is a window command


// main change  .....  replace index.js name by app.js (vvvvv imp)

    // "start": " node You-Tube-Blog app.js"  changed to  "main": "You-Tube-Blog/app.js", "start": "node You-Tube-Blog/app.js"

//  npm i dotenv

// didnt work go to word there it is saved
// mongodump --uri="mongodb+srv://waseemakram8660:waseemakram123@cluster0.0abtug8.mongodb.net/blog" --out=./blog_database_dump


// restore on mongodb atlas command
// mongorestore --uri="mongodb+srv://waseemakram8660:waseemakram123@cluster0.0abtug8.mongodb.net" ./blog_database_dump