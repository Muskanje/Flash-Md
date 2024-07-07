const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV010dTFmeTU1U1A2cmNub09xK3YyMUp6UWNGcmUvNEtXZ2c5dFFKLzlHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmFBVWkvR2o2a3VGbUgyNTlEcmhac2dkZVRFeUtHMitxbHBTV2V0eDZ4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSHNUcjhaSVM1bnhWSld3SGdTV2VOOEk3cGJjU21ERU16SUJ4cDZ2bG00PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1ZVhTNDNXdXc0YmloSkI0SnY3anZzaElZdkh0YUFnbjkra2QyN0pjQkJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVDOFVtNy8yL05HcVdRU0t3WU1rckdCR1JQWjg1NnlTK2lpZnBQWjEwVjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA3MlR6dG45TVBlUTZIOHVROXBzSTh1WVU4N29RQ2c4MjRIN2VVL3pNUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV00wdkpzdk1vaEFlWnRiWHBlL1YwT3djTkNFcXVaNitJNVROMnc3VFZrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0hUc1RKN1d1cXdzV2lKTHM1TmR4L2lzRjlaZFp5NWw2UkgwVFhWTXhHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRhbVJKQnE1WHFmNktOajlPdmgrNm1ycTNVdDgrRUx0TzI4bVhjVllxZkI0RW9BQXVwWGhzR0d4eEpYWXptQ1hTbjh1MzRLR0RTT3h4NkpCL1paaERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6Ikl1NXdDRnN6VXB0MUFFeXZQV29sbjRPOTZMb2h5KzBzL1JlTXRJNllNWUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTEyNjU3NzA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJBMzNGQkMyRUNDMzNCOUQ0QTJBRkYyNDA3MUU0NjVGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjAzNzg1Mjl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzExMjY1NzcwNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUNBNkU3QzM4MzNEQzUzQzU2OTlFODQzRTdGQ0E2NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwMzc4NTI5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBeDBmaFdQblFTLTBscG9kUHRBQ0JRIiwicGhvbmVJZCI6ImYzODhjYjE1LTkwYTAtNDgyOC1iYzZmLWYyODUzYTA3NDAwMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJdGIxcXIvV1ZlV2V0TWhHdGY0S09qTldTZzg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmI4QU5SUVBZWE1tbnFoT2xvbys0dXBVSGZRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilo5UFhGQ1NHIiwibWUiOnsiaWQiOiI5MjMxMTI2NTc3MDU6MjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01Idmxzd0RFSkRKcTdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZJUUg3QktYT3MyYnl0R2NpMUQ2Y3IyclI3SXA2ejE5eXMvU2dsRTJheGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6InA4cW80cUtUeE9wY3lHNzYwamRVTjhzZmI2VmJTSnJNNkNQaFFFL3NVOUsrdHhEQ2pDVzdqTEJ6SVh6d0NLT3F6eHR2bEM2RllMbExIY20yY0pRVERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDSDJMNVk1MFJKYmIwYWhTOFB5Vkc1VndYKzAyczk4eVp4Z05HUXV2UG1Fam84bTRlNFJ1TnVTVXY5NTdTOHhDY3hBU0s1NG1YUlpRUExpZHBqZ2RDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzExMjY1NzcwNToyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWU0VCK3dTbHpyTm04clJuSXRRK25LOXEwZXlLZXM5ZmNyUDBvSlJObXNaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMzc4NTI0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBIZiJ9',
    PREFIXE: process.env.PREFIX || ".+",
    OWNER_NAME: process.env.OWNER_NAME || "Faisal💔udas",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923112657705",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Faisal udas-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e5e7eae89bee6a62c62ea.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
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
