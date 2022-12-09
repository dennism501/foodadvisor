const Auth0Strategy = require('passport-auth0').Strategy;

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '37cb4377c425a87b76e93e0435073b73'),
    providers: [
      {
        uid: "auth0",
        displayName: "auth0",
        icon: "https://www.okta.com/sites/default/files/Okta_Logo_BrightBlue_Medium-thumbnail.png",
        createStrategy: (strapi) =>
          new Auth0Strategy(
            {
              clientID: env("AUTH0_CLIENT_ID"),
              clientSecret: env("AUTH0_CLIENT_SECRET"),
              domain: env("AUTH0_DOMAIN"),
              passReqToCallback: true,
              state: true,
              callbackURL: 
                strapi.admin.services.passport.getStrategyCallbackURL("auth0"),
              scope: ["openid", "email", "profile"],
            },
            (req, accessToken, refreshToken, extraParams, profile, done) => {
              console.log(req, profile)
              return done(null, {
                email: profile.displayName,
                username: profile.nickname,
               });
            }
          ),
      },
    ],
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'KDUVlMFUyDvfN2JnQ/n4wg=='),
  },
});
