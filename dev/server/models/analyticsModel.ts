import { Schema, Document, model } from 'mongoose';

export module Analytics {
  export interface IAnalytics extends Document {
    siteHits: number;
    blogViews: number;
    recipeViews: number;
    blogCount: number;
    recipeCount: number;
  }
  
  export const AnalyticsSchema = new Schema<IAnalytics>({
    siteHits: Number,
    blogViews: Number,
    recipeViews: Number,
    blogCount: Number,
    recipeCount: Number
  });
  
  export const Model = model<IAnalytics>('Analytics', AnalyticsSchema);
}