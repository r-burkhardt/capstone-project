import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  constructor() { }

}

export class Team implements Serializable<Team> {

  id = "";
  name = "";
  numOfPlayers = "";
  totalTeamRank = "";
  teamType = "";

  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(json) {
    this.id = json.id;
    this.name = json.name;
    this.numOfPlayers = json.numOfPlayers;
    this.totalTeamRank = json.totalTeamRank;
    this.teamType = json.teamType;

    return this;
  }

  clone(): Team {
    return new Team().deserialize(JSON.parse(JSON.stringify(this)));
  }
}
