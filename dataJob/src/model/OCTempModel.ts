import { Document, model, Schema } from "mongoose";

import { IOC } from "../interface/IOC";

type OCTempType = IOC & Document;

export default model<OCTempType>(
	"ocTemp",
	new Schema({
		oc: String,
		uge: { type: Number, index: true },
		ugeNome: String,
		logradouroUge: String,
		cepUge: String,
		ano: Number ,
		mes: Number,
		valorTotal: Number,
		geometry: {
			type: { type: String },
			coordinates: [Number, Number]
		}
	}).index({ geometry: "2dsphere" })
);
