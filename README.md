# Forget Password Task 

**Features**
1. Signin
2. Login
3. Forget Password
4. Verify OTP

# Endpoints:-

<h3>URI : https://user-authentication-00wq.onrender.com</h3> 

**1.Signin:**

<h2>POST : https://user-authentication-00wq.onrender.com/api/user/signin</h2>

Request body:

{<br>
"email":"email" <br>
"password":"password"<br>
}

**2.Login:**

<h2>POST : https://user-authentication-00wq.onrender.com/api/user/login</h2>

Request body:

{<br>
"email":"email" <br>
"password":"password"<br>
}

**3.Forget Password:**

<h2>POST : https://user-authentication-00wq.onrender.com/api/user/forgot-password</h2>

Request body:

{<br>
  "email":"email" <br>
}

After submit, code 8-Digit One Time Password will be sent to Your email address

**4.Verify OTP:**

<h2>POST : https://user-authentication-00wq.onrender.com/api/user/verify-code</h2>

Enter the *-Digit One Time Password in body<br>
if OTP verified, password will be Changed.

Request body: 

{<br>
"verificationCode":"Enter 8-Digit code",<br>
"email":"email" *for User verification*,<br>
"newPassword":"newPassword"<br>
}

