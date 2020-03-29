import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData = { title, content };
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guid-17a86.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response'
                }
            )
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guid-17a86.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ 'custom-header': 'hello' }),
                params: new HttpParams().set('print', 'pretty')
            }
        )
            .pipe(map((responseData) => {
                const postArrays: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArrays.push({ ...responseData[key], id: key });
                    }
                }
                return postArrays;
            }), catchError(errorRess => {
                return throwError(errorRess);
            })

            )
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guid-17a86.firebaseio.com/posts.json',
            {
                observe: 'events'
            })
            .pipe(tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log(event);
                }
            }));
    }
}