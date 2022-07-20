const create = async (model, modelItem) => {
    const result = await model.create(modelItem);
    return result;
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

const createOrUpdate = async (model, item, idProperty = 'id', updateAttributes = []) => {
    if(!item[idProperty]) {
        throw new Error(idProperty + ' is required');
    }
    const itemEdit = await model.findOne({where: {[idProperty]: item[idProperty]}, raw: true});
    delete item.id;

    // If there is a row in target table update it else create new one
    const result = await model.create(itemEdit ? {...item, id: itemEdit.id} : item, {
        updateOnDuplicate: updateAttributes
    });
    return result;
} 

const bulkUpdate = async (model, item, idProperty = 'id') => {
    if(!item[idProperty]) {
        throw new Error(idProperty + ' is required');
    }
    const result = await model.update(
        item,
        {
            where: {
                [idProperty]: item[idProperty]
            }
        }
    )
    return result;
} 

module.exports = {
    create,
    update,
    getAll,
    getById,
    deleteById,
    importList,
    createOrUpdate,
    bulkUpdate
};