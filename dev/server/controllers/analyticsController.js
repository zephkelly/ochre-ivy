"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsAPI_get = void 0;
const analyticsModel_1 = require("../models/analyticsModel");
function analyticsAPI_get(req, res) {
    analyticsModel_1.Analytics.Model.findOne({}, (err, analytics) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(analytics);
        }
    });
}
exports.analyticsAPI_get = analyticsAPI_get;
