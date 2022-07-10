const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    is_public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Migrate note Models to `TypeScript
// interface noteSchema {
//   user: string;
//   text: string;
//   is_public: string;
// }

// const schema =
//   new Schema() <
//   noteSchema >
//   {
//     name: { type:  mongoose.Schema.Types.ObjectId, required: true,  ref: 'User' },
//     text: { type: String,  required: [true, 'Please add a text value'] },
//     is_public: {type: Boolean, default: false},
//   };

module.exports = mongoose.model('Note', noteSchema);
