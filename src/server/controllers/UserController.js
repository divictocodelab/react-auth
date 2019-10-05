'use strict';
import model from '../model';

let User = model.user;
let userController = {

    async addNum(req, res, next) {
        let bodyData = req.body;
        const sum = bodyData.num1 + bodyData.num2;
        // console.log("sum" + sum);
        res.status(200).json({
            success: true,
            data: sum,
            message: ''
        });
    },

    /**
     * Find all user list
     * @param {*} req 
     * @param {*} res Object
     * @param {*} next 
     * 
     */
    async findAll(req, res, next) {
        console.log("all user");
        let queryData = req.query;
        let limit = queryData.file_type == "csv" ? 100000 : parseInt(queryData.limit || 10);
        let offset = parseInt(queryData.offset || 0);
        let results = await User.findAndCountAll({
            limit: limit,
            offset: offset
        });
        res.status(200).json({
            success: true,
            data: { rows: results.rows, total: results.count },
            message: ''
        });
    },
    /**
     * Get User detail
     * @param {*} req Id
     * @param {*} res Object
     * @param {*} next 
     */
    async findOne(req, res, next) {
        const param = req.params;
        let user = await User.findOne({ where: { id: param.id } });
        res.json({
            user: user
        });
    },

    /**
    * Update user 
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
    async save(req, res, next) {
        let bodyData = req.body;
        let userData = {
            name: bodyData.name,
            email: bodyData.email,
            phone_number: bodyData.phone_number
        };

        let user = await User.create(userData);
        res.status(200).json({
            success: true,
            data: user,
            message: ''
        });
    },

    /**
     * Update user 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async updateUser(req, res, next) {
        const param = req.params;
        let bodyData = req.body;
        let userData = {
            name: bodyData.name,
            email: bodyData.email,
            phone_number: bodyData.phone_number
        };
        let user = await User.findOne({ where: { id: param.id } });
        if (user) {
            await user.update(userData);
            res.status(200).json({
                success: true,
                data: user,
                message: ''
            });
        }
    },

    async deleteUser(req, res, next) {
        const param = req.params;
        await User.destroy({
            where: {
                id: param.id
            }
        })

        res.status(200).json({
            data: null,
            status: true,
            message: 'User deleted succussfully.'
        });
    },


}

export default userController;