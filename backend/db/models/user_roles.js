const mongoose = require("mongoose");
const Roles = require("./roles");
const Users = require("./users");

const schema = mongoose.Schema({
    role_id: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: Roles },
    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: Users }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class UserRoles extends mongoose.Model {

}

schema.loadClass(UserRoles);
module.exports = mongoose.model("user_roles", schema);