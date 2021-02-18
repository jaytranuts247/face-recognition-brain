import React from "react";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		};
	}

	SigninOnKeyPressed = (target, event) => {
		if (event.key === "Enter") {
			switch (target) {
				case "email":
					this.password.focus();
					break;
				case "password":
					this.signin.click();
					break;
				default:
					this.email.focus();
					break;
			}
		}
	};
	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSubmitSignIn = (event) => {
		/*
		The problem is the <form> tag in the register and the signin component.

		The last button in a form fires a submit event as a get request if nothing else is set via the method attribute, which forces the browser to reload the entire page.

		You can prevent the default behavior by using event.preventDefault() inside of your onSubmitSignin function.
		*/

		event.preventDefault();

		fetch("https://smart-brain-api-2020.herokuapp.com/signin", {
			method: "post",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin":
					"https://smart-brain-api-2020.herokuapp.com/signin",
			},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
	};

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f4 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
									ref={(input) => {
										this.email = input;
									}}
									onKeyUp={this.SigninOnKeyPressed.bind(this, "email")}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
									ref={(input) => {
										this.password = input;
									}}
									onKeyUp={this.SigninOnKeyPressed.bind(this, "password")}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								onKeyDown={(e) => this.SigninOnKeyDown(e)}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Sign in"
								ref={(input) => {
									this.signin = input;
								}}
								onKeyUp={this.SigninOnKeyPressed.bind(this, "signin")}
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => onRouteChange("register")}
								className="f5 link dim black db pointer"
							>
								Register
							</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Signin;
