import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IPagination } from '../shared/models/IPagination';
import { IType } from '../shared/models/IType';
import { map, delay } from 'rxjs/operators';
import { ShopParams } from '../shared/models/ShopParams';
import { IProduct } from '../shared/models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
 
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
 
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
 
 
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }
 
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
 
  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
}
