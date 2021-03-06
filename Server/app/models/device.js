var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	userId: { type: Number, required: true },
	platform: { type: String, required: true },
	apiKey: { type: String, required: true },
	registrationToken: { type: String, required: true },
	deviceId: { type: Number, required: true },
	clientId:{ type: Number},
	group:{ type: String },
});

// Sets the createdAt parameter equal to the current time
deviceSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Device', deviceSchema);