/*
 * @Author: cacaudev
 * @Date: 2020-07-07 10:29:00
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-09 11:59:51
 */
class Service {
  /**
   * @summary Base Service Class for Database models
   * with basic REST pattern functions
   * @class
   * @property {SequelizeModel} model
   */
  constructor(model) {
    this.model = model;
  }
  async create(payload = {}) {
    return await this.model.create(payload);
  }
  async readById(resourceId = 0) {
    return await this.model.findByPk(resourceId, { raw: true });
  }
  async updateById(resourceId, payload) {
    return await this.model.update(payload, {
      returning: true, // Return the resource record updated
      where: { id: resourceId },
      raw: true,
    });
  }
  async deleteById(resourceId) {
    return await this.model.destroy({ where: { id: resourceId } });
  }
  async list({ offset = 0, limit = 1000 }) {
    return await this.model.findAndCountAll({
      offset,
      limit,
      raw: true,
    });
  }
}

export default Service;
