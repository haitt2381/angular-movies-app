import {Cast} from "./cast";
import {Crew} from "./crew";

export interface CreditsResponse {
  id: number
  cast: Cast[]
  crew: Crew[]
}