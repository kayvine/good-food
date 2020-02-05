export const getAll = (model) => () => model.find().exec();

export const getById = (model) => (id) => model.findById(id).exec();

export const create = (model) => (item) => model.create(item);

export const update = (model) => (item) => model.findOneAndUpdate({ _id: item.id }, item).exec();

export const remove = (model) => (id) => model.findById(id).remove();

// Abstract wrapper to add new functionality only once 
export default (model) => ({
    getAll: getAll(model),
    getById: getById(model),
    create: create(model),
    update: update(model),
    remove: remove(model)
});
