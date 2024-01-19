## Server Validated Password Checker

Hi! :wave: This small project is my solution to a prompt I was given from a prospective employer, to see my "engineering talents in action". It was a fun project, and demonstrates where/how my time is focused to complete a project in a short amount of time. The prompt (in the [Problem Statement](#problem-statement) section of this README) was provided by the prospective employer, the rest is me! :beers:

## Problem Statement

> After providing their email, customers will be asked to create a password. Let's build a form that helps them choose a good one providing real-time feedback.
>
> - Identify additional requirements and justify choices
> - The solution will go to production, make sure you cover all your bases
> - Perform the validation on the backend
> - Use whatever technology or framework you're most comfortable with
> - Use any packages you'd like for support but the core interactions should be your own
> - Requirements change, be prepared

## Assumptions

Given the problem statement, we will assume the following:

1. The user has entered a valid email address, which cannot be modified.
1. All validation of the password is performed in the server (no client-side validation).
1. We will use HTTPS in production which will encrypt the data during the transmission from client to server.
1. Grace will be given for the styling and CSS organization :).

## Additional Requirements

1. The form should display the user's email address, which should be greyed out and have a green checkmark next to it, indicating that this step is complete.

1. The form should be centered on the page.

1. The form should provide real-time feedback to help users choose a good password.

1. All password validation should be performed on the server-side. As much as we cherish Randall Munroe's [password strength](https://xkcd.com/936/) comic, modern validation criteria is [more secure](https://www.unix-ninja.com/p/your_xkcd_passwords_are_pwned), easier to come up with, and is what common random password generators often provide. For these reasons, we will use the following criteria.

   1. The password contains at least one lowercase letter.
   1. The password contains at least one uppercase letter.
   1. The password contains at least one number.
   1. The password contains at least one special character.
   1. The password has a minimum length of 8 characters.

1. When the password does not meet these criteria, the server should respond with a status of 400 and a message indicating the validation errors.

1. If the password meets these criteria, the server should respond with a message indicating that the password is valid.

1. As the user types their password, both met and unmet criteria will be displayed and updated in real time. Met criteria will be displayed in green with a greencheckmark to it's left, unmet criteria will be displayed in red with a red x to its left.

1. When the password is invalid, the Submit button will be grey, and the form will be disabled. Likewise, a valid password will enable the Submission of the form (and color the Submit button green)

1. Submitting the form:

   1. sends the email address and password to the server
   1. Server performs a lookup of the User ID using the email address
   1. Server salts and hashes the password and (pretends to) store the User ID/hash pair

1. Form submission responds with 200 on success, 500 is something went wrong.

1. On successful submission, a success message is displayed to the user in place of the form.

1. If there is an unsuccessful submission, a meaningful error message is dispayed to the user. (_This is only partially handled in the client at this time_).

1. The solution should be production-ready, covering all bases including error handling, edge cases, and security considerations.

1. The solution should be prepared for changing requirements, implying a need for flexible and maintainable code.

## Running the client and server (local development only)

### Server:

```bash
$ cd path/to/repo/server
$ npm install
$ npm start

> server@1.0.0 start
> node server.js

Server is running on port 3000...
...
```

### Client:

```bash
cd path/to/repo/client
npm install
npm start
> start
> webpack-dev-server --mode development --open --hot

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
...
```

Your default browser should open the webapp for you.

## Testing

### Server:

```bash
$ cd path/to/repo/server
$ npm test
```

### Client:

```bash
$ cd path/to/repo/client
$ npm test
```
