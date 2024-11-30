const Pet = require('../model/Pet');

module.exports = {
    async inserir(req, res) {
        try {
            const { nome, raca, idade } = req.body;

            const petExistente = await Pet.findOne({ nome });

            if (petExistente) {
                console.log(`Pet já existe: ${petExistente.nome}.`);
                return res.status(200).json(petExistente);
            }

            const pet = await Pet.create({ nome, raca, idade });

            console.log(`Pet criado: ${pet.nome}.`);
            return res.status(201).json(pet);
        } catch (error) {
            console.error(`Erro ao inserir pet: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    },

    async buscar(req, res) {
        try {
            const { nome, raca } = req.query;
            let pets = [];

            if (nome) {
                pets = await Pet.find({ nome });
            } else if (raca) {
                pets = await Pet.find({ raca });
            } else {
                pets = await Pet.find();
            }

            return res.status(200).json(pets);
        } catch (error) {
            console.error(`Erro ao buscar pets: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    },
};
