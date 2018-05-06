import { IGeometry } from "./IGeometry";

export interface IOC {
	oc: string;

	uge: number;

	ugeNome: string;

	logradouroUge: string;

	cepUge: string;

	ano: number;

	mes: number;

	valorTotal: number;

	geometry: IGeometry;
}
