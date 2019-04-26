'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator');

class AuthController {
    async register({ request, auth, response}){
        try {
            const rules = {
                username: 'required|string',
                email: 'required|email',
                password: 'required|string',
                confirm_password: 'required|string'
            };
        
            const validation = await validate(request.all(), rules);
        
            if(validation.fails()){
                return response
                .status(400)
                .json({ status: 0, message: validation.messages() });
            }
        
            const username = request.input("username");
            const email = request.input("email");
            const password = request.input("password");
            const confirm_password = request.input("confirm_password");
            if(password !== confirm_password)
                return response
                .status(400)
                .json({ status: 0, message: "password not match"});
        
                let user = new User();
                user.username = username;
                user.email = email;
                user.password = password;
        
                await user.save();
        
                let accessToken = await auth.withRefreshToken().generate(user);
                return response.json({
                    user: user,
                    access_token: accessToken
                });
        } catch (error) {
            console.log(error)
            response.status(400).json({'message': 'Something wrong'})
        }
    
}
    async login({request, auth, response}){
        const rules = {
            email: "required|email",
            password: "required|string"
        };

        const validation = await  validate(request.all(), rules);

        if (validation.fails()){
            return response
            .status(400)
            .json({ status: 0, message: validation.messages() });
        }

        const email= request.input("email");
        const password = request.input("password");

        
            if(await auth.attempt(email, password)){
                let user = await User.findBy("email", email);
                let accessToken = await auth.withRefreshToken().generate(user);

                return response.json({ user: user, access_token: accessToken });
            }
        
    }

    async generateRefreshToken({ request, auth, response }){
        const rules = {
            refresh_token: "required|string"
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails()){
            return response
            .status(400)
            .json({ status: 0, message: validation.messages() });
        }
        const refreshToken = request.input("refresh_token");
        const access_token = await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken);
        return response.send({ status: 1, access_token});
    }

    async getData({ response, auth}){
        return response.send({ status: 1, user: auth.current.user });
    }
}

module.exports = AuthController
