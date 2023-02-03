import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai"
import { CoreStaus, EventStats, HourlyTotal, Event, Command } from "@/data/types"

// Documentation used: https://jotai.org/docs/introduction

export type APIData = {
  ok: boolean,
  status: number,
  error: string,
  data: {
    hourlyTotals: HourlyTotal[],
    eventStats: EventStats[],
    coreStatus: CoreStaus,
    lastCE: {
      events: Event[],
      commands: Command[]
    }
  } | null
}

export const userAtom = atomWithStorage("account", { username: "", token: "" })

export const dataAtom = atom<APIData>({ ok: false, status: 0, error: "", data: null })

