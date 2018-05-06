import * as maps from "@google/maps";
import * as $ from "cheerio";
import { readdirSync, readFile } from "fs";
import { OC } from "../entity/OC";
import ocTempModel from "../model/OCTempModel";
import { IGeometry } from "./../interface/IGeometry";
import { IOC } from "./../interface/IOC";

const ceps = new Map<string, IGeometry>();

export async function populate() {
	const files: string[] = readdirSync(`${__dirname}/../../data/xml`);

	for (const file of files) {
		console.log(`Iniciando parse: ${file}`);
		readFile(`${__dirname}/../../data/xml/${file}`, async (err, data) => {
			if (err) {
				console.error(`Error lendo do arquivo: ${file}`);
				return;
			}

			const elements = $.load(data.toString(), {
				xmlMode: true,
				normalizeWhitespace: true,
				decodeEntities: true,
				lowerCaseTags: true
			})("_x0030_");

			await elements.each(async (index, element) => {
				let oc = new OC();

				oc.oc = $(element)
					.find("oc")
					.text()
					.trim();

				oc.ano = Number(
					$(element)
						.find("data_encerramento")
						.text()
						.substring(0, 4)
				);

				oc.mes = Number(
					$(element)
						.find("data_encerramento")
						.text()
						.substring(5, 7)
				);

				oc.valorTotal = Number(
					$(element)
						.find("valor_total_negociado")
						.text()
				);

				oc.uge = Number(
					$(element)
						.find("codigo_uge")
						.text()
				);

				oc.ugeNome = $(element)
					.find("uge")
					.text()
					.trim();

				oc.logradouroUge = $(element)
					.find("logradouro_uge")
					.text()
					.trim();

				oc.cepUge = $(element)
					.find("cep_uge")
					.text()
					.trim();

				oc.geometry = await findGeolocation(oc.cepUge);

				if (oc.geometry !== undefined) {
					ocTempModel
						.insertMany(oc.toJson())
						.catch(error => console.error(error));
				}

				oc = null;
			});

			console.log(`Finalizado parse: ${file}`);
		});
	}

	return;
}

async function findGeolocation(cep: string): Promise<IGeometry> {
	return {
		type: "Point",
		coordinates: [0, 0]
	};

	if (ceps.get(cep) !== undefined) {
		return ceps.get(cep);
	}

	const googleMapsClient = maps.createClient({
		key:
			process.env.GOOGLE_MAPS_TOKEN ||
			"AIzaSyDM-qpsYNETu4v97fKwjrx-YZtRIxcMpkQ",
		Promise
	});

	let result;
	let location;
	try {
		result = await googleMapsClient.geocode({ address: cep }).asPromise();
		location = result.json.results[0].geometry.location;
	} catch (error) {
		console.error(error);
		return;
	}

	const geometry: IGeometry = {
		type: "Point",
		coordinates: [location.lng, location.lat]
	};

	ceps.set(cep, geometry);

	return geometry;
}
