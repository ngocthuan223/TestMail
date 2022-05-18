const create = async (model, modelItem) => {
    return new Promise((resolve, reject) => {
        model.create(modelItem).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            reject({ error: "Internal Error" });
        });
    });
}

const importList = async (model, modelItems) => {
    return new Promise(async (resolve) => {
        const successList = [];
        const failList = [];
        for (const item of modelItems) {
            try {
                const successItem = await model.create(item);
                successList.push(successItem);
            } catch(e) {
                console.log(e);
                failList.push(item);
            }
        }
        return resolve({success: successList, fail: failList })
    });
}

const update = async (model, modelItem) => {
    if (!modelItem.id) {
        return { error: { message: 'Id is require' } };
    }
    return new Promise((resolve, reject) => {
        model.update(modelItem, { where: { id: modelItem.id } }).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            return reject({ error: "Internal Error" });
        });
    });
}

const getAll = async (model, options) => {
    return new Promise((resolve, reject) => {
        model.findAll(options).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            return reject({ error: "Internal Error" });
        });
    });
}

const getById = async (model, id) => {
    return new Promise((resolve, reject) => {
        model.findOne({ where: { id } }).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            return reject({ error: "Internal Error" });
        });
    });
}

const deleteById = async (model, id) => {
    return new Promise( async (resolve, reject) => {
        model.destroy({ where: { id } }).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            return reject({ error: "Internal Error" });
        });
    });
}

module.exports = {
    create,
    update,
    getAll,
    getById,
    deleteById,
    importList
};