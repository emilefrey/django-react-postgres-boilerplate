import React, { useRef, useState } from 'react'
import { FormHelperText, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useStyles } from './styles'

export const ForgotPassword = () => {
	const emailInput = useRef<HTMLInputElement>(null);
	const [submitted, setSubmitted] = useState(false)
	const [feedback, setFeedback] = useState("Please enter the email associated with your user account.")
  const classes = useStyles();

	const submitEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (emailInput.current !== null) {
			axios.post(`/api/password_reset/`, { email: emailInput.current.value })
				.then((response: any) => {
					setSubmitted(true)
					if (response.status === 200) {
						setFeedback('Thank you! If an account is associated with the email you provided, you will receive an email with instructions to reset your password.');
					}
				})
				.catch((error: any) => setFeedback('Error! Be sure to enter a valid email address.')
				)
		}
	}


	return (
		submitted ? <div style={{color: 'black'}}>{feedback}</div> :
			<form onSubmit={submitEmail} className={classes.form} >
				<FormHelperText
          id="email-helper-text"
          className={classes.helper}
				>
					{feedback}
				</FormHelperText>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					inputRef={emailInput}
				/>
				<Button
					id="password-reset-submit-button"
					type="submit"
					fullWidth
					variant="contained"
          color="primary"
          className={classes.submit}
				>
					Submit
            </Button>
			</form>

	)
}