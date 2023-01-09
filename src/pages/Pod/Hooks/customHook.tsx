import { useEffect, useState } from "react";

const pods = [
  {
    id: 1,
    podName: "The Podz",
    enableeEmployeeId: 12,
    enablerEmployeeId: 12,
    projectId: 123,
  },
  {
    id: 2,
    podName: "The Pod",
    enableeEmployeeId: 12,
    enablerEmployeeId: 12,
    projectId: 12,
  },
];

function useAvailablePods() {
  const [pods, setPods] = useState([]);

  useEffect(() => {
    setPods((prevPods) => [...prevPods, ...pods]);
  }, []);
}
export default useAvailablePods;

function mockFn() {
  throw new Error("Function not implemented. Shoul be get method.");
}
