# Forget Password Task 

**Features**
1. Signin
2. Login
3. Forget Password
4. Verify OTP

# Endpoints:-

**URI : https://user-authentication-00wq.onrender.com**

1. signin:

# POST : /api/user/signin

Request body:

{<br>
"email":"email" <br>
"password":"password"<br>
}

2. Login:

# POST : /api/user/login

Request body:

{<br>
"email":"email" <br>
"password":"password"<br>
}

3. Forget Password:

# POST : /api/user/forgot-password

Request body:

{<br>
  "email":"email" <br>
}

After submit, code 8-Digit One Time Password will be sent to Your email address

4.Verify OTP:

# POST : /api/user/verify-code

Enter the *-Digit One Time Password in body<br>
if OTP verified, password will be Changed.

Request body: 

{<br>
"verificationCode":"Enter 8-Digit code",<br>
"email":"email" *for User verification*,<br>
"newPassword":"newPassword"<br>
}

