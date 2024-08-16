const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZ5aHdNNU9hK1JHMTlXbnBWbmE4QURnTnR3RWN4QVFGaCtsWTcvYU9YQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0VMRkRwYWFxc3hacUhweUo4blcrTFhCdXQ4U2ZKUXdtSTQwazNLRDdGVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDT280cUlIaGhLTjN2aCthQy9mcDR5UmRtakd1cnF6VUJuL0NXLzJqSDBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHbUFWOXErU1NEZmZrbnh1SjBVeXUrT0NleWNEQm9EWjJHQ0ZBbUQzWVR3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9BbWxMdmlHOHJJZW9helppSm5OTDJ3MjNqM0d5N2J2OURlMGxkMlo1a0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9GaTRZYmo3MEpXOHZHRkc5RU15aHlJc3drRjdnNGhHSXJOU1FMZ2RlaUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5YOGZPa3ZlQzZ6KzFBWHlMMTJpcGdqRVM2VmRTSHpMdFJuTjJnNzQzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXIvVEF2UVpGSmlCTkpqa1hnOGF1T1pyVWNzUU5tKzJMVlR2Smxad2xTdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZKUnRHVFExVUhvUS9LbVYzRllhZ1lWTDJrWUFTMmxIdFU0ZmMxOElIMTZ6djJBUHpRcXJteWlIMjRSZ1NRakJ5QkFqZ1FKeis3c24ycTEwV2hvTEN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJIa2tQVWpqVDdzSVRObzdXTElCdGhPYWgxQVdGMVpkb1lQcW5RWXhLNkZVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsbUpweEFMRVJnYW5zbWJMUThscDBBIiwicGhvbmVJZCI6IjM0YTgwYTY2LTZhM2YtNDVhMy1iZGY0LTBlOTI0OWNmOTU4ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpMkhLek5Gc1NTSEUvVUt4WlRKRlo3S2o0Wms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnZJek0zUEcyTXhWUnBLQk41M1hwS0ZydTM4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ1TTdXMkVQIiwibWUiOnsiaWQiOiIyNTQ3NDM5ODIyMDY6NzdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoifmBgYEJFUkEgVEVDSGBgYH4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qeDlOb0dFSnJVL2JVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRPcVVvc3MwUjZWeUpFOWtNSWM2ZzBrV3duUkhGaHp3RUR3akZMZU9weEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InFjVjVpbjBweTJURU1XemljTS9waUEyVU1vdCs2ci9RcnhSN2hXM0lUamRHTU1Eendrb3RTSmpDd2xGZEwwVTcrUjJteTFNb2FYOFk4K0hjZ3lOWUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtSmVlMk9xbTNTQmgzRXFCUDJONHU4NlZrQy9rRHFYc1EwVU5qU2ZmRDV1a0JuZzBQczN0ZmwzSFdMWTJyR2p1TDRrcFB1K1pnTUlPaFFEL3VqbDVEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0Mzk4MjIwNjo3N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVHFsS0xMTkVlbGNpUlBaRENIT29OSkZzSjBSeFljOEJBOEl4UzNqcWNRIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzODIwNTgzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxjbiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BRUCE BERA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254743982206",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝑩𝑼𝑮𝑨𝑻𝑻𝑰',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/c425b0fd9ec4ab130c8f9.jpg.https://telegra.ph/file/0d3b89f01e8fccb260b45.jpg.https://telegra.ph/file/abc304e66c2a3e8b2a557.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
                  
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
