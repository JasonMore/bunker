/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// Create a new message, this will be the endpoint for POST /message
module.exports.create = function (req, res) {
	var author = req.session.user;
	var roomId = req.body.room;

	// TODO if author is not a member of the roomId, cancel
	var text = sanitizeMessage(req.body.text);
	if (!text || !text.length) {
		return res.badRequest();
	}
	else if (/^\/me\s+/i.test(text)) {
		// /me emote command
		// Pete's code zone, do not enter
		// ******************************
	}
	else if (/^\/nick\s+/i.test(text)) {
		var newNick = text.match(/\/nick\s+([\w\s-]{1,20})/i);
		if (newNick) {

			User.findOne(author.id).exec(function(error, user) { // find the user in the db (don't want to use session version)
				var currentNick = user.nick;
				user.nick = newNick[1];
				user.save() // save the model with the updated nick
					.then(function() {
						RoomService.updateAllWithUser(user.id, currentNick + ' changed their handle to ' + user.nick);
					})
					.catch(function() {
						// TODO error handling
					});
			});
		}
	}
	else if (/^\/topic\s+/i.test(text)) {
		// topic command
	}
	else { // base case, a regular chat message

		// Create a message model object in the db
		Message.create({ // the model to add into db
			room: roomId,
			author: author.id,
			text: text
		}).exec(function (error, message) {
			// now that message has been created, get the populated version
			Message.findOne(message.id).populateAll().exec(function (error, message) {
				Room.message(roomId, message); // message all subscribers of the room that with the new message as data
				res.ok(message); // send back the message to the original caller
			});
		});
	}
};

// Get the latest 50 messages, this will be the endpoint for GET /message/latest
module.exports.latest = function (req, res) {
	var roomId = req.param('roomId');
	var user = req.session.user;
	// TODO check for roomId and user values

	// find finds multiple instances of a model, using the where criteria (in this case the roomId
	// we also want to sort in DESCing (latest) order and limit to 50
	// populateAll hydrates all of the associations
	Message.find().where({room: roomId}).sort('createdAt DESC').limit(50).populateAll().exec(function (error, messages) {
		res.ok(messages); // send the messages
	});
};

// Sanitize a message, no tags allow currently
function sanitizeMessage(original) {
	return require('sanitize-html')(original, {
		allowedTags: []
	});
}
