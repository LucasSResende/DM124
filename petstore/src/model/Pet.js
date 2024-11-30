const { Schema, model } = require('mongoose');

const PetSchema = new Schema(
    {
        nome: { type: String, required: true },
        raca: { type: String, required: true },
        idade: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= 0 && value <= 200;
                },
                message: (props) => `Idade inválida (${props.value}). Deve estar entre 0 e 200 anos.`,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Pet', PetSchema);
