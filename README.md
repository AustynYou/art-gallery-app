# Art Gallery - Social Media App

<br />
<br />
<br />

## Implemented features
<ol>
  <li>
    <strong>Sign up feature:</strong> If user_name from client does not exist in the DB, a Password-Hashing is performed by <strong>Bcrypt</strong>. And the hashedPW and salt are stored in the DB along with user information.
  </li>
  <li>
    <strong>Login system:</strong> Set the http method of the login api to POST to safely send the login form to the server. And hash password from client using <strong>Bcrypt</strong> again to check if it matches the hashed password in the DB. If they match, put the userId in the payload and issue a token using <strong>JWT</strong> Library, and send the token to the client. (expiresIn is 1d.) 
    <ol>
      <li><strong>In the Login component:</strong> the token is included in headers of instance, so that the token in the instance can be used to get the userId when using the api request after login. Stored the token in <strong>localStorage</strong> to keep the logged in state.</li>
      <li><strong>In the App component:</strong> If there is a token stored in localStorage, App retrieved the token and put the token in the header of the instance. This kept user logged in no matter which page refreshed.</li>
      <li><strong>Login check:</strong> By setting loginCheck component as the <strong>parent &lt;Route /&gt;</strong> of pages that require login, duplication of codes for loginCheck was prevented. Pages that require login can be rendered via <strong>&lt;Outlet /&gt;</strong> in loginCheck component.</li>
      <li><strong>State management:</strong> All components share the global loginStatus by managing with <strong>Recoil</strong>.</li>
    </ol>
  </li>
  <li>
    <strong>Rendered posts on the main page using getPostsMain API function:</strong> Made a <strong>SQL Query</strong>  to fetch 30 posts from the post table. Using <strong>JOIN</strong>, user and image related to each post were brought. Considering the case where there are multiple images per post, <strong>GROUP_CONCAT</strong> the url from the image table and used the <strong>split(”,”)</strong> method to create an array. Then the processed data is sent to the client.
  </li>
  <li>
    <strong>Multi-image posting feature:</strong> By using <strong>useRef</strong>, &lt;input type=“file” /&gt; tag can be clicked indirectly.
    <ol>
      <li><strong>Images preview feature using FileReader:</strong> By using <strong>readAsDataURL()</strong> method of <strong>FileReader</strong> object, let be able to convert from image file to data URL format. After the read operation is complete, FileReader <strong>result</strong> property becomes valid as a dataURL. And implemented image preview with dataURL, using <strong>useState</strong> to manage the state of the file and dataURL.</li>
      <li><strong>Constructed form fields and their values using FormData:</strong> Each file was sent to the server <strong>in parallel</strong> using <strong>Promise.all()</strong> when calling uploadImage API function. In the uploadImage API function, the file data was processed into form data using the FormData object because the file must be sent in form data format to be received by the server.</li>
      <li><strong>Uploaded images file to S3 and passed AWS S3 URL to the client:</strong> In the <strong>middleware</strong> of the imageUpload Router(), <strong>multer</strong> uploaded files one by one to the <strong>Bucket</strong> of <strong>S3</strong>. And the controller received the return of the middleware, sent the AWS S3 URL from req.file.location to the client.</li>
    </ol>
  </li>
  <li>
    <strong>Created carousel post:</strong> When the width of the browser <strong>resize</strong>d, found out the current width of the container using <strong>useRef</strong> and <strong>getComputedStyle()</strong>. Managed the width state with useState. Whenever the containerWidth or activeIndex changes, the ImageList component moved its position using css <strong>transform</strong>, and styled overflow:hidden to the container.
  </li>
</ol>

<br />
<br />
<br />

## Configuration
### Backend app.js configration:

1. express() was put into app which is variable and allowed to be executed. 

2. cors: In order to prevent CORS errors which happens when the front and backend domains are different, Set up CORS like this: app.use(cors([“[http://localhost:3000](http://localhost:3000/)"]))

3. logger from morgan: When an error occurred or a request came from the client, the log was recorded on the terminal.

4. If node is used without nodemon, I have to turn the server off and on every time modifying the code to work properly. This job is a nuisance. So I used nodemon to automatically restart the server whenever the code is saved. It should be only used for development, so I put it in Dev Dependencies.

### Connection between Backend and MySQL Database:

1. Node and mysql were connected by passing host, user, password, and database to mysql.createConnection().

2. Host, user, password, and database should not be exposed on the code, so they are stored in the environment variable file using dotenv.

### Connection between Backend and AWS S3:
 <ol>
    <li>
      Using access key, secret key to connect to AWS S3 service. The access key and secret key should not be exposed  on the code, so dotenv is used to store them in the environment variable file.
    </li>
    <li>
      <strong>Set the config settings of multerS3:</strong> 
      <ol>
        <li><strong>acl: "public-read"</strong> means file access permission, set to read-only as public.</li>
        <li><strong>metaData:</strong> file which is field of the form</li>
        <li><strong>key:</strong> file name in Bucket of S3
          <ol>
            <li><strong>Date.new().toString()</strong> was used to prevent file names from overlapping.</li>
            <li><strong>file.originalname</strong> was used to specify the extension name.</li>
          </ol>
      </ol>
    </li>
  </ol>

<br />
<br />
<br />


## Room for Improvement 

1. If post APIs using a path variable are created and if there is global state management system for posts, edit and delete post features can be more easily added.
2. If access token and refresh token were used, it would be possible to have a more secure security system.
3. It is too easy to manipulate to determine whether users have logged in or not by whether there is a token in localStorage. To make a long story short, this is not enough to be more secure. Whether this token is valid should be verified. This verification can be done by the server because only the server knows the secretKey
4. LogoutCheck component as well as LoginCheck component could be created. When Logout check component keeps track on it, if logged users come to the /login or /signup, it can kick them out.