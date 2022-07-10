const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);



// Migrate User Models to `TypeScript
// interface userSchema {
//   name: string;
//   email: string;
//   password: string;
// }

// const schema =
//   new Schema() <
//   userSchemar >
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password:  { type: String}
//   };

module.exports = mongoose.model('User', userSchema);
