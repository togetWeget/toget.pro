import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Resultat} from '../../../shared/models/resultat';
import {Detailblock} from '../../../shared/models/detailblock';
import {Abonnes} from '../../../shared/models/abonnes';

@Injectable({
  providedIn: 'root'
})
export class AbonnesService {
  private allAbonnesByBlockIdUrl = 'http://localhost:8080/abonneParblocks/';
  private abonneByIdUrl = 'http://localhost:8080/profil/';
  private abonnesUrl = 'http://localhost:8080/abonnes/';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getAllAbonnes(): Observable<Resultat<Abonnes[]>> {
    return this.httpClient.get<Resultat<Abonnes[]>>(this.abonnesUrl).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Abonnes[]>>('getAllAbonnes', 
        new Resultat<Abonnes[]>(null, [], [])))
    );
  }

  getAllAbonnesByBlock(id: number): Observable<Resultat<Detailblock[]>> {
    return this.httpClient.get<Resultat<Detailblock[]>>(this.allAbonnesByBlockIdUrl + id).pipe(
      tap(res => {
        this.log(`Les Abonnés ont été recupérés !`);
        console.log('vrifier le retour du service', res.body);
      }),
      catchError(this.handleError<Resultat<Detailblock[]>>('getAllAbonnesByBlock', 
        new Resultat<Detailblock[]>(null, [], [])))
    );
  }

  getAbonnesById(id: number): Observable<Resultat<Detailblock>> {
    return this.httpClient.get<Resultat<Detailblock>>(this.abonneByIdUrl + id)
      .pipe(
      tap(res => {
        this.log(`L'abonné a été récupéré !`);
      }),
      catchError(this.handleError<Resultat<Detailblock>>('getAbonnesById'))
    );
  }

  private log(message: string) {
    this.messageService.add('blockService: ' + message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} a rentre un probleme: ${error.message}`);
      return of(result as T);
    };
  }
}

