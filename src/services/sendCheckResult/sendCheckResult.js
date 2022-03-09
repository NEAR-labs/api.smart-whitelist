import { Event } from '../../models/Event.js';
import { eventHandling } from "./eventHandling.js";

export const sendCheckResult = async (req, res) => {
  try {
    const eventVerifier = req.app.get('eventVerifier')
    let event = null;
    try {
      console.log('Check event signature:')
      event = eventVerifier.readPayload(req.rawBody, `${req.header('X-SHA2-Signature')}`);
    } catch (e) {
      console.log(e);
    }

    if (!event) {
      return res
        .status(400)
        .send({error: 'Invalid signature for webhook event'});
    }
    console.log(`Event signature is ok`);
    console.log('Incoming event:');
    console.log(event);

    if (event.object && event.object.id && event.action === 'check.completed') {
      const checkId = event.object.id;
      const eventObj = await Event.findOne({ checkId });

      if (eventObj) {
        console.log('The event for this check ID has already been processed');
        return res.send({});

      } else {
        await Event.create({
          checkId,
          event: JSON.stringify(event),
          eventTimestamp: new Date(),
          processed: false,
        });
      }

      // Asynchronous event processing
      eventHandling(req, event).then();

    } else {
      console.log('This event is being ignored');
    }

    res.send({});

  } catch (e) {
    console.log('Webhook error:');
    console.log(e);
    res
      .status(500)
      .send({ error: 'Internal server error. Please try again later' });
  }
}
