### Requests

#### User Registeration
  
- **POST** - /api/project/
- **Description** -  Register a new user
- **Access** - Public
- **body** - firstname, lastname, username, gender, email, password, phone
  
#### User Login

- **POST** - /api/auth/login
- **Description** - Login Existing User
- **Access** - Public
- **Body** - email, password

#### Get Current User

- **GET** - /api/auth/
- **Description** - Check token from cookie, validates it using jwt then provides current logged in user
- **Access** - Private

#### Send Verification SMS

- **GET** - /api/user/verify/phone/
- **Description** - Sends OTP message to logged in user for phone number verification
- **Access** - Private

#### Verify Phone Number

- **POST** - /api/user/verify/phone
- **Description** - Validate verification code and verify user
- **Access** - Private
- **Body** - inputCode (entered by user), serverCode (got from above request)

#### Get User data

- **GET** - /api/user/:userid
- **Description** - Get User's data from their userid
- **Access** - Public
- **Params** - userid

#### Add Connection

- **POST** - /api/user/connection/add/:userid
- **Description** - Send connection request to User (Current user sends request to userid)
- **Access** - Private
- **Params** - userid

#### Accept Connection Request

- **POST** - /api/user/connection/accept/:userid
- **Description** - Accepts User friend Request (Current user accepts request of userid (if exists))
- **Access** - Private
- **Params** - userid

#### Reject Connection Request

- **POST** - /api/user/connection/reject/:userid
- **Description** - Rejects User friend Request (Current user rejects request of userid (if exists))
- **Access** - Private
- **Params** - userid

#### Add Project

- **POST** - /api/project/
- **Description** - Add new project (Current User adds a new Project)
- **Access** - Private
- **Body** - title, language, description ...

#### Get User's Projects

- **GET** - /api/project?user=id
- **Description** - Get user's project from their id 
- **Access** - Public
- **Query** - user - userid
