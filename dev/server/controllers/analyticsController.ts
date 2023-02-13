import { Analytics } from '../models/analyticsModel';

export function analyticsAPI_get(req, res) {
  Analytics.Model.findOne({}, (err, analytics) => {
    if (err) {
      console.log(err);

    } else {
      res.status(200).send(analytics);
    }
  });
}