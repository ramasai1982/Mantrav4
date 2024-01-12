import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../model/mission';
import { MissionByEmployee } from '../model/missionByEmployee';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiServerUrl= environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  public addMission(mission: Mission): Observable<Mission>{
    return this.http.post<Mission>(`${this.apiServerUrl}/mission/add`, mission);
  }

  public deleteMission(missionId: number|undefined): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/mission/delete/${missionId}`);
  }

  public getMission(): Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiServerUrl}/mission/all`);
  }

  public getMissionByEmployee(): Observable<MissionByEmployee[]>{
    return this.http.get<MissionByEmployee[]>(`${this.apiServerUrl}/mission/missionEmployee`);
  }

}
