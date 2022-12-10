export type HourlyTotal = {
  _id: {
    date: {
      year: number,
      month: number,
      day: number,
      hour: number
    },
    armed: boolean
  },
  date: {
    $date: {
      $numberLong: string
    }
  }
  count: number
}

export type EventStats = {
  _id: {
    date: {
      year: number,
      month: number,
      day: number,
      hour: number
    },
    data: string
  },
  total_occurences: string,
  binary_avg: null | number,
  float_avg: null | number,
  int_avg: null | number,
}

export type CoreStaus = {
  armed: boolean,
  values: {
    [key: string]: string
  }
}

type Plugin = {
  name: string,
  plugin_type: string
}

export type Event = {
  timestamp: {
    $date: {
      $numberLong: string
    }
  },
  metadata: {
    armed: boolean,
    data_type: string,
    extra_data: string
  },
  data: {
    [key: string]: {
      string_value: string | null,
      binary_value: boolean | null,
      float_value: number | null,
      int_value: number | null
    }
  },
  device: {
    id: string,
    name: string,
    device_type: string,
    data_type: string
  }[],
  plugin: Plugin[]
}

export type Command = {
  timestamp: {
    $date: {
      $numberLong: string
    }
  },
  metadata: {
    armed_type: number,
    command_type: string,
    extra_data: string
  },
  data: string,
  plugin: Plugin[]
}
