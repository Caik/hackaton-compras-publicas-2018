import { IGeometry } from "../interface/IGeometry";
import { IOC } from "../interface/IOC";
export class OC {
	private _oc: string;

	private _uge: number;

	private _ugeNome: string;

	private _logradouroUge: string;

	private _cepUge: string;

	private _ano: number;

	private _mes: number;

	private _valorTotal: number;

	private _geometry: IGeometry;

	/**
	 * Getter oc
	 * @return {string}
	 */
	public get oc(): string {
		return this._oc;
	}

	/**
	 * Setter oc
	 * @param {string} value
	 */
	public set oc(value: string) {
		this._oc = value;
	}

	/**
	 * Getter uge
	 * @return {number}
	 */
	public get uge(): number {
		return this._uge;
	}

	/**
	 * Setter uge
	 * @param {number} value
	 */
	public set uge(value: number) {
		this._uge = value;
	}

	/**
	 * Getter ugeNome
	 * @return {string}
	 */
	public get ugeNome(): string {
		return this._ugeNome;
	}

	/**
	 * Setter ugeNome
	 * @param {string} value
	 */
	public set ugeNome(value: string) {
		this._ugeNome = value;
	}

	/**
	 * Getter logradouroUge
	 * @return {string}
	 */
	public get logradouroUge(): string {
		return this._logradouroUge;
	}

	/**
	 * Setter logradouroUge
	 * @param {string} value
	 */
	public set logradouroUge(value: string) {
		this._logradouroUge = value;
	}

	/**
	 * Getter cepUge
	 * @return {string}
	 */
	public get cepUge(): string {
		return this._cepUge;
	}

	/**
	 * Setter cepUge
	 * @param {string} value
	 */
	public set cepUge(value: string) {
		this._cepUge = value;
	}

	/**
	 * Getter ano
	 * @return {number}
	 */
	public get ano(): number {
		return this._ano;
	}

	/**
	 * Setter ano
	 * @param {number} value
	 */
	public set ano(value: number) {
		this._ano = value;
	}

	/**
	 * Getter mes
	 * @return {number}
	 */
	public get mes(): number {
		return this._mes;
	}

	/**
	 * Setter mes
	 * @param {number} value
	 */
	public set mes(value: number) {
		this._mes = value;
	}

	/**
	 * Getter valorTotal
	 * @return {number}
	 */
	public get valorTotal(): number {
		return this._valorTotal;
	}

	/**
	 * Setter valorTotal
	 * @param {number} value
	 */
	public set valorTotal(value: number) {
		this._valorTotal = value;
	}

	/**
	 * Getter geometry
	 * @return {IGeometry}
	 */
	public get geometry(): IGeometry {
		return this._geometry;
	}

	/**
	 * Setter geometry
	 * @param {IGeometry} value
	 */
	public set geometry(value: IGeometry) {
		this._geometry = value;
	}

	public toJson(): IOC {
		return {
			oc: this._oc,
			uge: this._uge,
			ugeNome: this._ugeNome,
			logradouroUge: this._logradouroUge,
			cepUge: this._cepUge,
			ano: this._ano,
			mes: this._mes,
			valorTotal: this._valorTotal,
			geometry: this._geometry
		};
	}
}
