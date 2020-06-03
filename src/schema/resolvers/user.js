const { v4: uuidv4 } = require('uuid');

export default {
    Query: {
        users: (parent, args, context, info) => context.models.user.findAll(),
        user: (parent, args, context, info) => context.models.user.findByPk(args.id)
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            await console.log(context.models.user)
            await console.log(args.input) // por alguna razon no tiene datos aunque le pase todo un inputUser

            var saltValue = context.models.user.getRandomSalt()
            return context.models.user.create({
                id: uuidv4(),
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                username: args.input.username,
                salt : saltValue,
                password : context.models.user.encryptPassword(args.input.password, saltValue)
            })
            //context.models.user.upsert
        }
    }

}