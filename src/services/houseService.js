const { db } = require("../config/database");

const findAllHouses = async () => {
    const house = await db("Houses").select(
        "id_house",
        "name",
        "address",
        "number_of_rooms",
        "image",
        "level"
    );
}

const findHouseById = async (houseId) => {
    const house = await db("Houses")
        .select(
            "id_house",
            "name",
            "address",
            "number_of_rooms",
            "image",
            "level"
        )
        .where({ id_house: houseId })
        .first();

    if (!house) {
        throw { status: 404, message: "Casa no encontrada" };
    }

    return house;
}

const createHouse = async (houseData) => {
    const existingHouse = await db("Houses")
        .where({ name: houseData.name })
        .first();
    if (existingHouse) {
        throw { status: 400, message: "La casa ya existe" };
    }

    const [createdHouse] = await db("Houses")
        .insert(houseData)
        .returning([
            "id_house",
            "name",
            "address",
            "number_of_rooms",
            "image",
            "level"
        ]);
}

const updateHouse = async (houseId, newHouseData) => {
    const existingHouse = await db ("Houses")
        .where({id_house: houseId})
        .first();
    if (!existingHouse) {
        throw {status: 404, message: "Casa no encontrada"}
    }
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

