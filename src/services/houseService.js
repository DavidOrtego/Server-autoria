const { db } = require("../config/database");

const findAllHouses = async (user) => {
    let query = db("Houses").select(
        "id_house",
        "name",
        "address",
        "number_of_rooms",
        "level"
    );

    if (user.rol !== 'admin') {
        query = query.whereIn('id_house', function() {
            this.select('id_house').from('HouseMembers').where('id_user', user.id);
        });
    }

    return await query;
}

const findHouseById = async (houseId, user) => {
    let query = db("Houses")
        .select(
            "id_house",
            "name",
            "address",
            "number_of_rooms",
            "level"
        )
        .where({ id_house: houseId });

    if (user.rol !== 'admin') {
        query = query.whereIn('id_house', function() {
            this.select('id_house').from('HouseMembers').where('id_user', user.id);
        });
    }

    const house = await query.first();

    if (!house) {
        throw { status: 404, message: "House not found or unauthorized access" };
    }

    return house;
}

const createHouse = async (houseData, userId) => {
    return await db.transaction(async (trx) => {
        const existingHouse = await trx("Houses")
            .where({ name: houseData.name })
            .first();
        
        if (existingHouse) {
            throw { status: 400, message: "The house already exists" };
        }

        const [newId] = await trx("Houses").insert(houseData);

        // Añadir automáticamente al creador como miembro de la casa
        await trx("HouseMembers").insert({
            id_house: newId,
            id_user: userId
        });

        return newId;
    });
}

const updateHouse = async (houseId, newHouseData, user) => {
    // Verificar si existe y tiene acceso
    await findHouseById(houseId, user);

    const updateData = {};
    if (newHouseData.name) updateData.name = newHouseData.name;
    if (newHouseData.address) updateData.address = newHouseData.address;
    if (newHouseData.number_of_rooms) updateData.number_of_rooms = newHouseData.number_of_rooms;
    if (newHouseData.level) updateData.level = newHouseData.level;

    if (Object.keys(updateData).length > 0) {
        await db("Houses").where({ id_house: houseId }).update(updateData);
    }
}

const deleteHouse = async (houseId, user) => {
    // Verificar si existe y tiene acceso
    await findHouseById(houseId, user);
    
    // 1. Comprobar si hay más de un miembro en la casa
    const membersCount = await db("HouseMembers").where({ id_house: houseId }).count('* as total').first();
    if (membersCount.total > 1) {
        throw {
            status: 409,
            message: "Cannot delete the house because there are still other members in it. Please remove them first or leave the house."
        };
    }

    // Procedemos a borrar todo lo asociado a la casa en una transacción
    return await db.transaction(async (trx) => {
        // Borrar tareas asociadas
        await trx("Tasks").where({ id_house: houseId }).del();
        
        // Borrar gastos asociados
        await trx("Expenses").where({ id_house: houseId }).del();
        
        // Borrar miembros (en este punto solo debería quedar uno, el que lo borra)
        await trx("HouseMembers").where({ id_house: houseId }).del();
        
        // Finalmente borrar la casa
        const deletedCount = await trx("Houses").where({ id_house: houseId }).del();
        return deletedCount;
    });
}

module.exports = {
    findAllHouses,
    findHouseById,
    createHouse,
    updateHouse,
    deleteHouse,
}