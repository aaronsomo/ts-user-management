import db from './index'
import { Express, Request } from 'express';

const dbhelpers = {
    postUser: async (req: Request, callback: any) => {
        const standardizedDate = new Date(req.body.dob)
        const localDate = standardizedDate.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' })
        const existingUser = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`)
        if (existingUser.rows.length > 0) {
            callback('email already exists')
            return
        }

        db.query(
            `INSERT INTO users (name, email, dob) VALUES ('${req.body.name}', '${req.body.email}', '${localDate}') RETURNING *;`,
            (err, results) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            }
        );
    },

    getUserById: (req: Request, callback: any) => {
        console.log({PARAMS: req.params})
        db.query(
            `SELECT * FROM users WHERE id = ${req.params.id};`,
            (err, results) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, results)
                }
            }
        );
    },

    deleteUserById: (req: Request, callback: any) => {
        db.query(
            `DELETE FROM users WHERE id = ${req.params.id};`,
            (err, results) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, results)
                }
            }
        )
    }
};

export default dbhelpers