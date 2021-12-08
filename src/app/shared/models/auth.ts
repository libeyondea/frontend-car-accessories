export class SigninUser {
	user_name?: string;
	password?: string;
}

export class SignupUser {
	first_name?: string;
	last_name?: string;
	user_name?: string;
	email?: string;
	password?: string;
	phone_number?: string;
	address?: string;
	gender?: string = 'male';
}
