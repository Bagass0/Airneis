import Joi from "joi";

export const verifFacturation = Joi.object({
     nomFacturation : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ nom doit contenir au minimum 1 lettre",
               "string.max" : "le champ nom ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ nom ne peut contenir de caractères spéciaux",
          }),

     prenomFacturation : Joi.string()
          .min(1)
          .max(22)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ prénom doit contenir au minimum 1 lettre",
               "string.max" : "le champ prénom ne peut contenir au maximum que 20 lettres",
               "string.pattern.base" : "le champ prénom ne peut contenir de caractères spéciaux",
          }),

     adresseFacturation : Joi.string()
          .min(1)
          .max(102)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ adresse doit contenir au minimum 1 lettre",
               "string.max" : "le champ adresse ne peut contenir au maximum que 100 lettres",
               "string.pattern.base" : "le champ adresse ne peut contenir de caractères spéciaux",
          }),

     codePostalFacturation: Joi.string()
          .min(1)
          .max(7)
          .regex(/^[^<>?:!;,/§$£€azertyuiopqsdfghjklmwxcvbn]*$/)
          .messages({
            "string.min": "Le champ code postal doit contenir au minimum 1 chiffre",
            "string.max": "Le champ code postal ne peut contenir au maximum que 5 chiffres",
            "string.pattern.base": "Le champ code postal ne peut contenir que des chiffres",
          }),

     villeFacturation : Joi.string()
          .min(1)
          .max(52)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ ville doit contenir au minimum 1 lettre",
               "string.max" : "le champ ville ne peut contenir au maximum que 50 lettres",
               "string.pattern.base" : "le champ ville ne peut contenir de caractères spéciaux",
          }),
     
     paysFacturation : Joi.string()
          .min(1)
          .max(52)
          .regex(/^[^<>?:!;,/§$£€]*$/)
          .messages({
               "string.min" : "le champ pays doit contenir au minimum 1 lettre",
               "string.max" : "le champ pays ne peut contenir au maximum que 50 lettres",
               "string.pattern.base" : "le champ pays ne peut contenir de caractères spéciaux",
          }),
        
})