import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/assets/environments/environment';

type GET_PARAMS = Record<string, string | number | boolean | readonly (string | number | boolean)[]>;

type  ResponseRaw = any;

@Injectable({
    providedIn: 'root'
})
export class RestService {
    private _restOptionsDefault: RestOptions = {
        isApiResponse: true,
        hasNote: true,
        urlPrefix: environment.apiUrl
    };

    constructor(
        private _http: HttpClient,
    ) {
    }

    public restGET<T = ResponseRaw>(endpoint: string, params: GET_PARAMS = {}, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('GET', endpoint, {
            ...options,
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    public restGETBlob(endpoint: string, options?: Omit<RestOptions, 'body'>): Observable<Blob> {
        return this.request('GET', endpoint, {
            ...options,
            responseType: 'blob',
            isApiResponse: false
        });
    }

    public restGETText<T = ResponseRaw>(endpoint: string, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('GET', endpoint, {
            ...options,
            responseType: 'text',
            isApiResponse: false
        });
    }

    public restPOST<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('POST', endpoint, {
            ...options,
            body
        });
    }

    public restPOSTFormData<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        const formData: FormData = new FormData();
        this._convertObjectToFormData(body, formData);

        return this.request('POST', endpoint, {
            ...options,
            body: formData
        });
    }

    public restPOSTBlob(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<HttpEvent<Blob>> {
        return this.request('POST', endpoint, {
            ...options,
            body,
            responseType: 'blob',
            observe: 'response',
            isApiResponse: false
        });
    }

    public restPUT<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('PUT', endpoint, {
            ...options,
            body
        });
    }

    public restDELETE<T = ResponseRaw>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('DELETE', endpoint, {
            ...options,
            body
        });
    }

    public request<T>(method: string, endpoint: string, options: RestOptions = this._restOptionsDefault): Observable<T> {
        const preparedOptions = this._prepareRestOptions(options);

        const context = new HttpContext();

        const httpOptions: HttpOptions = {
            ...preparedOptions,
            context,
        };

        return this._http.request(method, preparedOptions.urlPrefix + endpoint, httpOptions);
    }

    private _convertObjectToFormData(
        object: any,
        formData: FormData,
        formObject: any = null,
        property = ''
    ) {
        const isObj = (obj: any, fData: any, prop: string) => {
            if (typeof obj === 'object') {
                if (!!obj && obj.constructor === Array) {
                    prop += '[]';
                    for (let i = 0; i < obj.length; i++) {
                        const auxFob = fData
                            ? fData[i]
                            : fData;
                        isObj(obj[i], auxFob, prop);
                    }
                } else if (!!obj && obj.constructor === File) {
                    formData.append(prop, obj, obj.name);
                } else {
                    this._convertObjectToFormData(obj, formData, fData, prop);
                }
            } else {
                const value = fData
                    ? fData
                    : obj;
                formData.append(prop, value);
            }
        };
        isObj.bind(this);

        for (const prop in object) {
            if (object.hasOwnProperty(prop)) {
                const auxP = property === ''
                    ? prop
                    : `${property}[${prop}]`;
                const auxFob = formObject
                    ? formObject[prop]
                    : formObject;
                isObj(object[prop], auxFob, auxP);
            }
        }
    }

    private _prepareRestOptions(options: RestOptions = this._restOptionsDefault): RestOptions {
        return {
            ...options,
            isApiResponse: options.isApiResponse ?? this._restOptionsDefault.isApiResponse,
            hasNote: options.hasNote ?? this._restOptionsDefault.hasNote,
            urlPrefix: options.urlPrefix ?? this._restOptionsDefault.urlPrefix,
        };
    }
}

export interface RestOptions extends HttpOptions {
    isApiResponse?: boolean;
    hasNote?: boolean;
    urlPrefix?: string;
}

interface HttpOptions {
    body?: any;
    headers?: HttpHeaders | Record<string, string | string[]>;
    context?: HttpContext;
    observe?: 'body' | 'response' | 'events';
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
    responseType?: 'json' | 'blob' | 'text';
    reportProgress?: boolean;
    withCredentials?: boolean;
}
