const { db } = require("../config/database");

const findAllHouses = async (user) => {
    let query = db("Houses").select(
        "id_house",
        "name",
        "address",
        "number_of_rooms",
        "image",
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
            "image",
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
        throw { status: 404, message: "Casa no encontrada o sin acceso" };
    }

    return house;
}

const createHouse = async (houseData, userId) => {
    return await db.transaction(async (trx) => {
        const existingHouse = await trx("Houses")
            .where({ name: houseData.name })
            .first();
        
        if (existingHouse) {
            throw { status: 400, message: "La casa ya existe" };
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
    if (newHouseData.image) updateData.image = newHouseData.image;
    if (newHouseData.level) updateData.level = newHouseData.level;

    if (Object.keys(updateData).length > 0) {
        await db("Houses").where({ id_house: houseId }).update(updateData);
    }
}

const deleteHouse = async (houseId, user) => {
    // Verificar si existe y tiene acceso (en este caso delete suele ser admin, pero lo protegemos)
    await findHouseById(houseId, user);
    // Funciones de integridad de borrado
    // Comprobar si hay tareas en esta casa
    const tasksCount = await db("Tasks").where({ id_house: houseId }).count('* as total').first();
    
    const deletedCount = await db("Houses").where({ id_house: houseId }).del();
    return deletedCount;
}

module.exports = {
    findAllHouses,
    findHouseById,
    createHouse,
    updateHouse,
    deleteHouse,
}
