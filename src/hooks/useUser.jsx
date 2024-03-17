import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['userData', token],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const response = await fetch(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: token, // Send the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    },
  });

  return { data, isFetching, error, refetch };
};

export default useUser;
