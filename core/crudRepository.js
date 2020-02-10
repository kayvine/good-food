import { toObject, listToObject } from "./database.helpers";

export const getAll = (model) => () => model.find().then(listToObject);

export const getById = (model) => (id) => model.findById(id).exec(toObject);

export const create = (model) => (item) => model.create(item).then(toObject);

export const update = (model) => (id, item) => {
    return model.findOneAndUpdate({ _id: id }, item, { new: true })
        .exec()
        .then(toObject)
};

export const remove = (model) => (id) => model.remove({ _id: id });

// Abstract wrapper to add new functionality only once 
export default (model) => ({
    getAll: getAll(model),
    getById: getById(model),
    create: create(model),
    update: update(model),
    remove: remove(model)
});
