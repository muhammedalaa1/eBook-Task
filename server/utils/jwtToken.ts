import jwt, { verify } from "jsonwebtoken";
import User, { IUser } from "../model/user";

export const createToken = (user) => {
	const token = jwt.sign(
		{
			userId: user.id,
		},
		process.env.ACCESS_TOKEN_SECRET
	);
	return token;
};

export const findUserByToken = async (token: string) => {
	try {
		if (!token) throw "";
		const result = verify(token, process.env.ACCESS_TOKEN_SECRET) as any;
		const user = await User.findById(result.userId);
		return user;
	} catch (error) {}
};
