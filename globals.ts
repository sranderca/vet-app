import { atom } from "jotai";
import { serverURL } from "./constants";
import Pocketbase from "pocketbase";
import Vet from "./types/Vet";
import Patient from "./types/Patient";
import Log from "./types/Log";

export const globalPocketbase= atom(new Pocketbase(serverURL))
export const globalVetDetails= atom<Vet | undefined>(undefined)
export const globalLogDetails= atom<Log | undefined>(undefined)
export const globalPatientDetails= atom<Patient| undefined>(undefined)
export const globalInitialNavigation= atom<any>(undefined)