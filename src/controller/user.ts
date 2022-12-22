import { Request, Response } from "express"
import dbhelpers from "../../database/dbhelpers"

const controller = {
    healthcheck: (req: Request, res: Response) => {
        res.status(200).send('health check is good')
    },

    postUser: (req: Request, res: Response) => {
        dbhelpers.postUser(req, (err: any, results: any) => {
            if (err) {
                console.log({err})
                res.status(400).send({error: 'email already exists'})
            } else {
                res.status(200).send(results)
            }
        })
    },

    getUserById: (req: Request, res: Response) => {
        dbhelpers.getUserById(req, (err: any, results: any) => {
            if (err) {
                console.log({err})
                res.status(400).send(results)
            } else {
                res.status(200).send(results)
            }
        })
    },

    deleteUserById: (req: Request, res: Response) => {
        dbhelpers.deleteUserById(req, (err: any, results: any) => {
            if (err) {
                console.log({err})
                res.status(400).send(results)
            } else {
                res.status(200).send(results)
            }
        })
    }
}

export default controller