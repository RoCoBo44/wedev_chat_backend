export default {
  Query: {
    users: (parent, args, context, info) => context.models.user.findAll(),
    user: (parent, args, context, info) => context.models.user.findByPk(args.id),
    currentUser: (parent, args, context, info) => context.user
  },
  Mutation: {
    signup: async (parent, args, context, info) => {

      const user = await context.models.user.findByUsername(args.data.username)
      if (user) return { authError: 'user exist' }

      const newUser = await context.models.user.create(args.data)

      return { user: newUser, jwt: newUser.generateJWT(), authError: null }
    },
    signin: async (parent, args, context, info) => {

      const user = await context.models.user.findByUsername(args.data.username)

      if (!user) return { authError: 'user doesnt exists' }
      if (!user.passwordMatches(args.data.password)) return { authError: 'wrong password' }

      return { user: user, jwt: user.generateJWT(), authError: null }
    }
  }

}

