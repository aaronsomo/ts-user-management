import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    dob: Joi.date()
})

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body)
    if (!error) {
        next()
    } else {
        res.status(400).send(error)
    }
}

export const validateUserById = (req: Request, res: Response, next: NextFunction) => {
    const numberSchema = Joi.number()
    const { error, value } = numberSchema.validate(req.params.id)
    if (!error) {
        next()
    } else {
        res.status(400).send(error)
    }
}