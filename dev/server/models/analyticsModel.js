"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const mongoose_1 = require("mongoose");
var Analytics;
(function (Analytics) {
    Analytics.AnalyticsSchema = new mongoose_1.Schema({
        siteHits: Number,
        blogViews: Number,
        recipeViews: Number,
        blogCount: Number,
        recipeCount: Number
    });
    Analytics.AnalyticsModel = (0, mongoose_1.model)('Analytics', Analytics.AnalyticsSchema);
})(Analytics = exports.Analytics || (exports.Analytics = {}));
