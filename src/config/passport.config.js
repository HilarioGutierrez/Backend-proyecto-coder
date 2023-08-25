import passport from "passport";
import GitHubStrategy from "passport-github2";
import userManager from "../domain/manager/userManager.js";
import dotenv from "dotenv";
dotenv.config();


//const LocalStrategy = local.Strategy;

const manager = new userManager();



    //const register = new LocalStrategy({
    //     passReqToCallback: true, // permite acceder a req en cualquier otro middleware
    //     usernameField: 'email', //se cambio el valor por defecto de username por email
    // }, async (req, username, password, done) => {
    //     try {
            
    //         let user = await manager.getOneByEmail(username);
            
    //         if(user.id) {
    //             return done(null, false, {message: 'User already exists'}) // el primer argumento (null) es el error, el segundo significa que no se encontro el usuario.
    //         }
    
    //         const dto = {
    //             ...req.body,
    //             password: await createHash(req.body.password)
    //         }
    
    //         let result = await manager.create(dto);
    //         return done(null, result);//el primer argumento (null) es el error, el segundo es el resultado
    
    //     } catch (e) {
    //         return done('Error in register: '+e)
    //     }
    // }
    // );
    
    // const login2 = new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameField: 'email',
    // }, async (req, username, password, done) => {
    //     try {
    //         let user = await manager.getOneByEmail(username);
    
    //         if(!user.id) {
    //             return done(null, false, {message: 'User not found'});
    //         }
    //         if(!await isValidPassword(password, user.password)) return done(null, false, {message: 'Wrong password'});
    //         return done(null, user);
    
    //     } catch (e) {
    //         done(e)
    //     }
    // });
    
    // const initializePassport = () => {
    //     passport.use('register', register);
    //     passport.use('login2', login2);
    
    //     passport.serializeUser((user, done) => {
    //         done(null, user.id);
    //     });
    
    //     passport.deserializeUser(async (id, done) => {
    //         try {
    //             let user = await manager.getOne(id);
    //             done(null, user);
    //         } catch (e) {
    //             done(e)
    //         }
    
    //     });
    // };


const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = process.env; //Creo variables de entorno para guardar secretos

const credentials = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
}

const github = new GitHubStrategy(credentials, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        let user = await manager.getOneByEmail(profile._json.email); //busco x email si el usuario ya existe con el email de github
        
        if(user.id) {
            return done(null, user); //done es el callback de passport. 1° argumento es el error (al ser null no hay error). 2° argumento es el resultado
        }

        const dto = {
            firstName: profile._json.name,
            email: profile._json.email,
        }

        let result = await manager.create(dto);
        return done(null, result);

    } catch (e) {
        done('Error al obtener el usuario: ' + e);
    }
});

const initializePassport = () => {
    passport.use('github', github);

    passport.serializeUser((user, done)=> {
    done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const manager = new UserManager();
        let user = await manager.getOne(id);
        done(null, user);
    });
};

export default initializePassport;