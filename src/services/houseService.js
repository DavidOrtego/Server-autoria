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
