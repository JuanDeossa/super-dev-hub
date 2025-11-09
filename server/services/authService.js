// Servicio de autenticación para Google
import { User } from "../models/User.js";

export const googleAuthService = {
  async findOrCreateUser(profile) {
    // Buscar usuario por googleId
    const userExistsWithGoogleId = await User.findOne({
      where: { googleId: profile.id },
    });

    if (!userExistsWithGoogleId) {
      // Buscar usuario por email
      const userExistsWithEmail = await User.findOne({
        where: { email: profile.emails[0].value },
      });

      // Si existe un usuario con el mismo email y es de tipo manual/local
      if (
        userExistsWithEmail &&
        userExistsWithEmail.provider !== "google"
      ) {
        userExistsWithEmail.provider = "google";
        userExistsWithEmail.password = null;
        userExistsWithEmail.googleId = profile.id;
        userExistsWithEmail.avatar = profile.photos[0]?.value;
        await userExistsWithEmail.save();
        return userExistsWithEmail;
      } else {
        // Si no existe, crear usuario nuevo con rol guest y provider google
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          provider: "google",
          role: "guest",
        });
        return newUser;
      }
    } else {
      return userExistsWithGoogleId;
    }
  },
};
