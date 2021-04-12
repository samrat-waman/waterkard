import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { from } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
@Injectable({
	providedIn: "root",
})
export class HttpService {
	token: any;
	driver = true;
	url = "http://ecommapi3.rsi4apps.com/api/";
	serverUrl = "http://ecommapi3.rsi4apps.com/api/";
	// serverUrl='http://ecommapi2.rsi4apps.com/api/'

	constructor(private httpClient: HttpClient, private storage: Storage) { }
	ngOnInit(): void { }

	setToken(token: string) {
		this.token = token;
	}

	posts(data, path) {
		return from(this.gett("token")).pipe(switchMap(result => {
			if (result != null) {
				this.token = result;
			}
			const httpHeaders = new HttpHeaders({
				"content-type": "application/json",
				Authorization: "Bearer " + this.token,
			});
			const url = this.url + path;
			// return this.httpClient.post(url, data);
			return this.httpClient.post(url, data, { headers: httpHeaders });
		}));
	}

	getToken(): Promise<string> {
		return this.gett("token")
			.then((result) => {
				if (result != null) {
					return (this.token = result);
				}
			})
			.catch((e) => {
				console.log("error: " + e);
				return e;
				// Handle errors here
			});
	}

	isDriver() {
		this.driver = false;
	}

	async set(key: string, value: any): Promise<any> {
		try {
			const result = await this.storage.set(key, value);
			console.log("set string in storage: " + result);
			return true;
		} catch (reason) {
			console.log(reason);
			return false;
		}
	}

	async gett(key: string): Promise<any> {
		try {
			const result = await this.storage.get(key);
			console.log("storageGET: " + key + ": " + result);
			if (result != null) {
				return result;
			}

			return null;
		} catch (reason) {
			console.log(reason);
			return null;
		}
	}
	// posts(data, path ){
	// const url=this.serverUrl+path;
	// return this.httpClient.post(url, data);
	// }
}
