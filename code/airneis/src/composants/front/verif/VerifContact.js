import Joi from "joi";

export const commandeVerif = Joi.object({
     nom : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^</,?;.:!§$£€&%*µ¤1234567890>]*$/)
          .required()
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ nom ne peut pas contenir de caractères spéciaux ou de chiffres"
          }),

     email : Joi.string()
          .min(4)
          .max(255)
          .email({ tlds: { allow: false } })
          .required()
          .messages({
               "string.min" : "le champ email doit contenir au minimum 4 lettres",
               "string.email" : "le format de l'email n'est pas valide"
          }),

     message : Joi.string()
          .min(4)
          .max(1000)
          .regex(/^[^</;*µ¤>]*$/)
          .required()
          .messages({
               "string.pattern.base" : "le champ message ne peut pas contenir de caractères spéciaux"
          })
})