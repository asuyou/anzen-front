import { useLocation } from "wouter";

// Hook documentation at: https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks

function useSearchParam() {
  const [location, navigate] = useLocation();

  const params = new URLSearchParams(window.location.search);

  const getParam = (name: string) => params.get(name)

  const setParam = (param: string, value: string | undefined) => {
    if (!value) {
      params.delete(param)
    } else if (params.has(param)) {
      params.set(param, value)
    } else {
      params.append(param, value)
    }

  }

  const moveLocation = (): URLSearchParams => {
    navigate(location + "?" + params, { replace: true })

    return params
  }

  return {
    getParam,
    setParam,
    moveLocation,
    params
  }
}

export default useSearchParam
